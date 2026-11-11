// PROTOTYPE - NOT FOR PRODUCTION
// Direct focus-loss/input-unit check; not a browser blur simulation or robot player.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
function source(name,next){const start=html.indexOf(`function ${name}(`),end=html.indexOf(next,start);assert.ok(start>=0&&end>start,name);return html.slice(start,end);}
const context={scene:'play',state:{mode:'battle',t:0},down:new Set(['KeyP']),hit:new Set(['KeyP']),uiDirty:false,toastTime:0};
vm.createContext(context);
vm.runInContext(source('handleFocusLoss',"addEventListener('keydown'")+source('update','// Original code-drawn illustrations.'),context);
// Establish the old handler's exact pending-P failure with the current pause update branch.
context.down.clear();context.scene='pause';context.update(1/60);
assert.equal(context.scene,'play');
console.log('reproduced_old_behavior\tpending P resumes immediately after old blur handler');
let count=0;
function check(name,run){context.scene='play';context.state={mode:'battle',t:0};context.down=new Set(['KeyP']);context.hit=new Set(['KeyP']);context.uiDirty=false;run();count++;console.log(`PASS\t${name}`);}
check('focus loss clears both held and pending input',()=>{context.handleFocusLoss();assert.equal(context.down.size,0);assert.equal(context.hit.size,0);});
check('pending P cannot undo automatic pause on next step',()=>{context.handleFocusLoss();assert.equal(context.scene,'pause');context.update(1/60);assert.equal(context.scene,'pause');assert.equal(context.state.t,0);assert.equal(context.uiDirty,true);});
check('map focus loss clears pending upgrade and stage selection without scene change',()=>{context.state.mode='map';context.hit=new Set(['KeyU','ArrowRight','Space']);context.handleFocusLoss();assert.equal(context.scene,'play');assert.equal(context.hit.size,0);});
check('existing pause and results are not resumed by focus loss',()=>{for(const scene of ['pause','results','title']){context.scene=scene;context.hit.add('Enter');context.handleFocusLoss();assert.equal(context.scene,scene);assert.equal(context.hit.size,0);}});
console.log(`unit_total\t${count}`);
console.log('not_assessed\tnative OS focus switching and browser blur timing; actual helper and update functions tested with isolated pending-input sets');
