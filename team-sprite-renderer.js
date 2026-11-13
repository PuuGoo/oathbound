// PROTOTYPE - NOT FOR PRODUCTION
(function(root){
'use strict';
/** Load only embedded/local derived images; no network service or external library. */
function createTeamSprites({tune,onLoad,onError,lazy=false}){
 const sheets={};for(const [kind,data]of Object.entries({...root.TEAM_SPRITES,...root.EXPANDED_SPRITES}))sheets[kind]={image:null,ready:false,requested:false,data};
 /** Request each local atlas at most once; clip metadata never triggers decoding. */
 function request(kind){const sheet=sheets[kind];if(!sheet||sheet.requested)return;sheet.requested=true;const image=new Image();sheet.image=image;image.onload=()=>{sheet.ready=true;onLoad();};image.onerror=()=>onError(sheet.data.name);image.src=sheet.data.data||sheet.data.src;}
 if(!lazy)for(const kind of Object.keys(sheets))request(kind);
 /** Resolve inferred clips, with explicit reuse where the supplied atlas has fewer skill rows. */
 function clip(kind,name){const d=sheets[kind]?.data;if(!d)return null;const aliases={skill:'skillAura',skillAura:'skill',skillShield:'skill2',skillArc:'skill3'};const c=d.clips[name]||d.clips[aliases[name]]||d.clips.skill1||d.clips.skill||d.clips.attack;return{...c,height:d.metadata?.cell||tune.teamFrameWidth,anchorY:d.metadata?.groundY||tune.teamAnchorY,fps:name==='idle'?tune.teamIdleFPS:name==='run'?tune.teamRunFPS:name==='death'?tune.teamDeathFPS:tune.teamActionFPS};}
 /** Draw one fixed-ground frame; idle/run loop, death and action clips clamp. */
 function draw(ctx,kind,x,y,scale,flip,name,time,evolved=false){const sheet=sheets[kind];if(!sheet)return false;request(kind);if(!sheet.ready)return false;const c=clip(kind,name),raw=Math.floor(Math.max(0,time)*c.fps+1e-7),frame=['idle','run'].includes(name)?raw%c.count:Math.min(c.count-1,raw),fw=tune.teamFrameWidth;ctx.save();ctx.translate(x,y);ctx.scale(flip?-scale:scale,scale);ctx.fillStyle='#0004';ctx.beginPath();ctx.ellipse(0,3,28,6,0,0,Math.PI*2);ctx.fill();if(evolved&&name!=='death'){ctx.strokeStyle='#efd187';ctx.beginPath();ctx.ellipse(0,0,35,9,0,0,Math.PI*2);ctx.stroke();}ctx.drawImage(sheet.image,frame*fw,c.y,fw,fw,-tune.teamAnchorX,-c.anchorY,fw,fw);ctx.restore();return true;}
 return{clip,draw};
}
root.createTeamSprites=createTeamSprites;
if(typeof module!=='undefined')module.exports={createTeamSprites};
})(typeof window!=='undefined'?window:globalThis);
