// PROTOTYPE - NOT FOR PRODUCTION
// UI copy contract against the actual battle template; screenshots cover layout.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
let passed=0,failed=0;
function test(name,fn){try{fn();passed++;console.log('PASS\t'+name);}catch(e){failed++;console.log('FAIL\t'+name+'\t'+e.message);}}
const start=html.indexOf('side.innerHTML=`<div class="sideHead"><span class="eyebrow">GIAO TRANH LIÊN TỤC'),end=html.indexOf('}else{const i=state.selectedHero',start),battle=start>=0&&end>start?html.slice(start,end):'';
test('battle guide distinguishes active cooldowns and conditional passive activation',()=>{assert.ok(battle);assert.ok(battle.includes('Chiêu chủ động có hồi chiêu riêng; nội tại kích hoạt theo điều kiện.'));});
test('completed roster battle guide does not claim new kits are generic experimental or all passives always active',()=>{assert.ok(battle);assert.ok(!battle.includes('Chiêu mới ghi “Thử nghiệm”'));assert.ok(!battle.includes('nội tại luôn bật'));});
console.log('unit_total\t'+passed);console.log('unit_failed\t'+failed);if(failed)process.exitCode=1;
