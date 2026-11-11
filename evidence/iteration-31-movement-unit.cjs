// PROTOTYPE - NOT FOR PRODUCTION
// Actual movement helpers, single calls with fixed fixtures; no substitute AI or combat loop.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const config={window:{}};vm.createContext(config);vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8'),config);
const tune=new Proxy({},{get:(_,key)=>config.window.CONFIG[key].value});
function source(name,next){const start=html.indexOf(`function ${name}(`),end=html.indexOf(next,start);assert.ok(start>=0&&end>start,name);return html.slice(start,end);}
const context={tune};vm.createContext(context);vm.runInContext(source('distance','function cadence(')+source('moveUnit','/** Fixed-step independent'),context);
const fixture={x:0,y:0,kind:'warden',motion:0,moving:false,facing:1},step=1/60;
function unit(overrides={}){return{...fixture,...overrides};}
function near(actual,expected){assert.ok(Math.abs(actual-expected)<1e-9,`${actual} differs from ${expected}`);}
let checked=0;function check(name,run){run();checked++;console.log(`PASS\t${name}`);}
check('diagonal approach advances by configured speed times step',()=>{
  const u=unit(),target={x:1000,y:1000};context.moveUnit(u,target,step);near(Math.hypot(u.x,u.y),tune.moveSpeed*step);near(u.x,u.y);near(u.motion,tune.moveSpeed*step);assert.equal(u.moving,true);
});
check('melee approach stops at configured hysteresis boundary without overshoot',()=>{
  const u=unit(),stop=tune.meleeRange-tune.rangeHysteresis,target={x:stop+1,y:0};context.moveUnit(u,target,1);near(u.x,1);near(context.distance(u,target),stop);
});
check('ranged approach uses ranged stopping distance',()=>{
  const u=unit({kind:'ranger'}),stop=tune.rangedRange-tune.rangeHysteresis,target={x:stop+1,y:0};context.moveUnit(u,target,1);near(u.x,1);near(context.distance(u,target),stop);
});
check('already within approach range does not move or accumulate motion',()=>{
  const u=unit({moving:true,motion:12}),target={x:tune.meleeRange-tune.rangeHysteresis-1,y:0};context.moveUnit(u,target,step);near(u.x,0);near(u.motion,12);assert.equal(u.moving,false);
});
check('lancer and assassin movement multipliers apply independently',()=>{
  for(const [kind,multiplier] of [['lancer',tune.lancerMoveMultiplier],['assassin',tune.assassinMoveMultiplier]]){
    const u=unit({kind});context.moveUnit(u,{x:1000,y:0},step);near(u.x,tune.moveSpeed*multiplier*step);
  }
});
check('charge applies its speed and stops at charge range',()=>{
  const u=unit({kind:'lancer'});context.moveUnit(u,{x:1000,y:0},step,true);near(u.x,tune.moveSpeed*tune.lancerMoveMultiplier*tune.chargeMultiplier*step);
  const close=unit({kind:'lancer'}),target={x:tune.chargeStopRange+1,y:0};context.moveUnit(close,target,1,true);near(close.x,1);near(context.distance(close,target),tune.chargeStopRange);
});
check('retreat moves away while continuing to face destination',()=>{
  const u=unit({kind:'ranger'}),target={x:1000,y:0};context.moveUnit(u,target,step,false,true);near(u.x,-tune.moveSpeed*tune.retreatMultiplier*step);assert.equal(u.facing,1);assert.equal(u.moving,true);
});
check('leftward target updates facing and zero step adds no movement',()=>{
  const u=unit();context.moveUnit(u,{x:-1000,y:0},step);assert.equal(u.facing,-1);assert.ok(u.x<0);const before={x:u.x,motion:u.motion};context.moveUnit(u,{x:-1000,y:0},0);near(u.x,before.x);near(u.motion,before.motion);assert.equal(u.moving,false);
});
check('coincident positions stay finite for approach and retreat',()=>{
  for(const retreat of [false,true]){const u=unit();context.moveUnit(u,{x:0,y:0},step,false,retreat);assert.ok([u.x,u.y,u.motion].every(Number.isFinite));near(u.x,0);near(u.y,0);}
});
check('arena clamp handles both extremes and preserves interior position',()=>{
  const low=unit({x:tune.arenaLeft-1,y:tune.arenaTop-1});context.constrainUnit(low);near(low.x,tune.arenaLeft);near(low.y,tune.arenaTop);
  const high=unit({x:tune.arenaRight+1,y:tune.arenaBottom+1});context.constrainUnit(high);near(high.x,tune.arenaRight);near(high.y,tune.arenaBottom);
  const middle=unit({x:(tune.arenaLeft+tune.arenaRight)/2,y:(tune.arenaTop+tune.arenaBottom)/2}),before={x:middle.x,y:middle.y};context.constrainUnit(middle);near(middle.x,before.x);near(middle.y,before.y);
});
console.log(`unit_total\t${checked}`);
console.log('not_assessed\tAI movement decisions, ally separation, full encounters, animation quality or native input; actual movement/clamp helpers tested once per fixed fixture');
