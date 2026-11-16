const fs=require('fs'),path=require('path');
const [,, inDir,outDir]=process.argv;
for(const f of fs.readdirSync(inDir)){ if(!f.endsWith('.html'))continue;
 let b=fs.readFileSync(path.join(inDir,f)); let s=b.toString('utf8');
 const m=s.slice(0,3000).match(/charset=["']?([\w-]+)/i);
 if(m&&/gb/i.test(m[1])){ s=new TextDecoder('gbk').decode(b); }
 s=s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<(br|\/p|\/div|\/h\d|\/li)[^>]*>/gi,'\n').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&[lr]dquo;/g,'"').replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n');
 fs.writeFileSync(path.join(outDir,f.replace('.html','.txt')),s);
 console.log(f,s.length);
}
