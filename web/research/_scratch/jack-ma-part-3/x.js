const fs=require('fs');
for(const f of process.argv.slice(2)){
const t=fs.readFileSync(f,'utf8');
const refs=t.match(/<ref[^>]*>[\s\S]*?<\/ref>/g)||[];
for(const r of refs){
 const u=(r.match(/url\s*=\s*(https?:[^\s|}]+)/)||r.match(/(https?:[^\s|}\]]+)/)||[])[1];
 const ti=(r.match(/title\s*=\s*([^|}]+)/)||[])[1];
 const d=(r.match(/\|\s*date\s*=\s*([^|}]+)/)||[])[1];
 if(u&&!/web\.archive|wikipedia/.test(u))console.log((d||'').trim().slice(0,12),'|',(ti||'').trim().slice(0,80),'|',u);
}}
