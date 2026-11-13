// PROTOTYPE - NOT FOR PRODUCTION
// Exercise the actual delegated UI listener, not a browser or combat substitute.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),start=html.indexOf("app.addEventListener('click'"),end=html.indexOf("canvas.addEventListener('click'",start);
let passed=0,failed=0;function test(n,fn){try{fn();passed++;console.log('PASS\t'+n);}catch(e){failed++;console.log('FAIL\t'+n+'\t'+e.message);}}
function fixture(open=false){const details={open},summary={closest:s=>s==='details'?details:null},c={app:{addEventListener:(type,fn)=>c.listener=fn},uiDirty:false};vm.createContext(c);vm.runInContext(html.slice(start,end),c);let prevented=false;return{c,details,click(){c.listener({target:{closest:s=>s==='#side summary'?summary:null},preventDefault(){prevented=true;}});},prevented:()=>prevented};}
test('battle details activation commits open state synchronously before panel rebuild',()=>{const f=fixture();f.click();assert.equal(f.details.open,true);assert.equal(f.c.uiDirty,true);assert.equal(f.prevented(),true);});
test('second activation closes details exactly once without duplicate browser default toggle',()=>{const f=fixture(true);f.click();assert.equal(f.details.open,false);assert.equal(f.prevented(),true);});
test('health summary exposes stable button identity and rendered expanded state',()=>{assert.ok(html.includes('<summary id="healthDetailsToggle" role="button" aria-expanded="${detailsOpen}"'));});
test('unrelated nonbutton clicks do not change UI or consume browser default',()=>{const f=fixture();let prevented=false;f.c.listener({target:{closest:()=>null},preventDefault(){prevented=true;}});assert.equal(f.details.open,false);assert.equal(f.c.uiDirty,false);assert.equal(prevented,false);});
console.log('unit_total\t'+passed);console.log('unit_failed\t'+failed);if(failed)process.exitCode=1;
