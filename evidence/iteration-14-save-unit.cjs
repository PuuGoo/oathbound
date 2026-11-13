// PROTOTYPE - NOT FOR PRODUCTION
// Save helper unit tests: in-memory storage doubles only; no real browser storage or files are written.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const config={window:{}};vm.createContext(config);vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8'),config);
const tune=new Proxy({},{get:(_,key)=>config.window.CONFIG[key].value});
function source(name,next){const start=html.indexOf(`function ${name}(`),end=html.indexOf(next,start);assert.ok(start>=0&&end>start,name);return html.slice(start,end);}
let stored=null,readFails=false,writeFails=false,writes=0;
const context={window:{migrateRosterProgress:require('../roster-system.js').migrateProgress},totalStages:()=>tune.chapters*tune.stagesPerChapter,tune,HEROES:Array.from({length:5},()=>({})),SAVE:'test-only',state:{saveFailed:false},uiDirty:false,
 localStorage:{getItem(){if(readFails)throw new Error('read blocked');return stored;},setItem(key,value){if(writeFails)throw new Error('write blocked');assert.equal(key,'test-only');stored=value;writes++;}}};
vm.createContext(context);vm.runInContext(source('fresh','let progress=load();')+source('save','function statFor('),context);
function valid(){return JSON.parse(JSON.stringify(context.fresh()));}
function set(value){stored=JSON.stringify(value);}
function expectFresh(){assert.deepEqual(JSON.parse(JSON.stringify(context.load())),valid());}
let checked=0;
function check(name,run){stored=null;readFails=false;writeFails=false;writes=0;context.state.saveFailed=false;context.uiDirty=false;run();checked++;console.log(`PASS\t${name}`);}
check('missing save returns fresh progress',expectFresh);
check('malformed JSON returns fresh progress',()=>{stored='{invalid';expectFresh();});
check('blocked reads return fresh progress',()=>{readFails=true;expectFresh();});
check('wrong version returns fresh progress',()=>{const p=valid();p.version=2;set(p);expectFresh();});
check('valid progress retains resources levels evolution and formation',()=>{const p=valid();p.gold+=100;p.essence+=50;p.shards=4;p.cleared=3;p.heroes[0]={level:3,evolved:true};p.formation=[1,0,4,3,2];set(p);assert.deepEqual(JSON.parse(JSON.stringify(context.load())),p);});
check('duplicate formation is rejected',()=>{const p=valid();p.formation=[0,0,2,3,4];set(p);expectFresh();});
check('out-of-range formation identity is rejected',()=>{const p=valid();p.formation=[0,1,2,3,5];set(p);expectFresh();});
check('fractional formation identity is rejected',()=>{const p=valid();p.formation=[0,1,2,3,4.5];set(p);expectFresh();});
check('wrong roster or formation lengths are rejected',()=>{for(const key of ['heroes','formation']){const p=valid();p[key].pop();set(p);expectFresh();}});
check('null hero is rejected without throwing',()=>{const p=valid();p.heroes[0]=null;set(p);expectFresh();});
check('invalid resource fields are rejected',()=>{for(const key of ['gold','essence','shards'])for(const value of [-1,null,'100']){const p=valid();p[key]=value;set(p);expectFresh();}});
check('invalid cleared counts are rejected',()=>{for(const value of [-1,0.5,tune.chapters*tune.stagesPerChapter+1,null]){const p=valid();p.cleared=value;set(p);expectFresh();}});
check('invalid levels are rejected',()=>{for(const value of [0,-1,1.5,31,null,'3']){const p=valid();p.heroes[0].level=value;set(p);expectFresh();}});
check('non-boolean evolution is rejected',()=>{for(const value of [null,0,'true']){const p=valid();p.heroes[0].evolved=value;set(p);expectFresh();}});
check('separate fresh saves do not share hero objects',()=>{const a=context.fresh(),b=context.fresh();a.heroes[0].level=4;assert.equal(b.heroes[0].level,1);});
check('successful save stores progress and clears failure flag',()=>{context.progress=valid();context.state.saveFailed=true;context.save();assert.equal(writes,1);assert.deepEqual(JSON.parse(stored),context.progress);assert.equal(context.state.saveFailed,false);assert.equal(context.uiDirty,true);});
check('failed write preserves session progress and previous stored value',()=>{const p=valid();p.gold+=100;context.progress=p;stored='old-save';writeFails=true;context.save();assert.equal(stored,'old-save');assert.equal(writes,0);assert.equal(context.progress,p);assert.equal(context.state.saveFailed,true);assert.equal(context.uiDirty,true);});
check('later successful save recovers from temporary write failure',()=>{context.progress=valid();writeFails=true;context.save();assert.equal(context.state.saveFailed,true);writeFails=false;context.save();assert.equal(context.state.saveFailed,false);assert.equal(writes,1);});
console.log(`unit_total\t${checked}`);
console.log('not_assessed\tnative browser storage quota/private-mode behavior, corrupt-file recovery UI and user saves; storage doubles only');
