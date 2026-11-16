// usage: node g.cjs idx 'regex' [ctx]  (pairs separated by newlines from stdin)
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').split('\n').filter(Boolean);
for(const l of lines){const m=l.match(/^(\d+)\s+(.*)$/);if(!m)continue;const i=m[1];let t='';try{t=fs.readFileSync(`pages/${i}.txt`,'utf8')}catch{}
 const re=new RegExp(m[2],'gi');let c=0,r;const out=[];while((r=re.exec(t))&&c<1){c++;out.push(t.slice(Math.max(0,r.index-170),r.index+r[0].length+190));if(re.lastIndex===r.index)re.lastIndex++}
 console.log(`--[${i}] /${m[2]}/ ${c?'':'NO MATCH'}`);out.forEach(o=>console.log('  > '+o))}
