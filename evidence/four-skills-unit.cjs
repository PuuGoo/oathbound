// PROTOTYPE - NOT FOR PRODUCTION
// Direct actual skill-system unit tests, fixed fixtures/RNG, no automated player.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {KITS,createHeroSkillSystem}=require('../hero-skills.js'),config={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../config.js'),'utf8'),config);
const tune=new Proxy({},{get:(_,k)=>config.window.CONFIG[k].value});
let count=0;function test(name,fn){fn();count++;console.log('PASS\t'+name);}
function fixture(){
 const unit=(kind,side,x,y,attack=100)=>({kind,side,x,y,attack,name:kind,slot:0,hp:10000,maxHP:10000,animation:'idle',facing:1});
 const lancer=unit('lancer',0,100,400),mage=unit('mage',0,80,420),ally=unit('ranger',0,60,450,150),front=unit('brute',1,160,400),near=unit('archer',1,220,420),far=unit('archer',1,800,450);
 const b={heroes:[lancer,mage,ally],enemies:[front,near,far],effects:[],projectiles:[],skillHits:[],elapsed:0},hits=[],events=[];let roll=.99;
 const s=createHeroSkillSystem({tune,rng:()=>roll,battle:()=>b,impact:(u,t,n)=>{const d=s.damage(u,t,n);t.hp=Math.max(0,t.hp-Math.round(d.amount));hits.push({u,t,n:d.amount});},animate:(u,a)=>u.animation=a,emit:e=>events.push(e)});
 for(const u of [...b.heroes,...b.enemies])s.initialize(u);
 const cast=(u,id,target=front)=>{const skill=s.kit(u).find(k=>k.id===id);s.cast(u,skill);s.resolve(u,{skillId:id,target,originX:u.x-100,originY:u.y});};
 return{s,b,lancer,mage,ally,front,near,far,hits,events,cast,roll:v=>roll=v};
}
test('each hero has four skills but Brilliance alone is passive',()=>{assert.equal(KITS.lancer.length,4);assert.equal(KITS.mage.length,4);assert.deepEqual(KITS.mage.filter(s=>s.passive).map(s=>s.id),['brilliance']);});
test('timers independent and oldest-ready prevents starvation',()=>{const f=fixture();for(const k of Object.keys(f.lancer.skillTimers))f.lancer.skillTimers[k]=-1;f.lancer.skillTimers.ridicule=-3;assert.equal(f.s.ready(f.lancer).id,'ridicule');f.s.cast(f.lancer,f.s.ready(f.lancer));assert.equal(f.lancer.skillTimers.ridicule,tune.ridiculeCooldown);assert.equal(f.lancer.skillTimers.joust,-1);});
test('Inspire buffs every living ally for configured duration without permanent attack mutation',()=>{const f=fixture();f.ally.hp=0;f.cast(f.lancer,'inspire');assert.equal(f.s.bonus(f.lancer,'attack'),tune.inspireAttack);assert.equal(f.s.bonus(f.mage,'attack'),tune.inspireAttack);assert.equal(f.s.bonus(f.ally,'attack'),0);assert.equal(f.lancer.attack,100);f.s.tick(f.b,tune.inspireDuration);assert.equal(f.s.bonus(f.mage,'attack'),0);});
test('Blessing chooses highest-attack living ally and adds attack/crit',()=>{const f=fixture();f.cast(f.mage,'blessing');assert.equal(f.s.bonus(f.ally,'attack'),tune.blessingAttack);assert.equal(f.s.bonus(f.ally,'crit'),tune.blessingCrit);assert.equal(f.s.bonus(f.mage,'crit'),0);});
test('Brilliance seeded critical threshold applies and emits passive feedback',()=>{const f=fixture();f.roll(tune.brillianceCrit-.001);assert.equal(f.s.damage(f.mage,f.front,100).amount,100*tune.criticalMultiplier);assert.equal(f.mage.critCount,1);assert.equal(f.mage.animation,'skillAura');f.roll(tune.brillianceCrit);assert.equal(f.s.damage(f.mage,f.front,100).critical,false);});
test('Joust schedules five hits then finisher and excludes far foe',()=>{const f=fixture();f.cast(f.lancer,'joust');assert.equal(f.b.skillHits.length,tune.joustHits+1);f.s.tick(f.b,1);assert.equal(f.hits.filter(h=>h.t===f.front).length,6);assert.ok(f.hits.every(h=>h.t!==f.far));assert.equal(f.front.controlLeft,tune.knockdownSeconds);});
test('dead caster cancels remaining multi-hit channel',()=>{const f=fixture();f.cast(f.mage,'divineLight');f.mage.hp=0;f.s.tick(f.b,1);assert.equal(f.hits.length,0);assert.equal(f.b.skillHits.length,0);});
test('knockdown interrupts channel but Royal Charge resists it',()=>{const f=fixture();f.cast(f.mage,'divineLight');f.s.stun(f.mage,tune.knockdownSeconds);f.s.tick(f.b,1);assert.equal(f.hits.length,0);f.lancer.action={skillId:'royalCharge'};f.s.stun(f.lancer,1);assert.equal(f.lancer.controlLeft,0);assert.ok(f.lancer.action);});
test('Royal Charge damages foes along path only',()=>{const f=fixture();f.cast(f.lancer,'royalCharge');assert.equal(f.hits.length,1);assert.equal(f.hits[0].t,f.front);assert.equal(f.hits[0].n,100*tune.royalChargeDamage);});
test('Ridicule primary plus nearby area and weakening expire',()=>{const f=fixture();f.cast(f.lancer,'ridicule');assert.equal(f.hits.filter(h=>h.t===f.front).length,2);assert.ok(f.hits.some(h=>h.t===f.near));assert.equal(f.s.bonus(f.near,'weaken'),tune.ridiculeWeaken);assert.equal(f.s.damage(f.near,f.ally,100).amount,100*(1-tune.ridiculeWeaken));f.s.tick(f.b,tune.ridiculeDuration);assert.equal(f.s.bonus(f.near,'weaken'),0);});
test('Divine Light emits four real timed hits within target area',()=>{const f=fixture();f.cast(f.mage,'divineLight');f.s.tick(f.b,.01);assert.equal(f.hits.filter(h=>h.t===f.front).length,1);f.s.tick(f.b,1);assert.equal(f.hits.filter(h=>h.t===f.front).length,tune.divineLightHits);assert.ok(f.hits.every(h=>h.t!==f.far));});
test('Divine Retribution defers explosion until actual orb arrival',()=>{const f=fixture();f.cast(f.mage,'divineRetribution');assert.equal(f.hits.length,0);assert.equal(f.b.projectiles.length,1);f.mage.hp=0;assert.equal(f.s.projectileImpact(f.b.projectiles[0]),true);assert.equal(f.hits.length,2);assert.ok(f.hits.every(h=>h.n===100*tune.divineRetributionDamage));});
test('dead destination receives no orb explosion',()=>{const f=fixture();f.cast(f.mage,'divineRetribution');f.front.hp=0;f.s.projectileImpact(f.b.projectiles[0]);assert.equal(f.hits.length,0);});
test('buff refresh does not stack same skill and death targets cannot be buffed',()=>{const f=fixture();f.cast(f.lancer,'inspire');f.cast(f.lancer,'inspire');assert.equal(f.s.bonus(f.mage,'attack'),tune.inspireAttack);f.ally.hp=0;f.cast(f.mage,'blessing');assert.equal(f.s.bonus(f.ally,'attack'),tune.inspireAttack);assert.equal(f.s.bonus(f.ally,'crit'),0);});
console.log('unit_total\t'+count);
console.log('not_assessed\tnative input, exact AFK Arena fidelity and live full encounter; actual skill helpers with fixed impact recorder');
