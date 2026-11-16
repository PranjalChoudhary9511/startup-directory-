import fs from "node:fs";import path from "node:path";import {execFileSync} from "node:child_process";
const dir=process.argv[2];const tx=path.join(dir,"..","txt");fs.mkdirSync(tx,{recursive:true});
const ent=s=>s.replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;|&apos;|&rsquo;|&lsquo;/g,"'").replace(/&ldquo;|&rdquo;/g,'"').replace(/&ndash;|&mdash;/g,"-").replace(/&#x27;/g,"'").replace(/&#(\d+);/g,(m,n)=>String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi,(m,n)=>String.fromCodePoint(parseInt(n,16)));
const lens=[];
for(const f of fs.readdirSync(dir)){ if(f.startsWith("_"))continue;const k=f.split(".")[0];const p=path.join(dir,f);let t="";
 if(f.endsWith(".pdf")){try{execFileSync("pdftotext",["-layout",p,path.join(tx,k+".txt")],{stdio:"ignore"});t=fs.readFileSync(path.join(tx,k+".txt"),"utf8");}catch(e){t="";}}
 else{let h=fs.readFileSync(p,"utf8");
  if(h.startsWith("%PDF")){fs.renameSync(p,p+".pdf");try{execFileSync("pdftotext",["-layout",p+".pdf",path.join(tx,k+".txt")],{stdio:"ignore"});t=fs.readFileSync(path.join(tx,k+".txt"),"utf8");}catch(e){}}
  else{
  // keep JSON-LD articleBody separately since some sites render by script
  const ld=[...h.matchAll(/"articleBody"\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map(m=>{try{return JSON.parse('"'+m[1]+'"')}catch(e){return m[1]}}).join("\n");
  h=h.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<noscript[\s\S]*?<\/noscript>/gi," ");
  t=ent(h.replace(/<[^>]+>/g," ")).replace(/[ \t]+/g," ")+"\n"+ent(ld);fs.writeFileSync(path.join(tx,k+".txt"),t);}
 }
 lens.push([+k,t.length]);}
lens.sort((a,b)=>a[0]-b[0]);
console.log("thin (<2500 chars):",lens.filter(x=>x[1]<2500).map(x=>x.join(":")).join(" "));
