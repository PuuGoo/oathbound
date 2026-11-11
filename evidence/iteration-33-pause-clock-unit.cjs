// PROTOTYPE - NOT FOR PRODUCTION
// Actual update entry/exit checks, no battle simulator or browser driver.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const start=html.indexOf('function update('),end=html.indexOf('// Original code-drawn illustrations.',start);
assert.ok(start>=0&&end>start);
let battleSteps=0;
const context={scene:'play',state:{mode:'battle',t:0},hit:new Set(),uiDirty:false,toastTime:0,updateBattle:()=>battleSteps++};
vm.createContext(context);vm.runInContext(html.slice(start,end),context);
let count=0;const dt=1/60;
function check(name,run){context.scene='play';context.state={mode:'battle',t:10};context.hit=new Set();context.uiDirty=false;battleSteps=0;run();count++;console.log(`PASS\t${name}`);}
check('P pause entry freezes visual clock and combat together',()=>{context.hit.add('KeyP');context.update(dt);assert.equal(context.scene,'pause');assert.equal(context.state.t,10);assert.equal(battleSteps,0);});
check('Escape pause entry also freezes both clocks',()=>{context.hit.add('Escape');context.update(dt);assert.equal(context.scene,'pause');assert.equal(context.state.t,10);assert.equal(battleSteps,0);});
check('pause hold and resume do not advance visual or combat clocks',()=>{context.scene='pause';context.update(dt);assert.equal(context.state.t,10);context.hit.add('KeyP');context.update(dt);assert.equal(context.scene,'play');assert.equal(context.state.t,10);assert.equal(battleSteps,0);});
check('ordinary battle step advances visual time and combat once',()=>{context.update(dt);assert.equal(context.state.t,10+dt);assert.equal(battleSteps,1);});
console.log(`unit_total\t${count}`);
console.log('not_assessed\tnative pause inputs, visual quality and full combat determinism; direct update with combat-call recorder');
