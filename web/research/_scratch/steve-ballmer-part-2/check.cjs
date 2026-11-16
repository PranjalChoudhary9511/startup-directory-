const f=JSON.parse(require('fs').readFileSync(process.argv[2],'utf8'));
const n=f.sources.length;let bad=0,qm=0,long=[];const out=new Set(["failed","shut","sold","merged","pivoted","running","public"]);
const chk=(c,w)=>{if(!Array.isArray(c)||!c.length){console.log('nosrc',w);bad++}else for(const i of c)if(i<0||i>=n){console.log('badidx',w);bad++}};
for(const ch of f.chapters)for(const b of ch.blocks){
 if(['p','example','quote','venture'].includes(b.t))chk(b.src,b.text||b.name);
 if(b.t==='facts')b.items.forEach(i=>chk(i.src,i.label));
 if(b.t==='timeline')b.items.forEach(i=>chk(i.src,i.text));
 if(b.t==='venture'&&!out.has(b.outcome)){console.log('badoutcome',b.name);bad++}
 const all=JSON.stringify(b);const m=(all.match(/\\"/g)||[]).length;if(m){qm+=m;console.log('dq',all.slice(0,90))}
 if(b.t==='p'){const s=b.text.replace(/\$\d+\.\d+/g,'x').split(/(?<=[.!?])\s+/).length;if(s>5||s<2)long.push(s+': '+b.text.slice(0,60))}
}
console.log({bad,qm,sources:n,long});
const seen=new Set();for(const c of f.chapters){if(seen.has(c.id))console.log('dup');seen.add(c.id)}
