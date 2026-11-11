// PROTOTYPE - NOT FOR PRODUCTION
// Actual stage-selection helper unit checks; no browser player or save injection.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const start=html.indexOf('function selectStage('),end=html.indexOf('/** Begin a battle',start);assert.ok(start>=0&&end>start);
const context={scene:'play',state:{mode:'map',selectedStage:4,chapter:0,swap:1},progress:{cleared:5},tune:{stagesPerChapter:5},totalStages:()=>10,uiDirty:false};
vm.createContext(context);vm.runInContext(html.slice(start,end),context);
let count=0;
function check(name,run){context.scene='play';context.state={mode:'map',selectedStage:4,chapter:0,swap:1};context.uiDirty=false;run();count++;console.log(`PASS\t${name}`);}
check('next chapter selection updates visible chapter',()=>{context.selectStage(5);assert.equal(context.state.chapter,1);assert.equal(context.state.selectedStage,5);assert.equal(context.state.swap,null);assert.equal(context.uiDirty,true);});
check('previous chapter selection restores visible chapter',()=>{context.state.chapter=1;context.selectStage(0);assert.equal(context.state.chapter,0);assert.equal(context.state.selectedStage,0);});
check('locked stage is ignored',()=>{context.selectStage(6);assert.equal(context.state.selectedStage,4);assert.equal(context.uiDirty,false);});
check('invalid indices are ignored',()=>{for(const index of [-1,10,1.5,NaN,'1'])context.selectStage(index);assert.equal(context.state.selectedStage,4);assert.equal(context.uiDirty,false);});
check('selection outside play is ignored',()=>{context.scene='results';context.selectStage(5);assert.equal(context.state.selectedStage,4);});
check('selection during battle is ignored',()=>{context.state.mode='battle';context.selectStage(5);assert.equal(context.state.selectedStage,4);});
console.log(`unit_total\t${count}`);
console.log('not_assessed\tnative keyboard navigation; helper assertions only, see prescribed runtime captures separately');
