const fs=require('fs');const b=fs.readFileSync('20f.htm.txt','utf8').replace(/&#8209;/g,'-').replace(/&#8217;/g,"'").replace(/&#\d+;/g,' ');
let i=b.indexOf('The principal executive offices of major businesses');console.log(b.slice(i,i+800));
const j=fs.readFileSync('jmf.html','utf8');const t=j.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');console.log(t.slice(0,900));console.log([...j.matchAll(/href="([^"#]+)"/g)].map(x=>x[1]).filter(x=>!/\.css|\.ico|\.png/.test(x)).slice(0,50).join('\n'));
