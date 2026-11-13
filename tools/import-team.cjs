// PROTOTYPE - NOT FOR PRODUCTION
// Local atlas import. Originals stay read-only. Measured rows are inferred, not author metadata.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {decodePNG,encodePNG}=require('./import-belinda.cjs');
const row=(name,y,end,ground,centers,bounds)=>({name,y,end,ground,centers,bounds:bounds||centers.map((x,i)=>[i?Math.floor((centers[i-1]+x)/2):0,i<centers.length-1?Math.floor((x+centers[i+1])/2):1536])});
const SPECS={
 raine:{folder:'3.Raine',file:'preview_atlas_white_bg_3.Raine.png',kind:'ranger',size:[1580,852],rows:[
  row('idle',0,177,166,[97,241,384,527,671,812,954,1096,1235,1376,1513],Array.from({length:11},(_,i)=>[Math.round(i*1580/11),Math.round((i+1)*1580/11)])),
  row('attack',177,326,315,[90,242,405,568,733,907,1112,1292,1457],[[0,177],[177,348],[348,514],[514,680],[680,874],[874,1065],[1065,1245],[1245,1401],[1401,1580]]),
  row('hit',326,460,450,[92,240,399,580,729,886,1030,1198,1336,1475],[[0,170],[170,334],[334,502],[502,657],[657,806],[806,958],[958,1122],[1122,1280],[1280,1414],[1414,1580]]),
  row('death',460,593,576,[88,229,365,525,684,861,1054,1256,1460],[[0,162],[162,301],[301,453],[453,611],[611,781],[781,966],[966,1161],[1161,1371],[1371,1580]]),
  row('skill',593,733,726,[90,222,353,482,611,741,877],[[0,161],[161,298],[298,427],[427,559],[559,693],[693,829],[829,972]]),
  row('skillArc',733,852,825,[91,253,420,590,758],[[0,178],[178,347],[347,510],[510,680],[680,925]])
 ]},
 fawkes:{folder:'4.Fawkes',file:'preview_atlas_white_bg4Fawkes.png',kind:'healer',size:[1536,1024],rows:[
  row('idle',0,136,124,[112,260,425,588,757,924,1096,1258],[[30,193],[193,354],[354,520],[520,686],[686,855],[855,1025],[1025,1190],[1190,1352]]),
  row('run',136,265,250,[151,306,465,617,771,919,1050,1179,1299],[[75,224],[224,382],[382,538],[538,693],[693,846],[846,982],[982,1118],[1118,1240],[1240,1390]]),
  row('attack',265,394,382,[94,257,425,590,797,1004,1194,1375],[[0,179],[179,341],[341,503],[503,736],[736,950],[950,1110],[1110,1303],[1303,1536]]),
  row('hit',394,519,506,[125,288,449,626,807,981,1153,1327]),
  row('death',519,646,631,[117,295,472,664,831,1015],[[24,200],[200,383],[383,571],[571,747],[747,921],[921,1111]]),
  row('skillShield',646,779,759,[108,256,400,538,680,820,981],[[0,183],[183,327],[327,469],[469,610],[610,751],[751,905],[905,1045]]),
  row('skillAura',779,905,886,[124,291,457,621,788,985],[[0,212],[212,379],[379,544],[544,710],[710,914],[914,1055]]),
  row('skillArc',905,1024,1011,[117,285,450,615,798],[[0,205],[205,369],[369,534],[534,711],[711,929]])
 ]},
 lucius:{folder:'5.Lucius',file:'preview_atlas_white_bgLucius.png',kind:'warden',size:[1536,1024],rows:[
  row('idle',0,130,115,[104,282,454,611,760,907,1061,1220,1398]),
  row('run',130,251,241,[88,264,435,605,783,956,1124,1294,1452]),
  row('attack',251,392,379,[93,247,400,554,705,882,1064,1247,1438],[[0,171],[171,325],[325,481],[481,644],[644,822],[822,1007],[1007,1184],[1184,1374],[1374,1536]]),
  row('hit',392,517,489,[109,259,411,565],[[0,186],[186,339],[339,489],[489,649]]),
  row('death',517,635,615,[111,263,408,555,730,909,1114,1325]),
  row('skillShield',635,751,730,[94,244,394,549,724,904,1124,1390],[[0,166],[166,319],[319,465],[465,643],[643,821],[821,1040],[1040,1285],[1285,1536]]),
  row('skillAura',751,882,866,[92,244,396,553,710,864,1021],[[0,169],[169,319],[319,473],[473,630],[630,788],[788,945],[945,1100]])
 ]}
};
/** Remove only connected neutral-white canvas; preserve bright enclosed armor/magic. */
function removeBackground(image){const {w,h,rgba}=image,seen=new Uint8Array(w*h),q=new Int32Array(w*h);let n=0,at=0;const push=i=>{if(seen[i])return;const p=i*4,r=rgba[p],g=rgba[p+1],b=rgba[p+2];if(Math.min(r,g,b)<225||Math.max(r,g,b)-Math.min(r,g,b)>24)return;seen[i]=1;q[n++]=i;};for(let x=0;x<w;x++){push(x);push((h-1)*w+x);}for(let y=0;y<h;y++){push(y*w);push(y*w+w-1);}while(at<n){const i=q[at++],x=i%w,y=Math.floor(i/w);if(x)push(i-1);if(x<w-1)push(i+1);if(y)push(i-w);if(y<h-1)push(i+w);}for(let i=0;i<seen.length;i++)if(seen[i])rgba[i*4+3]=0;return n;}
/** Pack nonuniform crops with body-based horizontal anchors and fixed ground. */
function pack(image,spec){
 const {w,rgba}=image,fw=256,cols=12,out=Buffer.alloc(fw*cols*fw*spec.rows.length*4),clips={};
 for(let ri=0;ri<spec.rows.length;ri++){
  const r=spec.rows[ri];clips[r.name]={y:ri*fw,count:r.centers.length};
  for(let fi=0;fi<r.centers.length;fi++){
   const [left,right]=r.bounds[fi],cw=right-left,ch=r.end-r.y,seen=new Uint8Array(cw*ch),components=[];
   for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){
    const start=y*cw+x;if(seen[start]||!rgba[((r.y+y)*w+left+x)*4+3])continue;
    const pixels=[start];seen[start]=1;let edge=false;
    for(let k=0;k<pixels.length;k++){
     const i=pixels[k],sx=i%cw,sy=Math.floor(i/cw);if(sx===0||sx===cw-1)edge=true;
     for(const next of [i-1,i+1,i-cw,i+cw]){if(next<0||next>=seen.length||seen[next]||Math.abs(next%cw-sx)>1)continue;const px=left+next%cw,py=r.y+Math.floor(next/cw);if(!rgba[(py*w+px)*4+3])continue;seen[next]=1;pixels.push(next);}
    }components.push({pixels,edge});
   }
   const largest=Math.max(0,...components.map(c=>c.pixels.length));
   for(const c of components){if(c.edge&&c.pixels.length<largest)continue;for(const i of c.pixels){const x=left+i%cw,y=r.y+Math.floor(i/cw),dx=128+x-r.centers[fi],dy=220+y-r.ground;if(dx<0||dx>=fw||dy<0||dy>=fw)continue;const p=(y*w+x)*4,d=((ri*fw+dy)*(fw*cols)+fi*fw+dx)*4;rgba.copy(out,d,p,p+4);}}
  }
 }return{png:encodePNG(fw*cols,fw*spec.rows.length,out),clips,width:fw*cols,height:fw*spec.rows.length};
}
/** Import supplied sheets into only the local prototype's derived outputs. */
function run(base,outDir){const manifest={};for(const [name,spec]of Object.entries(SPECS)){const source=path.join(base,spec.folder,spec.file),bytes=fs.readFileSync(source),image=decodePNG(bytes);if(image.w!==spec.size[0]||image.h!==spec.size[1])throw Error('Unexpected dimensions '+name);const removed=removeBackground(image),result=pack(image,spec),file=name+'-atlas.png';fs.writeFileSync(path.join(outDir,'assets',file),result.png);manifest[spec.kind]={name,src:'assets/'+file,data:'data:image/png;base64,'+result.png.toString('base64'),clips:result.clips};console.log(name+'\tsource_sha256\t'+crypto.createHash('sha256').update(bytes).digest('hex')+'\tremoved\t'+removed+'\tderived\t'+result.width+'x'+result.height+'\tbytes\t'+result.png.length);}
fs.writeFileSync(path.join(outDir,'team-sprites.js'),'// PROTOTYPE - NOT FOR PRODUCTION\n// Derived local user-supplied atlases. Rights UNKNOWN; not for publication.\nwindow.TEAM_SPRITES='+JSON.stringify(manifest)+';\n');return manifest;}
if(require.main===module)run(...process.argv.slice(2));module.exports={SPECS,removeBackground,pack,run};
