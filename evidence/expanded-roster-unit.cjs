// PROTOTYPE - NOT FOR PRODUCTION
const assert=require('node:assert/strict');
const {expandCatalog,migrateProgress,equipHero}=require('../roster-system.js');
let passed=0;function test(name,fn){fn();passed++;console.log('PASS\t'+name);}
const base=()=>Array.from({length:5},(_,i)=>({id:'legacy-'+i}));
const save=()=>({version:1,gold:450,essence:120,shards:2,cleared:10,formation:[4,1,2,3,0],heroes:Array.from({length:5},()=>({level:2,evolved:false}))});
test('catalog appends seventeen unique identities preserving first five',()=>{const b=base(),a=expandCatalog(b);assert.equal(a.length,22);assert.equal(new Set(a.map(h=>h.id)).size,22);assert.deepEqual(a.slice(0,5),b);});
test('base and awakened variants stay separate',()=>{const a=expandCatalog(base());for(const id of ['thane','thane-awakened','eluard','eluard-awakened'])assert.ok(a.some(h=>h.id===id));});
test('remaining role kits identify prototypes while base Thane identifies its own kit',()=>{for(const h of expandCatalog(base()).slice(5)){if(['thane','hendrik','rowan','gwyneth','rosaline','cecilia','rigby','oscar','eluard','eluard-awakened','peggy','walker','morrow'].includes(h.id)){assert.equal(h.kitKind,h.id);assert.ok(!h.skill.includes('prototype'));}else{assert.match(h.kitKind,/^prototype-/);assert.match(h.skill,/prototype/);}assert.ok(h.combatKind);}});
test('legacy progress migrates all currencies upgrades and formation',()=>{const p=save(),m=migrateProgress(p,22,30,30);assert.deepEqual(m.heroes.slice(0,5),p.heroes);assert.deepEqual(m.formation,p.formation);for(const k of ['gold','essence','shards','cleared'])assert.equal(m[k],p[k]);assert.equal(m.heroes.length,22);assert.deepEqual(m.heroes[21],{level:1,evolved:false});assert.equal(p.heroes.length,5);});
test('expanded progress survives reload without resetting bench',()=>{const m=migrateProgress(save(),22,30,30);m.heroes[21].level=7;m.formation[0]=21;assert.deepEqual(migrateProgress(m,22,30,30),m);});
test('malformed saves rejected',()=>{for(const change of [p=>p.formation[0]=p.formation[1],p=>p.formation[0]=21,p=>p.heroes[0]=null,p=>p.gold=-1,p=>p.cleared=31,p=>p.heroes[0].level=31,p=>p.version=2]){const p=save();change(p);assert.equal(migrateProgress(p,22,30,30),null);}});
test('bench hero replaces exactly one slot without mutating input',()=>{const p=save().formation,r=equipHero(p,21,2,22);assert.deepEqual(r,[4,1,21,3,0]);assert.deepEqual(p,[4,1,2,3,0]);});
test('active hero swaps instead of duplicating',()=>{assert.deepEqual(equipHero([0,1,2,3,4],4,0,22),[4,1,2,3,0]);});
test('invalid equip requests cannot corrupt formation',()=>{for(const [i,s] of [[22,0],[-1,0],[1,5],[1,-1]])assert.equal(equipHero([0,1,2,3,4],i,s,22),null);});
console.log('unit_total\t'+passed);
