// PROTOTYPE - NOT FOR PRODUCTION
// Offline RGB/RGBA PNG import. Source is read-only; only edge-connected near-white is removed.
const fs=require('node:fs'),zlib=require('node:zlib'),crypto=require('node:crypto');
function decodePNG(b){
  const w=b.readUInt32BE(16),h=b.readUInt32BE(20),channels=b[25]===2?3:b[25]===6?4:0;
  if(b[24]!==8||!channels||b[28]!==0)throw Error('Only non-interlaced RGB/RGBA8 PNG supported');
  const chunks=[];for(let p=8;p<b.length;){const n=b.readUInt32BE(p),type=b.toString('ascii',p+4,p+8);if(type==='IDAT')chunks.push(b.subarray(p+8,p+8+n));p+=n+12;}
  const raw=zlib.inflateSync(Buffer.concat(chunks)),stride=w*channels,out=Buffer.alloc(h*stride);
  const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
  for(let y=0;y<h;y++){const filter=raw[y*(stride+1)];if(filter>4)throw Error('Invalid PNG filter');for(let x=0;x<stride;x++){const i=y*stride+x,a=x>=channels?out[i-channels]:0,b=y?out[i-stride]:0,c=y&&x>=channels?out[i-stride-channels]:0;out[i]=(raw[y*(stride+1)+1+x]+[0,a,b,Math.floor((a+b)/2),paeth(a,b,c)][filter])&255;}}
  const rgba=Buffer.alloc(w*h*4);for(let i=0;i<w*h;i++){out.copy(rgba,i*4,i*channels,i*channels+3);rgba[i*4+3]=channels===4?out[i*channels+3]:255;}return{w,h,rgba};
}
function crc32(b){let c=0xffffffff;for(const v of b){c^=v;for(let j=0;j<8;j++)c=(c>>>1)^((c&1)?0xedb88320:0);}return(c^0xffffffff)>>>0;}
function encodePNG(w,h,rgba){const chunk=(name,data)=>{const type=Buffer.from(name),n=Buffer.alloc(4),crc=Buffer.alloc(4);n.writeUInt32BE(data.length);crc.writeUInt32BE(crc32(Buffer.concat([type,data])));return Buffer.concat([n,type,data,crc]);};const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(w);ihdr.writeUInt32BE(h,4);ihdr[8]=8;ihdr[9]=6;const raw=Buffer.alloc((w*4+1)*h);for(let y=0;y<h;y++)rgba.copy(raw,y*(w*4+1)+1,y*w*4,(y+1)*w*4);return Buffer.concat([Buffer.from('89504e470d0a1a0a','hex'),chunk('IHDR',ihdr),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);}
// Row layout inferred from supplied image, not an official authored animation manifest.
const rows=[
  {name:'idle',y:0,end:177,count:7,ground:160,bounds:[[17,135],[159,285],[311,436],[461,586],[615,737],[767,889],[918,1040]]},
  {name:'attack',y:177,end:353,count:7,ground:338,bounds:[[5,122],[142,275],[284,422],[422,573],[567,717],[692,929],[921,1034]]},
  {name:'hit',y:353,end:531,count:7,ground:511,bounds:[[12,129],[154,284],[307,442],[461,590],[611,754],[760,913],[919,1035]]},
  {name:'death',y:531,end:708,count:8,ground:698,bounds:[[10,122],[136,252],[251,371],[365,514],[498,663],[631,794],[784,933],[922,1076]]},
  {name:'skill',y:708,end:888,count:8,ground:879,bounds:[[10,120],[117,237],[242,371],[380,507],[510,660],[660,808],[814,958],[963,1077]]},
  {name:'skillShield',y:888,end:1052,count:8,ground:1041,bounds:[[10,122],[137,258],[264,393],[399,537],[522,655],[653,802],[798,970],[969,1073]]},
  {name:'skillAura',y:1052,end:1230,count:8,ground:1219,bounds:[[14,127],[136,252],[260,381],[386,508],[510,650],[650,805],[805,937],[945,1064]]},
  {name:'skillArc',y:1230,end:1448,count:8,ground:1420,bounds:[[12,119],[134,252],[263,378],[390,525],[525,692],[675,815],[818,958],[973,1074]]}
];
function importAtlas(source,destination,dataPath){const bytes=fs.readFileSync(source),image=decodePNG(bytes),{w,h,rgba}=image;if(w!==1086||h!==1448)throw Error('Unexpected source size');
  const bg=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;
  const push=i=>{if(bg[i])return;const p=i*4,r=rgba[p],g=rgba[p+1],b=rgba[p+2];if(Math.min(r,g,b)<225||Math.max(r,g,b)-Math.min(r,g,b)>24)return;bg[i]=1;queue[tail++]=i;};
  for(let x=0;x<w;x++){push(x);push((h-1)*w+x);}for(let y=0;y<h;y++){push(y*w);push(y*w+w-1);}
  while(head<tail){const i=queue[head++],x=i%w,y=Math.floor(i/w);if(x)push(i-1);if(x<w-1)push(i+1);if(y)push(i-w);if(y<h-1)push(i+w);}
  for(let i=0;i<bg.length;i++)if(bg[i])rgba[i*4+3]=0;
  // Nonuniform per-frame crops, roomy cells and fixed ground. Remove detached crop-edge fragments.
  const fw=256,fh=256,out=Buffer.alloc(fw*8*fh*8*4);
  for(let row=0;row<rows.length;row++){const r=rows[row];for(let frame=0;frame<r.count;frame++){
    const [left,right]=r.bounds[frame],cw=right-left,ch=r.end-r.y,offset=Math.floor((fw-cw)/2),top=220-(r.ground-r.y),seen=new Uint8Array(cw*ch),components=[];
    for(let sy=0;sy<ch;sy++)for(let sx=0;sx<cw;sx++){const start=sy*cw+sx;if(seen[start]||!rgba[((sy+r.y)*w+sx+left)*4+3])continue;const pixels=[start];seen[start]=1;let touches=0;
      for(let n=0;n<pixels.length;n++){const i=pixels[n],x=i%cw,y=Math.floor(i/cw);if(x===0||x===cw-1)touches++;for(const next of [i-1,i+1,i-cw,i+cw]){if(next<0||next>=seen.length||seen[next]||Math.abs(next%cw-x)>1)continue;const p=((Math.floor(next/cw)+r.y)*w+next%cw+left)*4;if(!rgba[p+3])continue;seen[next]=1;pixels.push(next);}}
      components.push({pixels,touches});
    }
    const largest=Math.max(...components.map(c=>c.pixels.length));
    for(const c of components){if(c.touches&&c.pixels.length!==largest)continue;for(const i of c.pixels){const x=i%cw,y=Math.floor(i/cw),dy=top+y;if(dy<0||dy>=fh)throw Error('Frame exceeds cell');const dst=((row*fh+dy)*(fw*8)+frame*fw+offset+x)*4,p=((y+r.y)*w+x+left)*4;rgba.copy(out,dst,p,p+4);}}
  }}
  const png=encodePNG(fw*8,fh*8,out);fs.writeFileSync(destination,png);fs.writeFileSync(dataPath,'// PROTOTYPE - NOT FOR PRODUCTION\n// Derived local sprite; public distribution rights unverified.\nwindow.BELINDA_SPRITE_DATA="data:image/png;base64,'+png.toString('base64')+'";\n');
  console.log('source_sha256\t'+crypto.createHash('sha256').update(bytes).digest('hex'));console.log('derived\t2048x2048\t'+png.length+'bytes');console.log('removed_edge_connected_background_pixels\t'+tail);for(const r of rows)console.log('row\t'+r.name+'\t'+r.y+'-'+r.end+'\t'+r.count+'frames');return png;
}
if(require.main===module){if(process.argv.length!==5)throw Error('Usage: node import-belinda.cjs source.png destination.png data.js');importAtlas(...process.argv.slice(2));}
module.exports={decodePNG,encodePNG,importAtlas,rows};
