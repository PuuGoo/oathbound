// PROTOTYPE - NOT FOR PRODUCTION
// Isolated terminal-state unit tests: no browser, gameplay driver, input generation or campaign save injection.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const config={window:{}};
vm.createContext(config);vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8'),config);
const tune=new Proxy({},{get:(_,key)=>config.window.CONFIG[key].value});
function source(name,next){
  const start=html.indexOf(`function ${name}(`),end=html.indexOf(next,start);
  assert.ok(start>=0&&end>start,`source boundaries for ${name}`);return html.slice(start,end);
}
const fixture={resources:{gold:100,essence:50,shards:3},reward:{gold:160,essence:60,shards:2}};
let saved=0;
const context={tune,scene:'play',uiDirty:false,events:[],advanceAnimations:()=>{},save:()=>saved++};
vm.createContext(context);
vm.runInContext(source('totalStages','function stageLabel(')+source('reward','function upgradeCost(')+source('living','function log(')+source('updateBattle','function returnMap('),context);
function reset({elapsed=0,stage=0,cleared=0,heroAlive=true,enemyAlive=true}={}){
  saved=0;context.scene='play';context.uiDirty=false;context.events=[];
  context.progress={...fixture.resources,cleared};
  // Units stay in recovery and cannot move/act in these dt=0 terminal-condition checks.
  const unit=alive=>({hp:alive?1:0,flash:0,deadTime:0,attackCD:1,skillCD:1,recovery:1,moving:false});
  context.state={score:cleared,gained:'',battle:{elapsed,stage,heroes:[unit(heroAlive)],enemies:[unit(enemyAlive)],effects:[],projectiles:[],uiClock:0,won:false,reward:{...fixture.reward}}};
}
let checked=0;
function check(name,run){run();checked++;console.log(`PASS\t${name}`);}
function unchanged(){for(const key of ['gold','essence','shards'])assert.equal(context.progress[key],fixture.resources[key]);assert.equal(saved,0);}
check('ongoing battle before timeout stays active',()=>{
  reset({elapsed:tune.maxBattleSeconds-1/60});context.updateBattle(0);assert.equal(context.scene,'play');assert.equal(context.events.length,0);unchanged();
});
check('exact timeout boundary loses without spending or rewarding',()=>{
  reset({elapsed:tune.maxBattleSeconds});context.updateBattle(0);assert.equal(context.scene,'results');assert.equal(context.state.gained,'Hết thời gian giao tranh');assert.equal(context.state.battle.won,false);assert.equal(context.progress.cleared,0);unchanged();
});
check('timeout beyond boundary also loses',()=>{
  reset({elapsed:tune.maxBattleSeconds+1/60});context.updateBattle(0);assert.equal(context.state.gained,'Hết thời gian giao tranh');unchanged();
});
check('defeat takes precedence over timeout wording',()=>{
  reset({elapsed:tune.maxBattleSeconds,heroAlive:false});context.updateBattle(0);assert.equal(context.state.gained,'Đội hình đã gục ngã');unchanged();
});
check('enemy elimination at timeout awards victory',()=>{
  reset({elapsed:tune.maxBattleSeconds,enemyAlive:false});context.updateBattle(0);assert.equal(context.state.battle.won,true);assert.equal(context.progress.cleared,1);assert.equal(saved,1);
});
check('first-clear victory awards configured battle reward exactly once per finish call',()=>{
  reset({enemyAlive:false});context.updateBattle(0);for(const key of ['gold','essence','shards'])assert.equal(context.progress[key],fixture.resources[key]+fixture.reward[key]);assert.equal(context.state.score,1);assert.equal(context.events[0].type,'victory');assert.equal(context.scene,'results');assert.equal(saved,1);
});
check('repeat clear does not increment campaign count',()=>{
  reset({stage:0,cleared:2,enemyAlive:false});context.state.battle.reward=context.reward(0);context.updateBattle(0);assert.equal(context.progress.cleared,2);assert.equal(context.progress.shards,fixture.resources.shards);assert.equal(context.progress.gold,fixture.resources.gold+tune.repeatGold);
});
check('final clear reaches configured total without exceeding it',()=>{
  const last=context.totalStages()-1;reset({stage:last,cleared:last,enemyAlive:false});context.updateBattle(0);assert.equal(context.progress.cleared,context.totalStages());assert.equal(context.state.gained,'Bình minh đã trở lại');
});
check('defeat keeps progression and emits defeat event',()=>{
  reset({stage:2,cleared:2,heroAlive:false});context.updateBattle(0);assert.equal(context.progress.cleared,2);assert.equal(context.state.score,2);assert.equal(context.events[0].type,'defeat');unchanged();
});
console.log(`unit_total\t${checked}`);
console.log('not_assessed\tactual 90-second browser fight, action/projectile simulation and simultaneous-wipe design; terminal checks use isolated dt=0 fixtures');
