// PROTOTYPE - NOT FOR PRODUCTION
// Direct combat-helper assertions with fixed fixtures; no player/bot or substitute combat loop.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const config={window:{}};vm.createContext(config);vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8'),config);
const tune=new Proxy({},{get:(_,key)=>config.window.CONFIG[key].value});
function source(name,next){const start=html.indexOf(`function ${name}(`),end=html.indexOf(next,start);assert.ok(start>=0&&end>start,name);return html.slice(start,end);}
const clips=[];
const context={tune,uiDirty:false,events:[],rng:()=>.5,playUnitAnimation:(u,name)=>clips.push({u,name}),progress:{heroes:[{evolved:false}]}};
vm.createContext(context);
vm.runInContext(source('living','function log(')+source('weakest','function cadence(')+source('acquireTarget','/** Damage')+source('impact','/** Begin a private'),context);
const fixture={maxHP:100,hp:100,shield:0,x:0,y:0,kind:'lancer',slot:0,side:0,index:0,attack:20,action:null,recovery:0,moving:false};
function unit(overrides={}){return{...fixture,...overrides};}
function reset(){clips.length=0;context.events=[];context.uiDirty=false;context.state={battle:{heroes:[],enemies:[],effects:[],projectiles:[],elapsed:0}};}
let checked=0;
function check(name,run){reset();run();checked++;console.log(`PASS\t${name}`);}
check('living retained target wins over nearest candidate',()=>{const retained=unit({x:100}),actor=unit({target:retained}),near=unit({x:1});assert.equal(context.acquireTarget(actor,[near,retained]),retained);});
check('dead target is replaced with nearest living foe',()=>{const dead=unit({hp:0}),actor=unit({target:dead}),near=unit({x:1}),far=unit({x:10});assert.equal(context.acquireTarget(actor,[dead,far,near]),near);});
check('assassin initially prefers surviving back row',()=>{const front=unit({x:1,slot:0}),rear=unit({x:100,slot:2});assert.equal(context.acquireTarget(unit({kind:'assassin'}),[front,rear]),rear);});
check('assassin falls back when back row is dead',()=>{const front=unit({x:1,slot:0}),rear=unit({hp:0,slot:2});assert.equal(context.acquireTarget(unit({kind:'assassin'}),[front,rear]),front);});
check('no living targets returns null',()=>{assert.equal(context.acquireTarget(unit(),[unit({hp:0})]),null);});
check('healing caps at maximum HP',()=>{const target=unit({hp:95});context.impact(unit(),target,20,true);assert.equal(target.hp,100);assert.equal(context.state.battle.effects[0].value,5);});
check('healing cannot revive a dead target',()=>{const target=unit({hp:0});context.impact(unit(),target,20,true);assert.equal(target.hp,0);assert.equal(context.state.battle.effects.length,0);});
check('shield absorbs damage before HP',()=>{const target=unit({shield:10});context.impact(unit(),target,20);assert.equal(target.shield,0);assert.equal(target.hp,90);});
check('fully absorbed damage leaves HP intact',()=>{const target=unit({shield:30});context.impact(unit(),target,20);assert.equal(target.shield,10);assert.equal(target.hp,100);assert.equal(clips.length,0);});
check('death cancels unreleased action and movement',()=>{const target=unit({hp:10,action:{left:1},moving:true});context.impact(unit(),target,20);assert.equal(target.hp,0);assert.equal(target.action,null);assert.equal(target.moving,false);assert.equal(clips[0].name,'death');});
check('damage does not restart animation on a dead target',()=>{context.impact(unit(),unit({hp:0}),20);assert.equal(clips.length,0);assert.equal(context.state.battle.effects.length,0);});
check('busy windup is not replaced by a hit reaction',()=>{context.impact(unit(),unit({action:{left:1}}),20);assert.equal(clips.length,0);});
check('recovery is not replaced by a hit reaction',()=>{context.impact(unit(),unit({recovery:1}),20);assert.equal(clips.length,0);});
check('idle living target receives hit reaction',()=>{context.impact(unit(),unit(),20);assert.equal(clips[0].name,'hit');});
check('melee release at exact reach boundary hits',()=>{const target=unit({x:tune.meleeRange+tune.rangeHysteresis});context.deliver(unit(),target,20);assert.equal(target.hp,80);});
check('melee release beyond reach misses',()=>{const target=unit({x:tune.meleeRange+tune.rangeHysteresis+1});context.deliver(unit(),target,20);assert.equal(target.hp,100);assert.equal(context.state.battle.effects.length,0);});
check('ranged release queues projectile without immediate damage',()=>{const target=unit({x:200});context.deliver(unit({kind:'ranger'}),target,20);assert.equal(target.hp,100);assert.equal(context.state.battle.projectiles.length,1);assert.equal(context.state.battle.projectiles[0].target,target);});
check('release ignores already-dead targets',()=>{context.deliver(unit({kind:'mage'}),unit({hp:0}),20,false,true);assert.equal(context.state.battle.projectiles.length,0);});
check('healer retargets a dead selected ally to living weakest ally',()=>{const dead=unit({hp:0}),weak=unit({hp:10}),healer=unit({kind:'healer'});context.state.battle.heroes=[healer,weak,dead];context.resolveAction(healer,{special:true,target:dead});assert.equal(context.state.battle.projectiles[0].target,weak);assert.equal(context.state.battle.projectiles[0].heal,true);assert.equal(dead.hp,0);});
check('dead primary target receives no released single-target attack',()=>{context.resolveAction(unit({kind:'ranger'}),{special:false,target:unit({hp:0})});assert.equal(context.state.battle.projectiles.length,0);assert.equal(context.state.battle.effects.length,0);});
check('shield feedback records absorption without changing HP damage',()=>{const target=unit({shield:30});context.impact(unit(),target,20);const effect=context.state.battle.effects[0];assert.equal(effect.value,0);assert.equal(effect.absorbed,20);assert.equal(effect.heal,false);assert.equal(target.hp,100);});
check('partial shield feedback retains actual HP damage',()=>{const target=unit({shield:10});context.impact(unit(),target,20);const effect=context.state.battle.effects[0];assert.equal(effect.value,10);assert.equal(effect.absorbed,10);assert.equal(target.hp,90);});
console.log(`unit_total\t${checked}`);
console.log('not_assessed\tfull projectile flight, animation playback, movement and live timing interactions; direct helpers use fixed fixtures and midpoint damage RNG');
