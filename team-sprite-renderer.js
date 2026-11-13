// PROTOTYPE - NOT FOR PRODUCTION
(function(root){
'use strict';
/** Load only embedded/local derived images; no network service or external library. */
function createTeamSprites({tune,onLoad,onError}){
 const sheets={};for(const [kind,data]of Object.entries({...root.TEAM_SPRITES,...root.EXPANDED_SPRITES})){const image=new Image();sheets[kind]={image,ready:false,data};image.onload=()=>{sheets[kind].ready=true;onLoad();};image.onerror=()=>onError(data.name);image.src=data.data||data.src;}
 /** Resolve inferred clips, with explicit reuse where the supplied atlas has fewer skill rows. */
 function clip(kind,name){const d=sheets[kind]?.data;if(!d)return null;const aliases={skill:'skillAura',skillAura:'skill',skillShield:'skill2',skillArc:'skill3'};const c=d.clips[name]||d.clips[aliases[name]]||d.clips.skill1||d.clips.skill||d.clips.attack;return{...c,height:d.metadata?.cell||tune.teamFrameWidth,anchorY:d.metadata?.groundY||tune.teamAnchorY,fps:name==='idle'?tune.teamIdleFPS:name==='run'?tune.teamRunFPS:name==='death'?tune.teamDeathFPS:tune.teamActionFPS};}
 /** Draw one fixed-ground frame; idle/run loop, death and action clips clamp. */
 function draw(ctx,kind,x,y,scale,flip,name,time,evolved=false){const sheet=sheets[kind];if(!sheet?.ready)return false;const c=clip(kind,name),raw=Math.floor(Math.max(0,time)*c.fps+1e-7),frame=['idle','run'].includes(name)?raw%c.count:Math.min(c.count-1,raw),fw=tune.teamFrameWidth;ctx.save();ctx.translate(x,y);ctx.scale(flip?-scale:scale,scale);ctx.fillStyle='#0004';ctx.beginPath();ctx.ellipse(0,3,28,6,0,0,Math.PI*2);ctx.fill();if(evolved&&name!=='death'){ctx.strokeStyle='#efd187';ctx.beginPath();ctx.ellipse(0,0,35,9,0,0,Math.PI*2);ctx.stroke();}ctx.drawImage(sheet.image,frame*fw,c.y,fw,fw,-tune.teamAnchorX,-c.anchorY,fw,fw);ctx.restore();return true;}
 return{clip,draw};
}
root.createTeamSprites=createTeamSprites;
if(typeof module!=='undefined')module.exports={createTeamSprites};
})(typeof window!=='undefined'?window:globalThis);
