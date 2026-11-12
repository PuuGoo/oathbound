// PROTOTYPE - NOT FOR PRODUCTION
// Actual helper tests with Canvas recorder; no browser/visual fidelity claim.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),cfg={window:{}};
vm.createContext(cfg);vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8'),cfg);
const tune=new Proxy({},{get:(_,k)=>cfg.window.CONFIG[k]?.value});
const start=html.indexOf('function lancerClip('),end=html.indexOf('/** Deterministic gameplay RNG',start),draws=[];
const context={tune,lancerAssetReady:true,lancerSheet:{},belindaAssetReady:true,belindaSheet:{},events:[],state:{battle:null},ellipse:()=>{},star:()=>{},ctx:{save:()=>{},restore:()=>{},translate:()=>{},scale:()=>{},drawImage:(...a)=>draws.push(a)}};
vm.createContext(context);vm.runInContext(html.slice(start,end),context);
let total=0;function check(name,fn){draws.length=0;fn();console.log('PASS\t'+name);total++;}
const unit=(animation='idle')=>({kind:'mage',name:'Belinda',animation,animationTime:0});
check('mage enters sprite attack and emits event',()=>{const u=unit();context.playUnitAnimation(u,'attack');assert.equal(u.animation,'attack');assert.equal(context.events.at(-1).actor,'Belinda');});
check('all Belinda clip crops stay within packed atlas',()=>{for(const name of ['idle','attack','hit','death','skill','skillShield','skillAura','skillArc']){const c=context.belindaClip(name);assert.ok(c.y>=0&&c.y+c.height<=2048);assert.ok(c.count*tune.belindaFrameWidth<=2048);assert.ok(c.anchorY<=c.height&&c.fps>0);assert.equal(c.count,['idle','attack','hit'].includes(name)?7:8);}});
check('Belinda idle loops but death holds last of eight frames',()=>{const c=context.belindaClip('idle');context.drawBelindaSprite(0,0,1,false,'idle',c.count/c.fps);assert.equal(draws.at(-1)[1],0);context.drawBelindaSprite(0,0,1,false,'death',100);assert.equal(draws.at(-1)[1],7*tune.belindaFrameWidth);});
check('mage one-shots return idle on their configured duration',()=>{for(const name of ['attack','hit','skill','skillShield','skillAura','skillArc']){const u=unit(name),c=context.belindaClip(name);context.state.battle={heroes:[u],enemies:[]};context.advanceAnimations(c.count/c.fps+1e-9);assert.equal(u.animation,'idle');}});
check('mage death resists new attack and never loops',()=>{const u=unit('death');context.playUnitAnimation(u,'attack');context.state.battle={heroes:[u],enemies:[]};context.advanceAnimations(100);assert.equal(u.animation,'death');});
check('unavailable Belinda sheet draws nothing',()=>{context.belindaAssetReady=false;assert.equal(context.drawBelindaSprite(0,0,1),false);assert.equal(draws.length,0);});
console.log('unit_total\t'+total);
