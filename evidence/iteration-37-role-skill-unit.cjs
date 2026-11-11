// PROTOTYPE - NOT FOR PRODUCTION
// Direct resolveAction checks with delivery recorder; not projectile or battle simulation.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const config={window:{}};vm.createContext(config);vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8'),config);
const tune=new Proxy({},{get:(_,key)=>config.window.CONFIG[key].value});
function source(name,next){const start=html.indexOf(`function ${name}(`),end=html.indexOf(next,start);assert.ok(start>=0&&end>start,name);return html.slice(start,end);}
const deliveries=[],context={tune,events:[],deliver:(...args)=>deliveries.push(args)};vm.createContext(context);
vm.runInContext(source('living','function log(')+source('weakest','function distance(')+source('resolveAction','/** Begin a private'),context);
const fixture={hp:100,maxHP:100,shield:0,slot:0,side:0,index:0,attack:20,x:0,y:0,kind:'ranger',name:'fixture'};
const unit=overrides=>({...fixture,...overrides});
let checked=0;
function check(name,run){deliveries.length=0;context.events=[];context.progress={heroes:[{evolved:false}]};context.state={battle:{heroes:[],enemies:[],effects:[],elapsed:0}};run();checked++;console.log(`PASS\t${name}`);}
check('warden shields living front slots only',()=>{
 const actor=unit({kind:'warden',slot:2}),front=unit(),dead=unit({hp:0,slot:1}),rear=unit({slot:3});context.state.battle.heroes=[actor,front,dead,rear];context.resolveAction(actor,{special:true});assert.equal(front.shield,Math.round(actor.attack*tune.shieldPower));assert.equal(dead.shield,0);assert.equal(actor.shield,0);assert.equal(rear.shield,0);assert.equal(context.state.battle.effects.length,1);
});
check('warden falls back to self when no front slot survives',()=>{
 const actor=unit({kind:'warden',slot:2});context.state.battle.heroes=[actor,unit({hp:0})];context.resolveAction(actor,{special:true});assert.equal(actor.shield,Math.round(actor.attack*tune.shieldPower));
});
check('warden preserves stronger existing shield rather than stacking',()=>{
 const actor=unit({kind:'warden'}),expected=Math.round(actor.attack*tune.shieldPower);actor.shield=expected+1;context.state.battle.heroes=[actor];context.resolveAction(actor,{special:true});assert.equal(actor.shield,expected+1);
});
check('mage releases exactly one area delivery per living foe',()=>{
 const actor=unit({kind:'mage'}),a=unit({side:1}),b=unit({side:1}),dead=unit({side:1,hp:0});context.state.battle.heroes=[actor];context.state.battle.enemies=[a,dead,b];context.resolveAction(actor,{special:true,target:a});assert.equal(deliveries.length,2);assert.equal(deliveries[0][1],a);assert.equal(deliveries[1][1],b);for(const d of deliveries){assert.equal(d[2],actor.attack*tune.areaDamage);assert.equal(d[4],true);}
});
check('enemy boss area skill targets heroes not own team',()=>{
 const actor=unit({kind:'boss',side:1}),hero=unit();context.state.battle.enemies=[actor];context.state.battle.heroes=[hero,unit({hp:0})];context.resolveAction(actor,{special:true,target:hero});assert.equal(deliveries.length,1);assert.equal(deliveries[0][1],hero);
});
check('lancer secondary delivery excludes primary and dead rear targets',()=>{
 const actor=unit({kind:'lancer'}),primary=unit({side:1,slot:2}),dead=unit({side:1,slot:3,hp:0}),secondary=unit({side:1,slot:4});context.state.battle.enemies=[primary,dead,secondary];context.resolveAction(actor,{special:true,target:primary});assert.equal(deliveries.length,2);assert.equal(deliveries[0][1],primary);assert.equal(deliveries[1][1],secondary);assert.equal(deliveries[0][2],actor.attack*tune.skillDamage);assert.equal(deliveries[1][2],actor.attack*tune.areaDamage);assert.equal(deliveries[1][4],true);
});
check('evolution adds skill multiplier but not normal attack multiplier',()=>{
 const actor=unit(),target=unit({side:1});context.progress.heroes[0].evolved=true;context.resolveAction(actor,{special:true,target});assert.equal(deliveries[0][2],actor.attack*tune.evolveMultiplier*tune.skillDamage);context.resolveAction(actor,{special:false,target});assert.equal(deliveries[1][2],actor.attack);
});
check('enemy shaman heals living own-team replacement after target death',()=>{
 const actor=unit({kind:'shaman',side:1}),weak=unit({side:1,hp:1}),dead=unit({side:1,hp:0});context.state.battle.enemies=[actor,weak,dead];context.state.battle.heroes=[unit({hp:1})];context.resolveAction(actor,{special:true,target:dead});assert.equal(deliveries.length,1);assert.equal(deliveries[0][1],weak);assert.equal(deliveries[0][2],actor.attack*tune.healPower);assert.equal(deliveries[0][3],true);
});
console.log(`unit_total\t${checked}`);
console.log('not_assessed\tprojectile arrival, actual damage, live skill timing/animation and full encounters; delivery calls recorded, not simulated');
