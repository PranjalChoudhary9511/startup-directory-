const fs=require('fs');const b=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const norm=t=>t.replace(/<[^>]+>/g,' ').replace(/&#8217;|&rsquo;|[’‘]/g,"'").replace(/&#8220;|&#8221;|[“”]/g,'"').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').toLowerCase();
const corpus=['moment.html','tr.html','eng100.html'].map(f=>norm(fs.readFileSync(f,'utf8'))).join(' ');
const miss=[];
for(const c of b.chapters)for(const x of c.blocks){
 const items=[];if(x.t==='quote')items.push(x.text);
 if(x.text&&x.t!=='quote')for(const m of x.text.matchAll(/“([^”]+)”/g))items.push(m[1]);
 for(const q of items){let n=norm(q).replace(/[.,!?]+$/,'').trim();if(!corpus.includes(n))miss.push(c.id+': '+q)}
}
console.log(miss.join('\n'));
