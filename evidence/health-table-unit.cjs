// PROTOTYPE - NOT FOR PRODUCTION
// Extract the actual detailed-HP template; never substitute a combat simulator.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),marker="[...b.heroes,...b.enemies].map(u=>`<tr>",start=html.indexOf(marker),end=html.indexOf(".join('')",start)+".join('')".length;
const fixture=()=>({heroes:[{side:0,name:'ally',hp:10.125,maxHP:100.5,shield:12.375}],enemies:[{side:1,name:'enemy',hp:0,maxHP:200,shield:0}]});
let passed=0,failed=0;function test(n,fn){try{fn();passed++;console.log('PASS\t'+n);}catch(e){failed++;console.log('FAIL\t'+n+'\t'+e.message);}}
function render(b){assert.ok(start>=0&&end>start);return vm.runInNewContext(html.slice(start,end),{b,Math});}
test('detailed HP table rounds fractional display cells without long floating point tails',()=>{assert.equal(render(fixture()),'<tr><td>Bạn · ally</td><td>10/101</td><td>12</td></tr><tr><td>Địch · enemy</td><td>0/200</td><td>0</td></tr>');});
test('rendering detailed HP table preserves exact fractional simulation values',()=>{const b=fixture(),before=JSON.stringify(b);render(b);assert.equal(JSON.stringify(b),before);});
console.log('unit_total\t'+passed);console.log('unit_failed\t'+failed);if(failed)process.exitCode=1;
