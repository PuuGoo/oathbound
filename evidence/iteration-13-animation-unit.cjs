// PROTOTYPE - NOT FOR PRODUCTION
// Direct animation/crop assertions. Draw recorder is a unit double, not rendered-image evidence.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const config={window:{}};vm.createContext(config);vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8'),config);
const tune=new Proxy({},{get:(_,key)=>config.window.CONFIG[key].value});
const start=html.indexOf('function lancerClip('),end=html.indexOf('/** Deterministic gameplay RNG',start);
assert.ok(start>=0&&end>start);
const draws=[],transforms=[];
const context={tune,lancerAssetReady:true,lancerSheet:{},events:[],state:{battle:null},ellipse:()=>{},star:()=>{},ctx:{save:()=>{},restore:()=>{},translate:()=>{},scale:(x,y)=>transforms.push([x,y]),drawImage:(...args)=>draws.push(args)}};
vm.createContext(context);vm.runInContext(html.slice(start,end),context);
let checked=0;
function check(name,run){draws.length=0;transforms.length=0;context.events=[];run();checked++;console.log(`PASS\t${name}`);}
function unit(animation='idle'){return{kind:'lancer',name:'Estrilda',animation,animationTime:0};}
function frame(animation,time){context.drawLancerSprite(0,0,1,false,animation,time);return draws.at(-1)[1]/tune.lancerFrameWidth;}
check('idle wraps at configured frame count',()=>{const clip=context.lancerClip('idle');assert.equal(frame('idle',clip.count/clip.fps),0);assert.equal(frame('idle',(clip.count+2)/clip.fps),2);});
check('negative render time clamps to first frame',()=>{assert.equal(frame('attack',-1),0);});
check('one-shot rendering clamps to final frame',()=>{for(const name of ['attack','hit','death','skill','skillShield','skillAura','skillArc'])assert.equal(frame(name,100),tune.lancerFrameCount-1);});
check('all clip crops remain within original 1086x1448 atlas',()=>{for(const name of ['idle','attack','hit','death','skill','skillShield','skillAura','skillArc']){const clip=context.lancerClip(name);assert.ok(clip.y>=0&&clip.y+clip.height<=1448);assert.ok(clip.anchorY>=0&&clip.anchorY<=clip.height);assert.ok(clip.fps>0);assert.ok(clip.count*tune.lancerFrameWidth<=1086);}});
check('draw uses configured row crop and anchor',()=>{const clip=context.lancerClip('skillArc');context.drawLancerSprite(0,0,1,false,'skillArc',0);const args=draws.at(-1);assert.equal(args[2],clip.y);assert.equal(args[4],clip.height);assert.equal(args[5],-tune.lancerAnchorX);assert.equal(args[6],-clip.anchorY);});
check('facing changes transform sign without changing crop',()=>{context.drawLancerSprite(0,0,1,true,'idle',0);assert.equal(transforms[0][0],-1);assert.equal(transforms[0][1],1);});
check('unavailable sprite returns false without drawing',()=>{context.lancerAssetReady=false;assert.equal(context.drawLancerSprite(0,0,1),false);assert.equal(draws.length,0);context.lancerAssetReady=true;});
check('new animation resets time and records one event',()=>{const u=unit();u.animationTime=2;context.playUnitAnimation(u,'skill');assert.equal(u.animation,'skill');assert.equal(u.animationTime,0);assert.equal(context.events.length,1);assert.equal(context.events[0].animation,'skill');});
check('death cannot be interrupted by attack hit or skill',()=>{const u=unit('death');u.animationTime=2;for(const name of ['attack','hit','skill'])context.playUnitAnimation(u,name);assert.equal(u.animation,'death');assert.equal(u.animationTime,2);assert.equal(context.events.length,0);});
check('procedural enemy does not enter hero sprite clips',()=>{const u={...unit(),kind:'brute'};context.playUnitAnimation(u,'skill');assert.equal(u.animation,'idle');assert.equal(context.events.length,0);});
check('one-shot stays active before duration and returns idle at boundary',()=>{for(const name of ['attack','hit','skill','skillShield','skillAura','skillArc']){const u=unit(name),clip=context.lancerClip(name);context.state.battle={heroes:[u],enemies:[]};context.advanceAnimations(clip.count/clip.fps-1/60);assert.equal(u.animation,name);context.advanceAnimations(1/60+1e-9);assert.equal(u.animation,'idle');assert.equal(u.animationTime,0);}});
check('death clock advances but terminal clip remains death',()=>{const u=unit('death');context.state.battle={heroes:[u],enemies:[]};context.advanceAnimations(100);assert.equal(u.animation,'death');assert.equal(u.animationTime,100);});
check('no battle animation advance is safe',()=>{context.state.battle=null;assert.doesNotThrow(()=>context.advanceAnimations(1/60));});
console.log(`unit_total\t${checked}`);
console.log('not_assessed\tvisual animation quality and all four skill variants in a live fight; draw arguments and helper transitions only');
