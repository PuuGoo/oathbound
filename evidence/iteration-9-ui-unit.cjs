// PROTOTYPE - NOT FOR PRODUCTION
// Unit checks of the actual UI helpers with DOM doubles, not a browser/player simulation.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
function source(name,next){
  const start=html.indexOf(`function ${name}(`),end=html.indexOf(next,start);
  assert.ok(start>=0&&end>start,`source boundaries for ${name}`);
  return html.slice(start,end);
}
let checked=0;
function check(name,run){run();checked++;console.log(`PASS\t${name}`);}
class ElementDouble{
  constructor({editable=false,control=false}={}){this.editable=editable;this.control=control;}
  closest(selector){return selector.startsWith('input,')?this.editable:this.control;}
}
const focusCalls=[];
function control(options={}){
  return{disabled:false,dataset:{},id:'',tagName:'BUTTON',isConnected:false,
    getClientRects(){return this.hidden?[]:[{}];},
    focus(options){focusCalls.push({control:this,options});},...options};
}
const selected=control(),upgrade=control(),hero=control(),summary=control();
const ids={upgradeButton:upgrade,side:{querySelector:()=>summary}};
const selectors={'[data-hero="0"]':selected,'[data-hero="2"]':hero};
const context={Element:ElementDouble,scene:'play',state:{mode:'map',selectedHero:0},
  document:{querySelector:selector=>selectors[selector]||null},$:id=>ids[id]||null};
vm.createContext(context);
vm.runInContext(source('restorePanelFocus','function renderUI(')+source('controlOwnsKey',"addEventListener('keydown'"),context);
check('browser modifier combinations never become game commands',()=>{
  for(const modifier of ['ctrlKey','altKey','metaKey'])for(const code of ['KeyU','KeyE','Space','ArrowLeft'])assert.equal(context.controlOwnsKey({code,target:new ElementDouble(),[modifier]:true}),true);
});
check('composition and already-consumed events stay out of game shortcuts',()=>{
  for(const flag of ['isComposing','defaultPrevented'])assert.equal(context.controlOwnsKey({code:'KeyU',target:new ElementDouble(),[flag]:true}),true);
});
check('unmodified game shortcuts remain active',()=>{
  assert.equal(context.controlOwnsKey({code:'KeyU',target:new ElementDouble(),ctrlKey:false,altKey:false,metaKey:false,isComposing:false,defaultPrevented:false}),false);
});
check('Space and Enter belong to a native focused control',()=>{
  for(const code of ['Space','Enter'])assert.ok(context.controlOwnsKey({code,target:new ElementDouble({control:true})}));
});
check('game shortcuts remain available outside controls',()=>{
  for(const code of ['Space','Enter','KeyU'])assert.equal(context.controlOwnsKey({code,target:new ElementDouble()}),false);
});
check('non-activation shortcut remains available on buttons',()=>{
  assert.equal(context.controlOwnsKey({code:'KeyP',target:new ElementDouble({control:true})}),false);
});
check('editing fields own all keyboard input',()=>{
  for(const code of ['Space','KeyU','ArrowRight'])assert.ok(context.controlOwnsKey({code,target:new ElementDouble({editable:true})}));
});
check('non-element event target does not suppress shortcuts',()=>{
  assert.equal(context.controlOwnsKey({code:'Space',target:{}}),false);
});
check('removed hero card resolves by identity, not formation position',()=>{
  context.restorePanelFocus(control({dataset:{hero:'2'}}));assert.equal(focusCalls.at(-1).control,hero);assert.equal(focusCalls.at(-1).options.preventScroll,true);
});
check('removed action resolves by ID',()=>{
  context.restorePanelFocus(control({id:'upgradeButton'}));assert.equal(focusCalls.at(-1).control,upgrade);
});
check('disabled upgrade falls back to selected hero',()=>{
  upgrade.disabled=true;context.restorePanelFocus(control({id:'upgradeButton'}));assert.equal(focusCalls.at(-1).control,selected);upgrade.disabled=false;
});
check('hidden upgrade falls back to selected hero',()=>{
  upgrade.hidden=true;context.restorePanelFocus(control({id:'upgradeButton'}));assert.equal(focusCalls.at(-1).control,selected);upgrade.hidden=false;
});
check('connected or absent focus is untouched',()=>{
  const count=focusCalls.length;context.restorePanelFocus(null);context.restorePanelFocus(control({isConnected:true}));assert.equal(focusCalls.length,count);
});
check('pause and results do not restore background panel focus',()=>{
  const count=focusCalls.length;for(const scene of ['pause','results','title']){context.scene=scene;context.restorePanelFocus(control({id:'upgradeButton'}));}assert.equal(focusCalls.length,count);context.scene='play';
});
check('battle details summary resolves without map fallback',()=>{
  context.state.mode='battle';context.restorePanelFocus(control({tagName:'SUMMARY'}));assert.equal(focusCalls.at(-1).control,summary);
  const count=focusCalls.length;summary.hidden=true;context.restorePanelFocus(control({tagName:'SUMMARY'}));assert.equal(focusCalls.length,count);
});
check('overlay scenes mark every background control region inert',()=>{
  const regions=['top','chapterTabs','battleHUD','side','roster'];
  for(const id of regions)if(!ids[id])ids[id]={};
  for(const scene of ['title','pause','results','figures']){context.scene=scene;context.syncBackgroundInteraction();for(const id of regions)assert.equal(ids[id].inert,true);}
});
check('play scene restores background interaction',()=>{
  context.scene='play';context.syncBackgroundInteraction();for(const id of ['top','chapterTabs','battleHUD','side','roster'])assert.equal(ids[id].inert,false);
});
console.log(`unit_total\t${checked}`);
console.log('not_assessed\tnative browser focus, Tab order and default button activation; these are DOM-double unit tests only');
