// PROTOTYPE - NOT FOR PRODUCTION
// Cosmetic-only Canvas feedback. No gameplay RNG, timers, damage or unit mutations.
(function(root){
'use strict';
const NAMES={darkRage:'DARK RAGE',shadedCorruption:'SHADED CORRUPTION',arcaneAbsorption:'ARCANE ABSORPTION',darkAura:'DARK AURA',eyeEvil:'EYE OF EVIL',bindingTerror:'BINDING TERROR',demonicMurmurs:'DEMONIC MURMURS',abyssalRetribution:'ABYSSAL RETRIBUTION',morrowBolt:'ĐẠN VỰC SÂU',saloonBlast:'SALOON BLAST',spittoonSmack:'SPITTOON SMACK',gunslinger:'GUNSLINGER',oldFaithful:'OLD FAITHFUL',dutyBound:'DUTY BOUND',royalScroll:'ROYAL SCROLL',royalGuards:'ROYAL GUARDS',royalMarksmen:'ROYAL MARKSMEN',fracturedReality:'FRACTURED REALITY',fatesCorrection:'FATE’S CORRECTION',astralDesolation:'ASTRAL DESOLATION',negateReality:'NEGATE REALITY',sanctimony:'SANCTIMONY',divineMiracle:'DIVINE MIRACLE',prayerProtection:'PRAYER OF PROTECTION',eluardJudgment:'JUDGMENT',auraHaste:'AURA OF HASTE',fineCuts:'FINE CUTS',sliceDice:'SLICE AND DICE',unfazed:'UNFAZED',barrelBomb:'BARREL BOMB',fireBreath:'FIRE BREATH',drunkenFrenzy:'DRUNKEN FRENZY',wellRested:'WELL RESTED',judgementDay:'JUDGEMENT DAY',bladePurification:'BLADE OF PURIFICATION',atonement:'ATONEMENT',devilTrap:'DEVIL TRAP',symbolsSin:'DẤU TỘI LỖI',motivation:'MOTIVATION',crazyCrockery:'CRAZY CROCKERY',afternoonTea:'AFTERNOON TEA',springCleaning:'SPRING CLEANING',divineArrow:'DIVINE ARROW',flamingArrows:'FLAMING ARROWS',lightningArrows:'LIGHTNING ARROWS',strengthInNumbers:'STRENGTH IN NUMBERS',gwynethArrow:'MŨI TÊN',dazzle:'DAZZLE',dazzleEnergyAdaptation:'DAZZLE · NHỊP THAY ENERGY',avianAssault:'AVIAN ASSAULT',healthySupplies:'HEALTHY SUPPLIES',damageControl:'DAMAGE CONTROL',cripplingBlow:'CRIPPLING BLOW',shieldBash:'SHIELD BASH',sacrificialShield:'SACRIFICIAL SHIELD',standfast:'STANDFAST',eviscerate:'EVISCERATE',lunge:'LUNGE',execution:'EXECUTION',focus:'FOCUS',heavensProtection:'HEAVEN’S PROTECTION',divineStrike:'DIVINE STRIKE',divineBlessing:'DIVINE BLESSING',blessedShield:'BLESSED SHIELD',cripple:'CRIPPLE',barrage:'BARRAGE',lockOn:'LOCK ON',exploit:'EXPLOIT',purification:'PURIFICATION',abate:'ABATE',confine:'CONFINE',silverBolt:'SILVER BOLT',joust:'JOUST',royalCharge:'ROYAL CHARGE',inspire:'INSPIRE',ridicule:'RIDICULE',divineLight:'DIVINE LIGHT',divineRetribution:'DIVINE RETRIBUTION',blessing:'BLESSING',brilliance:'BRILLIANCE'};
const COLORS={darkRage:'#ee8fcd',shadedCorruption:'#ad94e8',arcaneAbsorption:'#cc9bfa',darkAura:'#f1a1e8',eyeEvil:'#dfb8ff',bindingTerror:'#b9c8f7',demonicMurmurs:'#f3a9cf',abyssalRetribution:'#c698ff',morrowBolt:'#c6b0f7',saloonBlast:'#ffd18c',spittoonSmack:'#f6b49a',gunslinger:'#fff0bf',oldFaithful:'#f3d287',dutyBound:'#ffe0ad',royalScroll:'#c4f2cd',royalGuards:'#cde7ff',royalMarksmen:'#f5c8ea',fracturedReality:'#b8c9ff',fatesCorrection:'#ffe4ad',astralDesolation:'#c9b2ff',negateReality:'#b2fff0',sanctimony:'#ffe6ad',divineMiracle:'#c5edff',prayerProtection:'#f0f4cc',eluardJudgment:'#fff5cc',auraHaste:'#b7f5e3',fineCuts:'#e5f2ff',sliceDice:'#d5efff',unfazed:'#ffe8b5',barrelBomb:'#ffb05e',fireBreath:'#ffcf72',drunkenFrenzy:'#e9d091',wellRested:'#b9efba',judgementDay:'#fff0ae',bladePurification:'#d5eeff',atonement:'#d5fff2',devilTrap:'#efcbff',symbolsSin:'#ffe39c',motivation:'#ffe6b2',crazyCrockery:'#cceaff',afternoonTea:'#c7f4c5',springCleaning:'#eed5af',divineArrow:'#ffe5ab',flamingArrows:'#ffa05b',lightningArrows:'#99e9ff',strengthInNumbers:'#ffe9b5',gwynethArrow:'#f1dda8',dazzle:'#ffe09b',dazzleEnergyAdaptation:'#ffe09b',avianAssault:'#f0d2a4',healthySupplies:'#aef0bc',damageControl:'#a6e0ec',cripplingBlow:'#f8cf83',shieldBash:'#ffe1a4',sacrificialShield:'#b5ecff',standfast:'#c4f4bd',eviscerate:'#b7edff',lunge:'#a5e8fb',execution:'#ffe3a7',focus:'#d5f7ff',barrageSlow:'#ffc374',heavensProtection:'#ffe6a0',divineStrike:'#ffd374',divineBlessing:'#cdffbd',blessedShield:'#ffe6a0',cripple:'#ffb389',barrage:'#ffc374',lockOn:'#ff987e',exploit:'#ffb389',purification:'#9ceaff',abate:'#83ceff',confine:'#94dcff',silverBolt:'#d0eeff',joust:'#ffe4a3',royalCharge:'#ffc96d',inspire:'#f3cf71',ridicule:'#f79b74',divineLight:'#fff1bf',divineRetribution:'#bcefff',blessing:'#fff0a3',brilliance:'#ffffff'};
/** Invented prototype captions stay explicit even when sharing an original combat role. */
const PROTOTYPE={
  protoCleave:['CHÉM QUÉT','#ffc59c','slash'],protoHamstring:['CHÉM SUY LỰC','#ffa08e','weaken'],protoBladeTempo:['NHỊP KIẾM','#ffd89b','haste'],protoEdge:['LƯỠI SẮC','#ffc59c','slash'],
  protoSlam:['CHẤN ĐẤT','#e9c58c','slam'],protoGuardShell:['KHIÊN RIÊNG','#f5dfa5','shield'],protoPartyGuard:['TRẬN PHÒNG HỘ','#b0e6dc','shield'],protoFortitude:['BỀN BỈ','#e9c58c','shield'],
  protoBolt:['TIA TRỢ CHIẾN','#a6efc9','bolt'],protoMend:['VÁ THƯƠNG','#b9f6bc','heal'],protoRally:['HỢP LỰC','#d9f2a5','rally'],protoCare:['CHĂM SÓC','#b9f6bc','heal'],
  protoVolley:['LOẠT BẮN','#a9dfed','volley'],protoSnareShot:['ĐẠN NÍU CHÂN','#88cddd','slow'],protoRangedTempo:['NHỊP NGẮM','#a9efde','haste'],protoCadence:['TAY VỮNG','#a9dfed','haste'],
  protoNova:['VÒNG BÙNG SÁNG','#cbb7ff','nova'],protoDimming:['MÀN SUY LỰC','#a4acfa','weaken'],protoInsight:['NHÃN SÁNG','#edd1ff','crit'],protoSpark:['TIA MAY MẮN','#e9dcff','crit']
};
for(const [id,[name,color]]of Object.entries(PROTOTYPE)){NAMES[id]='THỬ NGHIỆM · '+name;COLORS[id]=color;}
/** Create simulation-clock presentation callbacks and a pure, repeatable renderer. */
function createSkillPresentation({tune,battle}){
  function add(phase,skill,source,target=source){
    const b=battle();if(!b)return;
    b.skillVisuals??=[];
    b.skillVisuals=b.skillVisuals.filter(e=>b.elapsed-e.born<e.life).slice(-(tune.vfxMaxRecords-1));
    b.skillVisuals.push({phase,skill,key:source.side+':'+source.slot,x:source.x,y:source.y,tx:target.x,ty:target.y,facing:source.facing||1,born:b.elapsed||0,life:phase==='hit'?tune.vfxHitLife:tune.vfxReleaseLife});
  }
  /** Receive an actual cast; anticipation itself follows the current action. */
  function cast(u,s){add('cast',s.id,u);}
  /** Receive a released skill, without releasing any damage here. */
  function release(u,a){add('release',a.skillId,u,a.target||u);}
  /** Receive each landed hit, including each multi-hit pulse. */
  function hit(u,target,skill){add('hit',skill,u,target);}
  /** Receive buffs and passive procs at their actual application time. */
  function buff(u,target,skill){add('buff',skill,u,target);}
  function critical(u,target){const id=u.kitKind??u.kind;if(id==='mage')add('hit','brilliance',u,target);else if(id==='prototype-mage')add('hit','protoSpark',u,target);else if(id==='thane')add('hit','focus',u,target);}
  /** Expire presentation records on simulation steps, never on draw or wall time. */
  function tick(b){if(b.skillVisuals)b.skillVisuals=b.skillVisuals.filter(e=>b.elapsed-e.born<e.life);}
  const clamp=v=>Math.max(0,Math.min(1,v));
  function ring(c,x,y,r,color,alpha=1){c.save();c.globalAlpha*=alpha;c.strokeStyle=color;c.lineWidth=2;c.beginPath();c.ellipse(x,y,r,r*.28,0,0,Math.PI*2);c.stroke();c.restore();}
  function ray(c,x,y,dx,dy,color,width=2){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(x+dx,y+dy);c.stroke();}
  function spark(c,x,y,r,color){ray(c,x-r,y,r*2,0,color);ray(c,x,y-r,0,r*2,color);ray(c,x-r*.45,y-r*.45,r*.9,r*.9,color,1);}
  /** Prototype effects are deterministic shapes driven only by an actual skill event. */
  function prototypeEffect(c,e,p,col){
    const shape=PROTOTYPE[e.skill][2],x=e.tx,y=e.ty-65,r=tune.vfxRingRadius;
    if(shape==='slash'){
      c.save();c.translate(x,y);c.rotate(-.6*e.facing);ray(c,-r*.6,15,r*1.2,-30,col,6*(1-p)+1);ray(c,-r*.35,21,r*.7,-20,'#fff7df',2);c.restore();
    }else if(shape==='slam'){
      ring(c,x,e.ty,15+p*r,col);for(let i=0;i<5;i++){const angle=i*Math.PI*2/5;ray(c,x,e.ty,Math.cos(angle)*r*p,Math.sin(angle)*r*p*.3,col,3);}
    }else if(shape==='shield'){
      c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(x-27,y-30);c.lineTo(x+27,y-30);c.lineTo(x+23,y+14);c.lineTo(x,y+37);c.lineTo(x-23,y+14);c.closePath();c.stroke();spark(c,x,y,11,col);
    }else if(shape==='bolt'||shape==='volley'){
      ray(c,e.x,e.y-65,x-e.x,y-e.y+65,col,3);spark(c,x,y,8+12*(1-p),col);
      if(shape==='volley')for(let i=-1;i<=1;i++)ray(c,x-e.facing*23,y+i*11,e.facing*18,0,col,2);
    }else if(shape==='heal'){
      ray(c,x-17,y,34,0,col,6);ray(c,x,y-17,0,34,col,6);ring(c,x,e.ty,18+p*r*.6,col);
    }else if(shape==='haste'){
      for(let i=0;i<3;i++){const start=x+(i-1)*21;ray(c,start-7,y+9,11,-16,col,3);ray(c,start+4,y-7,-11,-16,col,3);}
    }else if(shape==='slow'){
      for(let i=0;i<3;i++)ray(c,x-18+i*18,y-28,0,52,col,3);ring(c,x,e.ty,26+12*p,col);
    }else if(shape==='weaken'){
      ring(c,x,y,24+18*p,col);for(let i=-1;i<=1;i++){ray(c,x+i*19,y-18,0,35,col,3);ray(c,x+i*19,y+17,-6,-8,col,2);}
    }else if(shape==='nova'){
      ring(c,x,y,15+p*r,col);for(let i=0;i<6;i++){const angle=i*Math.PI/3;spark(c,x+Math.cos(angle)*r*p,y+Math.sin(angle)*r*p,7*(1-p)+2,col);}
    }else if(shape==='rally'){
      for(let i=-1;i<=1;i++){ray(c,x+i*20,y+22,0,-43,col,3);ray(c,x+i*20,y-21,-7,10,col,3);ray(c,x+i*20,y-21,7,10,col,3);}
    }else if(shape==='crit'){
      ray(c,x-24,y,24,-24,col,3);ray(c,x,y-24,24,24,col,3);ray(c,x+24,y,-24,24,col,3);ray(c,x,y+24,-24,-24,col,3);spark(c,x,y,12,col);
    }
  }
  function caption(c,label,x,y,color,alpha){c.save();c.globalAlpha*=alpha;c.font='bold 12px Georgia';c.textAlign='center';c.textBaseline='middle';const w=c.measureText(label).width+22;c.fillStyle='#142830ee';c.fillRect(x-w/2,y-12,w,24);ray(c,x-w/2,y+12,w,0,color);c.fillStyle=color;c.fillText(label,x,y);c.restore();}
  /** Render ground telegraphs separately, so figures and HP remain above them. */
  function ground(c,b){
    c.save();c.globalAlpha=tune.vfxOpacity;
    for(const u of [...b.heroes,...b.enemies])if(u.hp>0&&!(u.banishLeft>0)&&u.kitKind==='eluard-awakened'&&u.realmActive){c.strokeStyle=COLORS.fracturedReality;c.lineWidth=2;for(let i=0;i<5;i++){const x=160+i*155;ray(c,x,260,35,90,COLORS.fracturedReality,1);ray(c,x+35,350,-20,110,COLORS.fracturedReality,1);}ring(c,u.x,u.y,60,COLORS.fracturedReality,.7);}
    for(const e of b.corrosiveDecrees||[])if(e.target.hp>0&&!(e.target.banishLeft>0)&&!(e.target.entryLeft>0))ring(c,e.target.x,e.target.y,35,COLORS.astralDesolation,.7);
    for(const e of b.oscarAuras||[])if(e.left>0)ring(c,e.x,e.y,tune.auraHasteRadius,COLORS.auraHaste,.7);
    for(const e of b.oscarKnives||[]){if(e.left<=0)continue;ray(c,e.x-5,e.y-23,5,24,COLORS.fineCuts,3);ray(c,e.x-12,e.y-14,15,-3,COLORS.fineCuts,2);}
    for(const e of b.barrelBlasts||[])ring(c,e.x,e.y,tune.barrelRadius,COLORS.barrelBomb,.6);
    for(const e of b.devilTraps||[]){if(e.left<=0)continue;ring(c,e.x,e.y,tune.devilTrapRadius,COLORS.devilTrap,.8);ring(c,e.x,e.y,tune.devilTrapRadius*.92,COLORS.devilTrap,.35);}
    for(const u of [...b.heroes,...b.enemies]){
      if(u.entryLeft>0)continue;
      if(u.hp>0&&!(u.banishLeft>0)&&u.kitKind==='eluard'){
        if(u.divineShield>0){c.strokeStyle=COLORS.divineMiracle;c.lineWidth=2;c.beginPath();c.ellipse(u.x,u.y-55,42,65,0,0,Math.PI*2);c.stroke();}
        if(u.prayerToken===u.castToken&&u.channelLeft>0){const t=(u.side===0?b.heroes:b.enemies).find(t=>t.slot===u.prayerTargetSlot&&t.hp>0&&!(t.banishLeft>0)&&!(t.entryLeft>0));if(t){ray(c,u.x,u.y-75,t.x-u.x,t.y-u.y,COLORS.prayerProtection,2);ring(c,t.x,t.y,40,COLORS.prayerProtection);}}
      }
      if(u.hp>0&&u.kitKind==='rigby'&&u.frenzyStacks>0)ring(c,u.x,u.y,28+u.frenzyStacks*7,COLORS.drunkenFrenzy,.6);
      if(u.hp>0&&u.kitKind==='rosaline'){
        const followed=(u.side===0?b.heroes:b.enemies).find(t=>t.slot===u.followSlot&&t!==u&&t.hp>0&&!(t.banishLeft>0));
        if(followed)ray(c,u.x,u.y-28,followed.x-u.x,followed.y-u.y,COLORS.motivation,1);
        if(u.cleaningToken===u.castToken&&u.channelLeft>0)ring(c,u.x,u.y,45,COLORS.springCleaning,.7);
      }
      if(u.hp>0&&u.kitKind==='gwyneth'&&![...b.heroes,...b.enemies].some(t=>t.side!==u.side&&t.hp>0&&!(t.banishLeft>0)&&Math.hypot(t.x-u.x,t.y-u.y)<=tune.strengthRadius))ring(c,u.x,u.y,32,COLORS.strengthInNumbers,.5);
      if(u.hp>0&&u.standfastLeft>0){ring(c,u.x,u.y,42+Math.sin(b.elapsed*3)*4,COLORS.standfast,.8);}
      if(u.hp>0&&u.guardLeft>0){const protectedUnit=(u.side===0?b.heroes:b.enemies).find(t=>t.slot===u.protectedSlot&&t.hp>0);if(protectedUnit)ray(c,u.x,u.y-55,protectedUnit.x-u.x,protectedUnit.y-u.y,COLORS.sacrificialShield,2);}
      const a=u.action;if(u.hp<=0||!a?.skillId)continue;
      const id=a.skillId,color=COLORS[id],p=clamp(u.animationTime/Math.max(tune.skillWindup,.001));
      ring(c,u.x,u.y,25+25*p,color,.7);ring(c,u.x,u.y,33+20*(1-p),color,.35);
      if(id==='divineLight'&&a.target){ring(c,a.target.x,a.target.y,tune.divineLightRadius*(.6+.4*p),color,.65);}
      if((id==='protoNova'||id==='protoDimming')&&a.target)ring(c,a.target.x,a.target.y,tune.protoBurstRadius*(.6+.4*p),color,.65);
      if(id==='protoCleave'||id==='protoSlam')ring(c,u.x,u.y,Math.max(tune.meleeRange,tune.protoBurstRadius)*(.6+.4*p),color,.5);
      if(id==='royalCharge'||id==='lunge'){
        for(let i=0;i<tune.vfxTrailCount;i++){const f=i/tune.vfxTrailCount;ray(c,u.x-u.facing*(20+f*tune.vfxTrailLength),u.y-35-i*6,u.facing*tune.vfxTrailLength*(1-f),0,color,(1-f)*5);}
        ray(c,a.originX,a.originY,u.x-a.originX,u.y-a.originY,color,3);
      }
    }
    for(const e of b.skillVisuals||[]){const age=b.elapsed-e.born,p=clamp(age/e.life),col=COLORS[e.skill];
      if(e.phase==='buff')ring(c,e.tx,e.ty,25+p*tune.vfxRingRadius,col,1-p);
      if(e.phase==='release'&&e.skill==='inspire')ring(c,e.x,e.y,tune.vfxRingRadius*(1+3*p),col,(1-p)*.6);
      if(e.phase==='hit'&&['divineLight','divineRetribution','ridicule','royalCharge'].includes(e.skill))ring(c,e.tx,e.ty,15+p*tune.vfxRingRadius,col,1-p);
    }c.restore();
  }
  /** Pure cosmetic pose: brace, lift and recoil without moving the combat hitbox. */
  function pose(u){
    if(u.hp<=0||u.controlLeft>0)return{x:0,y:0,scale:1,rotation:0};
    if(u.action?.skillId){const p=clamp(u.animationTime/Math.max(tune.skillWindup,.001));return{x:-u.facing*Math.sin(p*Math.PI)*tune.vfxRecoil,y:u.kind==='mage'?-Math.sin(p*Math.PI)*tune.vfxLift:0,scale:1+Math.sin(p*Math.PI)*tune.vfxPoseScale,rotation:u.kind==='lancer'?-u.facing*Math.sin(p*Math.PI)*.035:0};}
    const b=battle(),released=(b?.skillVisuals||[]).filter(e=>e.phase==='release'&&e.key===u.side+':'+u.slot).at(-1);
    if(released){const p=clamp((b.elapsed-released.born)/tune.vfxHitLife),kick=Math.sin(p*Math.PI)*(1-p);return{x:u.facing*kick*tune.vfxRecoil,y:u.kind==='mage'?-kick*tune.vfxLift:0,scale:1+kick*tune.vfxPoseScale,rotation:0};}
    return{x:0,y:0,scale:1,rotation:0};
  }
  /** Render a radiant homing orb; return false for unrelated projectiles. */
  function projectile(c,p,b){
    if(p.skillId==='morrowBolt'){c.save();c.fillStyle=COLORS.morrowBolt;c.beginPath();c.ellipse(p.x,p.y,tune.vfxOrbRadius*1.5,tune.vfxOrbRadius,0,0,Math.PI*2);c.fill();spark(c,p.x,p.y,tune.vfxOrbRadius,COLORS.abyssalRetribution);c.restore();return true;}
    if(['walkerShell','gunslinger','spittoonSmack'].includes(p.skillId)){const col=p.skillId==='walkerShell'?COLORS.saloonBlast:COLORS[p.skillId],a=Math.atan2(p.target.y-65-p.y,p.target.x-p.x),r=tune.vfxOrbRadius;c.save();c.translate(p.x,p.y);c.rotate(a);ray(c,-r*3,0,r*4,0,col,p.enhanced?5:3);spark(c,r,0,r,col);if(p.skillId==='walkerShell')for(let i=-1;i<=1;i++)ray(c,-r*2,i*r,r*2,i*r*.5,col,1);c.restore();return true;}
    if(p.skillId==='royalMarksmen'){const angle=Math.atan2(p.target.y-65-p.y,p.target.x-p.x);c.save();c.translate(p.x,p.y);c.rotate(angle);ray(c,-18,0,36,0,COLORS.royalMarksmen,3);ray(c,12,-5,7,5,COLORS.royalMarksmen,2);ray(c,12,5,7,-5,COLORS.royalMarksmen,2);c.restore();return true;}
    if(p.skillId==='fineCuts'){const angle=Math.atan2(p.target.y-65-p.y,p.target.x-p.x);c.save();c.translate(p.x,p.y);c.rotate(angle);ray(c,-14,0,28,0,COLORS.fineCuts,3);ray(c,-4,-6,0,12,COLORS.fineCuts,2);c.restore();return true;}
    if(p.skillId==='barrelBomb'){c.save();c.translate(p.x,p.y);c.rotate(b.elapsed*3);c.fillStyle='#86542e';c.fillRect(-13,-17,26,34);c.strokeStyle=COLORS.barrelBomb;c.lineWidth=3;c.strokeRect(-13,-17,26,34);ray(c,-13,-8,26,0,COLORS.barrelBomb,2);ray(c,-13,8,26,0,COLORS.barrelBomb,2);c.restore();return true;}
    if(p.skillId==='crazyCrockery'){
      c.save();c.translate(p.x,p.y);c.rotate(b.elapsed*5);c.strokeStyle=COLORS.crazyCrockery;c.lineWidth=3;c.strokeRect(-8,-6,16,12);c.beginPath();c.arc(10,0,5,-Math.PI/2,Math.PI/2);c.stroke();c.restore();return true;
    }
    if(p.skillId==='gwynethArrow'){
      const col=p.lightning?COLORS.lightningArrows:p.flaming?COLORS.flamingArrows:COLORS.gwynethArrow;
      const angle=Math.atan2(p.target.y-65-p.y,p.target.x-p.x),dx=Math.cos(angle),dy=Math.sin(angle),r=tune.vfxOrbRadius;
      c.save();c.globalAlpha=tune.vfxOpacity;ray(c,p.x-dx*r*3,p.y-dy*r*3,dx*r*3,dy*r*3,col,3);spark(c,p.x,p.y,r,col);
      if(p.flaming)spark(c,p.x-dx*r*2,p.y-dy*r*2,r,COLORS.flamingArrows);c.restore();return true;
    }
    if(p.skillId==='protoBolt'){
      const col=COLORS.protoBolt,r=tune.vfxOrbRadius,angle=Math.atan2(p.target.y-65-p.y,p.target.x-p.x);
      c.save();c.globalAlpha=tune.vfxOpacity;c.shadowColor=col;c.shadowBlur=tune.vfxGlow;
      ray(c,p.x-Math.cos(angle)*r*3,p.y-Math.sin(angle)*r*3,Math.cos(angle)*r*3,Math.sin(angle)*r*3,col,3);spark(c,p.x,p.y,r,col);c.restore();return true;
    }
    if(p.skillId!=='divineRetribution')return false;
    const angle=Math.atan2(p.target.y-65-p.y,p.target.x-p.x),r=tune.vfxOrbRadius;
    c.save();c.globalAlpha=tune.vfxOpacity;c.shadowColor=COLORS.divineRetribution;c.shadowBlur=tune.vfxGlow;
    for(let i=4;i>0;i--){c.globalAlpha=tune.vfxOpacity*(1-i/5)*.6;c.fillStyle='#9cdeff';c.beginPath();c.arc(p.x-Math.cos(angle)*i*r,p.y-Math.sin(angle)*i*r,r*(1-i/6),0,Math.PI*2);c.fill();}
    c.globalAlpha=tune.vfxOpacity;c.fillStyle='#fffbe7';c.beginPath();c.arc(p.x,p.y,r,0,Math.PI*2);c.fill();ring(c,p.x,p.y,r*1.8,'#bcefff');spark(c,p.x,p.y,r*2,'#fff8d7');c.restore();return true;
  }
  /** Render releases/impacts after figures but before the game's status badges. */
  function foreground(c,b){
    c.save();c.globalAlpha=tune.vfxOpacity;
    for(const u of [...b.heroes,...b.enemies])if(u.hp>0&&!(u.banishLeft>0)&&!(u.entryLeft>0)&&u.kitKind==='peggy')for(const g of u.royalGuards||[]){if(g.hp<=0)continue;c.save();c.fillStyle=u.side===0?'#9fc9dc':'#dfb0ae';c.strokeStyle=COLORS.dutyBound;c.lineWidth=2;c.beginPath();c.arc(g.x,g.y-47,8,0,Math.PI*2);c.fill();c.fillRect(g.x-9,g.y-38,18,24);ray(c,g.x-5,g.y-14,-6,14,COLORS.dutyBound,4);ray(c,g.x+5,g.y-14,6,14,COLORS.dutyBound,4);c.strokeRect(g.x+(u.side===0?8:-22),g.y-38,14,22);ray(c,g.x-16,g.y-29,0,-28,COLORS.royalGuards,2);c.fillStyle='#15292e';c.fillRect(g.x-17,g.y-66,34,4);c.fillStyle=COLORS.royalScroll;c.fillRect(g.x-17,g.y-66,34*Math.max(0,g.hp/g.maxHP),4);if(g.shield>0)ring(c,g.x,g.y-20,24,COLORS.royalGuards);if(g.dutyLeft>0)ring(c,g.x,g.y,22,COLORS.dutyBound,.7);c.restore();}
    for(const u of [...b.heroes,...b.enemies]){const a=u.action;if(u.hp<=0||!a?.skillId)continue;
      const color=COLORS[a.skillId],p=clamp(u.animationTime/Math.max(tune.skillWindup,.001));
      c.save();c.shadowColor=color;c.shadowBlur=tune.vfxGlow;
      spark(c,u.x+u.facing*26,u.y-83,5+p*10,color);
      if(u.kind==='mage'){ring(c,u.x,u.y-65,18+p*16,color,.8);for(let i=0;i<4;i++){const angle=b.elapsed*3+i*Math.PI/2;spark(c,u.x+Math.cos(angle)*30,u.y-65+Math.sin(angle)*18,3,color);}}
      c.restore();caption(c,NAMES[a.skillId],Math.max(100,Math.min(820,u.x)),Math.max(234,u.y-tune.vfxCaptionHeight),color,.95);
    }
    for(const source of [...b.heroes,...b.enemies].filter(u=>u.kitKind==='cecilia'))for(const mark of source.sinMarks||[]){const target=[...b.heroes,...b.enemies].find(t=>t.side===mark.side&&t.slot===mark.slot&&t.hp>0&&!(t.banishLeft>0)&&!(t.entryLeft>0));if(target&&mark.count>0)caption(c,'TỘI '+mark.count,target.x,Math.max(235,target.y-151),COLORS.symbolsSin,.9);}
    for(const e of b.burns||[]){if(e.target.hp<=0||e.target.banishLeft>0)continue;const x=e.target.x,y=e.target.y-42,p=(b.elapsed%tune.burnInterval)/tune.burnInterval;c.save();c.globalAlpha*=.65;for(let i=-1;i<=1;i++)ray(c,x+i*12,y+16,4,-22-14*Math.sin(p*Math.PI+i),COLORS.flamingArrows,3);c.restore();}
    for(const e of b.skillVisuals||[]){
      const p=clamp((b.elapsed-e.born)/e.life),fade=Math.sin(Math.PI*Math.min(1,p+.12)),col=COLORS[e.skill];
      if(e.phase==='cast')continue;
      if(e.phase==='release'){
        const owner=[...b.heroes,...b.enemies].find(u=>u.side+':'+u.slot===e.key);
        if(owner?.hp>0&&!owner.action?.skillId&&(b.skillVisuals||[]).filter(v=>v.phase==='release'&&v.key===e.key).at(-1)===e)caption(c,NAMES[e.skill],Math.max(100,Math.min(820,owner.x)),Math.max(234,owner.y-tune.vfxCaptionHeight),col,1-p);
      }
      c.save();c.globalAlpha*=Math.max(0,fade);c.shadowColor=col;c.shadowBlur=tune.vfxGlow;
      const x=e.tx,y=e.ty-65;
      if(PROTOTYPE[e.skill]&&(e.phase==='hit'||e.phase==='buff'))prototypeEffect(c,e,p,col);
      else if(e.phase==='hit'){
        if(e.skill==='darkRage'){ray(c,x,y-125,0,145,col,5);spark(c,x,y,20*(1-p)+4,col);}
        else if(e.skill==='darkAura'){ring(c,x,e.ty,25+p*tune.darkAuraRadius,col);for(let i=0;i<6;i++){const a=i*Math.PI/3;ray(c,x,y,Math.cos(a)*60*p,Math.sin(a)*60*p,col,4);}}
        else if(e.skill==='arcaneAbsorption'){ray(c,x,y,e.x-x,e.y-65-y,col,3);ring(c,x,y,20+p*30,col);}
        else if(['eyeEvil','abyssalRetribution'].includes(e.skill)){c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.ellipse(x,y,26+18*p,12+8*p,0,0,Math.PI*2);c.stroke();spark(c,x,y,12,col);ring(c,x,e.ty,20+p*50,col);}
        else if(e.skill==='bindingTerror'){c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.ellipse(x,y+15,25,45,0,0,Math.PI*2);c.stroke();for(let i=-1;i<=1;i++)ray(c,x-24,y+i*20,48,20,col,2);}
        else if(e.skill==='demonicMurmurs'){ring(c,x,y,25+p*30,col);for(let i=-1;i<=1;i++)ray(c,x+i*16,y-30,0,55,col,3);}
        else if(['saloonBlast','gunslinger','spittoonSmack'].includes(e.skill)){spark(c,x,y,24*(1-p)+4,col);for(let i=-1;i<=1;i++)ray(c,x-e.facing*34,y+i*14,e.facing*30,-i*10,col,3);if(e.skill==='spittoonSmack')ring(c,x,e.ty,20+p*35,col);}
        else if(e.skill==='royalMarksmen'||e.skill==='dutyBound'){ray(c,x-20,y+20,40,-40,col,4);spark(c,x,y,18*(1-p)+4,col);}
        else if(e.skill==='fracturedReality'){for(let i=-1;i<=1;i++){ray(c,x+i*22,y-75,15,70,col,3);ray(c,x+i*22+15,y-5,-25,45,col,3);}ring(c,x,e.ty,20+p*70,col);}
        else if(e.skill==='astralDesolation'){ring(c,x,y,20+p*45,col);for(let i=0;i<4;i++){const a=i*Math.PI/2;ray(c,x+Math.cos(a)*30,y+Math.sin(a)*30,-Math.cos(a)*20,-Math.sin(a)*20,col,3);}}
        else if(e.skill==='eluardJudgment'||e.skill==='sanctimony'){ray(c,x,y-125,0,150,col,6*(1-p)+1);ring(c,x,e.ty,20+p*55,col);spark(c,x,y,24*(1-p)+5,col);}
        else if(e.skill==='fineCuts'||e.skill==='sliceDice'){ray(c,x-26,y+25,52,-50,col,4);ray(c,x-26,y-25,52,50,col,2);}
        else if(e.skill==='auraHaste'){ring(c,x,e.ty,20+p*tune.auraHasteRadius,col);spark(c,x,y,22,col);}
        else if(e.skill==='barrelBomb'){ring(c,x,e.ty,20+p*tune.barrelRadius,col);for(let i=0;i<6;i++){const a=i*Math.PI/3;ray(c,x,y,Math.cos(a)*50*p,Math.sin(a)*50*p,col,4);}}
        else if(e.skill==='fireBreath'){for(let i=-1;i<=1;i++)ray(c,e.x,e.y-65,x-e.x,y-e.y+65+i*22,col,7*(1-p)+1);spark(c,x,y,24,col);}
        else if(e.skill==='judgementDay'){ray(c,x,y-115+80*p,0,100,col,7);ray(c,x-22,y-38,44,0,col,4);spark(c,x,y,24*(1-p)+6,col);}
        else if(e.skill==='bladePurification'||e.skill==='atonement'){ray(c,x-30,y+25,60,-50,col,5);ray(c,x-20,y-30,40,60,col,2);}
        else if(e.skill==='devilTrap'){ring(c,x,e.ty,20+p*50,col);spark(c,x,y,20,col);}
        else if(e.skill==='crazyCrockery'){spark(c,x,y,22*(1-p)+3,col);ring(c,x,y,15+p*20,col);}
        else if(e.skill==='springCleaning'){ring(c,x,e.ty,18+p*45,col);for(let i=-1;i<=1;i++)ray(c,x-25,y+i*10,50,-12,col,3);}
        else if(e.skill==='divineArrow'){for(let i=-1;i<=1;i++){const sx=x+i*24;ray(c,sx-20,y-85+p*45,20,85-p*45,col,3);spark(c,sx,y,9,col);}}
        else if(e.skill==='flamingArrows'){for(let i=-1;i<=1;i++){ray(c,x+i*10,y+15,5,-30*(1-p),col,4);spark(c,x+i*10,y-12,6,col);}}
        else if(e.skill==='lightningArrows'){c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(x-24,y-42);c.lineTo(x+6,y-12);c.lineTo(x-7,y);c.lineTo(x+24,y+30);c.stroke();spark(c,x,y,14,col);}
        else if(e.skill==='gwynethArrow'){spark(c,x,y,12*(1-p)+3,col);}
        else if(e.skill==='dazzle'){for(let i=-1;i<=1;i++){ring(c,x+i*16,y-12-p*22,6,col);spark(c,x+i*16,y-12-p*22,4,col);}}
        else if(e.skill==='avianAssault'){ray(c,e.x,e.y-55,x-e.x,y-e.y+55,col,3);c.beginPath();c.ellipse(x-9,y,14,9,0,0,Math.PI*2);c.strokeStyle=col;c.stroke();ray(c,x+3,y-4,12,3,col,3);spark(c,x,y,12,col);}
        else if(['cripplingBlow','shieldBash'].includes(e.skill)){ring(c,x,e.ty,20+p*tune.vfxRingRadius,col);ray(c,x-30,y+22,60,-18,col,5*(1-p)+1);spark(c,x,y,20,col);}
        else if(['eviscerate','lunge','execution'].includes(e.skill)){
          const reach=tune.vfxSlashLength*(.5+p);c.save();c.translate(x,y);c.rotate(e.skill==='execution'?-.8:e.skill==='lunge'?-.2:.7);ray(c,-reach,reach*.4,reach*2,-reach*.8,col,6*(1-p)+1);ray(c,-reach*.8,-reach*.3,reach*1.6,reach*.6,'#f1fdff',2);if(e.skill==='execution')spark(c,0,0,reach*.6,col);c.restore();
        }else if(e.skill==='focus'){spark(c,x,y,24*(1-p)+6,col);caption(c,'FOCUS · CHÍ MẠNG',x,y-42-p*15,col,1-p);}
        else if(e.skill==='barrage'){ray(c,e.x,e.y-65,x-e.x,y-e.y+65,col,2);spark(c,x,y,14*(1-p)+4,col);}
        else if(e.skill==='purification'){ring(c,x,y,25+p*70,col);for(let i=0;i<5;i++){const a=i*Math.PI*2/5;spark(c,x+Math.cos(a)*50*p,y+Math.sin(a)*50*p,8*(1-p),col);}}
        else if(e.skill==='divineStrike'){ring(c,x,e.ty,20+p*80,col);ray(c,x-35,y+45,70,0,col,5*(1-p)+1);spark(c,x,y+30,20,col);}
        else if(e.skill==='confine'){ray(c,x,y-65,0,120,col,4);ring(c,x,e.ty,35,col);}
        else if(e.skill==='joust'||e.skill==='royalCharge'){
          const reach=tune.vfxSlashLength*(.6+p);c.save();c.translate(x,y);c.rotate(e.skill==='joust'?-.65:.1);ray(c,-reach*e.facing,15,reach*2*e.facing,-30,col,7*(1-p)+1);ray(c,-reach*.7*e.facing,23,reach*1.5*e.facing,-26,'#fffbe1',2);c.restore();
        }else if(e.skill==='divineLight'){
          const h=tune.vfxBeamHeight;c.fillStyle='#ffeab326';c.fillRect(x-18*(1-p),y-h,36*(1-p),h+60);ray(c,x,y-h,0,h+55,col,7*(1-p)+1);spark(c,x,y,20+20*p,col);
        }else if(e.skill==='divineRetribution'){
          for(let i=0;i<8;i++){const a=i*Math.PI/4;ray(c,x+Math.cos(a)*15,y+Math.sin(a)*15,Math.cos(a)*tune.vfxRingRadius*p,Math.sin(a)*tune.vfxRingRadius*p,col,3);}spark(c,x,y,28*(1-p),col);
        }else if(e.skill==='ridicule'){
          c.strokeStyle=col;c.lineWidth=5*(1-p)+1;c.beginPath();c.arc(x,y,25+p*50,-2.7,1.3);c.stroke();spark(c,x,y,13,col);
        }else if(e.skill==='brilliance'){spark(c,x,y,30*(1-p)+8,col);caption(c,'CHÍ MẠNG',x,y-42-p*15,col,1-p);}
      }else if(e.phase==='buff'){
        if(e.skill==='motivation'){ring(c,x,e.ty,30+p*25,col);caption(c,'GIẢM HỒI CHIÊU · THAY ENERGY',x,y-50,col,1-p);}
        else if(e.skill==='afternoonTea'){ray(c,x-14,y,28,0,col,4);ray(c,x,y-14,0,28,col,4);caption(c,'TRÀ HỒI PHỤC',x,y-45,col,1-p);}
        else if(['healthySupplies','damageControl','dazzle','dazzleEnergyAdaptation'].includes(e.skill)){
          if(e.skill==='healthySupplies'){c.strokeStyle=col;c.lineWidth=3;c.strokeRect(x-9,y-5,18,25);ray(c,x-5,y-12,10,0,col,4);spark(c,x,y+7,6,col);caption(c,'BÌNH MÁU',x,y-45,col,1-p);}
          else if(e.skill==='damageControl'){ring(c,x,y,28+p*20,col);caption(c,'GIẢM ĐÒN · CHUYỂN THỂ',x,y-45,col,1-p);}
          else{for(let i=-1;i<=1;i++)ring(c,x+i*16,y-15-p*18,6,col);}
        }
        else if(e.skill==='sacrificialShield'){ring(c,x,e.ty,40+p*20,col);ray(c,e.x,e.y-55,x-e.x,y-e.y+55,col,4);caption(c,'CỨU HÀNG SAU',x,y-65,col,1-p);}
        else if(e.skill==='standfast'){ray(c,x-15,y,30,0,col,5);ray(c,x,y-15,0,30,col,5);caption(c,'STANDFAST',x,y-55,col,1-p);}
        else if(['heavensProtection','blessedShield'].includes(e.skill)){c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.ellipse(x,y+15,40+p*9,59,0,Math.PI,Math.PI*2);c.stroke();spark(c,x,y-32,9,col);}
        else if(e.skill==='divineBlessing'){ray(c,x,y-55,0,100,col,6*(1-p));spark(c,x,y,18,col);}
        else if(['cripple','lockOn'].includes(e.skill)){ring(c,x,y,23+p*8,col);ray(c,x-35,y,18,0,col);ray(c,x+17,y,18,0,col);ray(c,x,y-35,0,18,col);ray(c,x,y+17,0,18,col);}
        else if(e.skill==='abate'||e.skill==='barrageSlow'){for(let i=0;i<3;i++)ray(c,x-15+i*15,y-20,0,35,col,3);}
        else if(e.skill==='confine'){ring(c,x,e.ty,35+p*10,col);}
        else if(e.skill==='inspire'){
          ray(c,x-19,y+45,0,-85,col,3);c.fillStyle='#edbd6ecc';c.beginPath();c.moveTo(x-18,y-40);c.lineTo(x+20,y-32+Math.sin(p*8)*5);c.lineTo(x-18,y-10);c.fill();
        }else if(e.skill==='blessing'){
          ring(c,x,y-25,25+12*p,col);for(let i=0;i<3;i++)spark(c,x+(i-1)*22,y-25-Math.sin(p*Math.PI)*30,6,col);ray(c,e.x,e.y-65,x-e.x,y-e.y+65,'#fff0a366',2);
        }else {ray(c,x-8,y-22,8,25,col,3);ray(c,x+8,y-22,-8,25,col,3);}
      }else if(e.phase==='release'&&e.skill==='royalCharge')ray(c,e.x-e.facing*60,e.y-50,e.facing*110,0,col,6*(1-p));
      c.restore();
    }c.restore();
  }
  return{cast,release,hit,buff,critical,tick,ground,foreground,projectile,pose};
}
root.createSkillPresentation=createSkillPresentation;
if(typeof module!=='undefined')module.exports={createSkillPresentation};
})(typeof window!=='undefined'?window:globalThis);
