// PROTOTYPE - NOT FOR PRODUCTION
// Markup contracts for the actual scrollable collection description, not a browser simulation.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');let passed=0,failed=0;
function test(name,fn){try{fn();passed++;console.log('PASS\t'+name);}catch(e){failed++;console.log('FAIL\t'+name+'\t'+e.message.split('\n')[0]);}}
test('long collection description is a named keyboard-focusable region',()=>{const tag=html.match(/<div\b[^>]*id="collectionInfo"[^>]*>/)?.[0];assert.ok(tag);assert.match(tag,/\btabindex="0"/);assert.match(tag,/\brole="region"/);assert.match(tag,/\baria-label="Thông tin tướng"/);});
test('focused description has a visible outline while existing overflow remains available',()=>{assert.match(html,/#collectionInfo:focus-visible\s*\{[^}]*outline:\s*2px solid #e8c483[^}]*outline-offset:\s*2px/);assert.match(html,/#collectionInfo\{max-height:80px;overflow:auto\}/);assert.match(html,/#collectionInfo\{font-size:11px;max-height:50px\}/);});
test('collection dialog still guards gameplay key interception before default prevention',()=>{const listener=html.match(/addEventListener\('keydown',e=>\{([^\n]+)\}\);addEventListener\('keyup'/)?.[1];assert.ok(listener);assert.ok(listener.indexOf("$('collectionDialog').open")<listener.indexOf('e.preventDefault()'));assert.ok(listener.includes("$('collectionDialog').open||controlOwnsKey(e))return"));});
console.log('unit_total\t'+passed);console.log('unit_failed\t'+failed);if(failed)process.exitCode=1;
