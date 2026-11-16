import fs from "node:fs";import path from "node:path";
const b=JSON.parse(fs.readFileSync(process.argv[2],"utf8"));const tx=process.argv[3];
const cache={};const T=k=>{if(k in cache)return cache[k];const p=path.join(tx,k+".txt");cache[k]=fs.existsSync(p)?norm(fs.readFileSync(p,"utf8")):null;return cache[k];};
function norm(s){return s.toLowerCase().replace(/[‘’‛`]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,"-").replace(/\s+/g," ");}
const strip=s=>norm(s).replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const cacheS={};const TS=k=>{if(k in cacheS)return cacheS[k];const t=T(k);cacheS[k]=t==null?null:strip(t);return cacheS[k];};
const cacheD={};const TD=k=>{if(k in cacheD)return cacheD[k];const t=T(k);cacheD[k]=t==null?null:t.replace(/(\d),(?=\d)/g,"$1");return cacheD[k];};
const items=[];
const add=(where,text,src)=>items.push({where,text,src});
add("hook",b.hook,b.hookSrc);
b.glance.forEach((g,i)=>add("gl"+i,g.value,g.src));
b.chapters.forEach((c,ci)=>c.blocks.forEach((x,i)=>{const w=ci+"."+i;
 if(x.t=="p"||x.t=="example")add(w,x.text,x.src);
 else if(x.t=="quote")add(w+"Q",'"'+x.text+'"',x.src);
 else if(x.t=="facts"||x.t=="timeline")x.items.forEach((y,j)=>add(w+"#"+j,(y.value||y.when)+" | "+(y.label||y.text),y.src));
 else if(x.t=="venture")add(w+"V",[x.years,x.idea,x.decision,x.howStarted,x.funding,x.whatHappened].join(" "),x.src);
}));
let rep=[];let noText=new Set();let qmiss=[],nmiss=[];
for(const it of items){const src=it.src||[];const avail=src.filter(k=>T(k)!=null);src.filter(k=>T(k)==null).forEach(k=>noText.add(k));
 const clean=it.text.replace(/\*\*|__|==/g,"");
 // quotes
 const qs=[...clean.matchAll(/[\"“]([^\"“”]{6,}?)[\"”]/g)].map(m=>m[1]);
 for(const q of qs){const s=strip(q);if(s.split(" ").length<2)continue;const ok=avail.some(k=>TS(k).includes(s));
  if(!ok)qmiss.push(`${it.where} [${src}] avail[${avail}] QUOTE: ${q}`);}
 // numbers
 const nums=[...clean.matchAll(/\d[\d,]*(?:\.\d+)?/g)].map(m=>m[0].replace(/,/g,"")).filter(n=>n.length>=2||/\./.test(n));
 const uniq=[...new Set(nums)];
 const miss=uniq.filter(n=>!avail.some(k=>TD(k).includes(n)));
 if(miss.length&&avail.length)nmiss.push(`${it.where} [${src}] avail[${avail}] NUM: ${miss.join(" ")}`);
 if(!avail.length&&src.length)nmiss.push(`${it.where} [${src}] NOTEXT`);
}
fs.writeFileSync(process.argv[4],"QUOTES NOT FOUND ("+qmiss.length+")\n"+qmiss.join("\n")+"\n\nNUMS NOT FOUND ("+nmiss.length+")\n"+nmiss.join("\n")+"\n\nNOTEXT sources: "+[...noText].sort((a,b)=>a-b).join(",")+"\n");
console.log(qmiss.length,nmiss.length,noText.size);
