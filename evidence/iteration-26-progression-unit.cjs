// PROTOTYPE - NOT FOR PRODUCTION
// Direct progression helper checks; no browser, player bot or replacement economy implementation.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const config={window:{}};vm.createContext(config);vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8'),config);
const tune=new Proxy({},{get:(_,key)=>config.window.CONFIG[key].value});
function source(name,next){const start=html.indexOf(`function ${name}(`),end=html.indexOf(next,start);assert.ok(start>=0&&end>start,name);return html.slice(start,end);}
let saves=0,toasts=[];
const context={tune,HEROES:Array.from({length:5},(_,i)=>({name:`hero-${i}`})),save:()=>saves++,toast:message=>toasts.push(message)};
vm.createContext(context);
vm.runInContext(source('fresh','function load(')+source('upgradeCost','/** Selecting for upgrades'),context);
let checked=0;
function reset(){context.scene='play';context.state={mode:'map',selectedHero:0};context.progress=context.fresh();saves=0;toasts=[];}
function snapshot(){return JSON.stringify(context.progress);}
function check(name,run){reset();run();checked++;console.log(`PASS\t${name}`);}
function exactUpgrade(){const cost=context.upgradeCost(context.progress.heroes[context.state.selectedHero]);Object.assign(context.progress,{gold:cost.gold,essence:cost.essence});return cost;}
function exactEvolution(){context.progress.heroes[context.state.selectedHero].level=tune.evolveLevel;Object.assign(context.progress,{gold:tune.evolveGold,shards:tune.evolveShards});}
function rejected(action){const before=snapshot();action();assert.equal(snapshot(),before);assert.equal(saves,0);}
check('exact upgrade currency buys one level and saves once',()=>{
  exactUpgrade();context.upgrade();assert.equal(context.progress.gold,0);assert.equal(context.progress.essence,0);assert.equal(context.progress.heroes[0].level,2);assert.equal(saves,1);assert.equal(toasts.length,1);
});
check('one gold short does not spend either currency',()=>{
  exactUpgrade();context.progress.gold--;rejected(()=>context.upgrade());assert.equal(toasts.length,1);
});
check('one essence short does not spend either currency',()=>{
  exactUpgrade();context.progress.essence--;rejected(()=>context.upgrade());assert.equal(toasts.length,1);
});
check('maximum level rejects upgrade without spending',()=>{
  context.progress.heroes[0].level=tune.maxLevel;exactUpgrade();rejected(()=>context.upgrade());
});
check('last permitted upgrade reaches cap and another cannot spend',()=>{
  context.progress.heroes[0].level=tune.maxLevel-1;
  const cost=exactUpgrade();context.progress.gold+=cost.gold;context.progress.essence+=cost.essence;
  context.upgrade();assert.equal(context.progress.heroes[0].level,tune.maxLevel);const after=snapshot();context.upgrade();assert.equal(snapshot(),after);assert.equal(saves,1);
});
check('upgrade follows selected hero identity after formation rearrangement',()=>{
  context.progress.formation.reverse();context.state.selectedHero=4;exactUpgrade();const before=context.progress.formation.join(',');context.upgrade();
  assert.equal(context.progress.heroes[4].level,2);assert.ok(context.progress.heroes.slice(0,4).every(h=>h.level===1));assert.equal(context.progress.formation.join(','),before);assert.equal(saves,1);
});
check('exact evolution threshold spends only gold and shards once',()=>{
  exactEvolution();const essence=context.progress.essence;context.evolve();assert.equal(context.progress.gold,0);assert.equal(context.progress.shards,0);assert.equal(context.progress.essence,essence);assert.equal(context.progress.heroes[0].level,tune.evolveLevel);assert.equal(context.progress.heroes[0].evolved,true);assert.equal(saves,1);
});
check('evolution one level below threshold preserves all resources',()=>{
  exactEvolution();context.progress.heroes[0].level--;rejected(()=>context.evolve());
});
check('evolution one shard short preserves all resources',()=>{
  exactEvolution();context.progress.shards--;rejected(()=>context.evolve());
});
check('evolution one gold short preserves all resources',()=>{
  exactEvolution();context.progress.gold--;rejected(()=>context.evolve());
});
check('already evolved hero cannot spend a second evolution cost',()=>{
  exactEvolution();context.progress.heroes[0].evolved=true;rejected(()=>context.evolve());
});
check('both progression actions reject covered scenes and active combat',()=>{
  for(const scene of ['title','pause','results','figures']){
    reset();exactUpgrade();context.scene=scene;rejected(()=>context.upgrade());
    reset();exactEvolution();context.scene=scene;rejected(()=>context.evolve());
  }
  reset();exactUpgrade();context.state.mode='battle';rejected(()=>context.upgrade());
  reset();exactEvolution();context.state.mode='battle';rejected(()=>context.evolve());
});
console.log(`unit_total\t${checked}`);
console.log('not_assessed\tbrowser upgrade/evolution presentation, native controls, real persistence failures and long-term balance; actual progression helpers with save/toast recorders');
