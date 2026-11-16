import fs from "node:fs";import path from "node:path";
const dir=process.argv[3];fs.mkdirSync(dir,{recursive:true});
const b=JSON.parse(fs.readFileSync(process.argv[2],"utf8"));
const out=[];let i=0;
async function one(k){const s=b.sources[k];const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),30000);
 try{const r=await fetch(s.url,{redirect:"follow",signal:ctl.signal,headers:{"user-agent":"firstrupee-books-check/1.0 (education)","accept":"text/html,application/pdf,*/*"}});
  const ct=r.headers.get("content-type")||"";const buf=Buffer.from(await r.arrayBuffer());
  const ext=/pdf/.test(ct)||/\.pdf(\?|$)/i.test(s.url)?"pdf":"html";
  if(r.ok)fs.writeFileSync(path.join(dir,k+"."+ext),buf);
  out[k]={k,status:r.status,ext,len:buf.length,url:s.url};
 }catch(e){out[k]={k,status:"ERR "+(e.code||e.name),url:s.url};}
 clearTimeout(t);}
async function worker(){while(i<b.sources.length){const k=i++;await one(k);}}
await Promise.all(Array.from({length:10},worker));
fs.writeFileSync(path.join(dir,"_status.json"),JSON.stringify(out,null,0));
const bad=out.filter(o=>o.status!==200);console.log("ok",out.length-bad.length,"bad",bad.length);
for(const o of bad)console.log(o.k,o.status,o.url.slice(0,90));
for(const o of out.filter(o=>o.status===200&&o.len<8000))console.log("small",o.k,o.len,o.url.slice(0,90));
