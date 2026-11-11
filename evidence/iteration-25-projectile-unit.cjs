// PROTOTYPE - NOT FOR PRODUCTION
// Single-step assertions against actual updateBattle/impact; no alternate battle loop or browser driver.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const config={window:{}};vm.createContext(config);vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8'),config);
const tune=new Proxy({},{get:(_,key)=>config.window.CONFIG[key].value});
function source(name,next){const start=html.indexOf(`function ${name}(`),end=html.indexOf(next,start);assert.ok(start>=0&&end>start,name);return html.slice(start,end);}
const clips=[],context={tune,uiDirty:false,rng:()=>.5,advanceAnimations:()=>{},playUnitAnimation:(u,name)=>clips.push({u,name})};
vm.createContext(context);
vm.runInContext(source('living','function log(')+source('impact','/** Deliver ranged')+source('updateBattle','function returnMap('),context);
const fixture={maxHP:100,hp:100,shield:0,x:200,y:300,kind:'ranger',slot:0,side:0,index:0,flash:0,deadTime:0,attackCD:10,skillCD:10,recovery:10,moving:false,action:null};
const step=1/60,travel=tune.projectileSpeed*step;
function unit(overrides={}){return{...fixture,...overrides};}
let battle,actor,target,checked=0;
function reset(){
  clips.length=0;context.events=[];context.scene='play';context.uiDirty=false;
  actor=unit({x:0});target=unit({side:1});
  // Living sentinels keep terminal-state checks inactive even if a test kills actor/target.
  battle={elapsed:0,stage:0,heroes:[actor,unit({x:800,slot:1})],enemies:[target,unit({x:500,slot:1,side:1})],effects:[],projectiles:[],uiClock:0};
  context.state={battle};
}
function projectile(overrides={}){return{source:actor,target,x:target.x-travel,y:target.y-65,amount:20,heal:false,spell:false,t:0,...overrides};}
function check(name,run){reset();run();checked++;assert.equal(context.scene,'play');console.log(`PASS\t${name}`);}
check('released projectile still lands after source death while battle continues',()=>{
  actor.hp=0;battle.projectiles=[projectile()];context.updateBattle(step);
  assert.equal(target.hp,80);assert.equal(battle.projectiles.length,0);assert.equal(battle.effects[0].source,actor);
});
check('dead destination cancels projectile without damage or effects',()=>{
  target.hp=0;battle.projectiles=[projectile()];context.updateBattle(step);
  assert.equal(target.hp,0);assert.equal(battle.projectiles.length,0);assert.equal(battle.effects.length,0);
});
check('exact single-step arrival applies damage and removes projectile',()=>{
  battle.projectiles=[projectile()];context.updateBattle(step);
  assert.equal(target.hp,80);assert.equal(battle.projectiles.length,0);assert.equal(battle.effects.length,1);
});
check('projectile just beyond arrival travels but does not apply early damage',()=>{
  const p=projectile({x:target.x-travel-1}),before=p.x;battle.projectiles=[p];context.updateBattle(step);
  assert.equal(target.hp,100);assert.equal(battle.projectiles.length,1);assert.ok(Math.abs(p.x-before-travel)<1e-9);assert.equal(p.t,step);assert.equal(battle.effects.length,0);
});
check('homing direction uses current destination position',()=>{
  const p=projectile();target.y+=100;battle.projectiles=[p];const before={x:p.x,y:p.y};context.updateBattle(step);
  assert.equal(target.hp,100);assert.equal(battle.projectiles.length,1);assert.ok(p.y>before.y);assert.ok(Math.abs(Math.hypot(p.x-before.x,p.y-before.y)-travel)<1e-9);
});
check('healing projectile caps HP on arrival',()=>{
  target.hp=95;battle.projectiles=[projectile({heal:true})];context.updateBattle(step);
  assert.equal(target.hp,100);assert.equal(battle.effects[0].value,5);assert.equal(battle.effects[0].heal,true);assert.equal(battle.projectiles.length,0);
});
check('later projectile drops after earlier arrival kills shared destination',()=>{
  target.hp=10;battle.projectiles=[projectile(),projectile()];context.updateBattle(step);
  assert.equal(target.hp,0);assert.equal(battle.projectiles.length,0);assert.equal(battle.effects.length,1);assert.equal(clips.filter(c=>c.name==='death').length,1);
});
console.log(`unit_total\t${checked}`);
console.log('not_assessed\tbrowser flight rendering, full encounter timing, movement AI and animation playback; actual helpers called once per fixed recovery fixture, midpoint damage RNG');
