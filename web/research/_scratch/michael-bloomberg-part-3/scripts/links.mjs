const [,,url,...pats]=process.argv;
const r=await fetch(url,{headers:{'user-agent':'Mozilla/5.0 (research; read-only)'}});const h=await r.text();
const seen=new Set();
for(const m of h.matchAll(/<a[^>]+href="(https?:[^"]+|\/[^"]+)"[^>]*>([\s\S]{0,300}?)<\/a>/g)){
 const t=m[2].replace(/<[^>]+>/g,'').trim(); const s=m[1]+' | '+t;
 if(seen.has(m[1]))continue; if(pats.some(p=>new RegExp(p,'i').test(s))){seen.add(m[1]);console.log(s.slice(0,240));}
}
