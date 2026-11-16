// node h.mjs idx width regex : first match only, compact
import fs from "node:fs";import path from "node:path";
const a=process.argv.slice(2);const dl=path.join(import.meta.dirname,"dl");
for(let k=0;k<a.length;k+=3){const[i,w,r]=[a[k],+a[k+1],a[k+2]];
 const list=i==="all"?fs.readdirSync(dl).filter(f=>f.endsWith(".txt")).map(f=>f.replace(".txt","")):i.split(",");let any=false;
 for(const id of list){const f=path.join(dl,id+".txt");if(!fs.existsSync(f))continue;const t=fs.readFileSync(f,"utf8");const m=new RegExp(r,"i").exec(t);
  if(m){any=true;console.log(`[${id}] ${r.slice(0,24)}: …${t.slice(Math.max(0,m.index-w),m.index+m[0].length+w)}…`);if(i==="all")break}}
 if(!any)console.log(`[${i}] ${r.slice(0,40)}: NO MATCH`)}
