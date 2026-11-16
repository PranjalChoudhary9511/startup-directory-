import fs from 'node:fs';const f=process.argv[2];const h=fs.readFileSync(f,'utf8');
const t=h.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&#8217;|&rsquo;|&#x27;|&#39;/g,"'").replace(/\s+/g,' ');fs.writeFileSync(f.replace('.html','.txt'),t);console.log(f,t.length);
