// usage: node s.cjs "n:regex" "n:regex" ... [ctx via env C]
const fs=require('fs');const C=+process.env.C||160;
for(const a of process.argv.slice(2)){const k=a.indexOf(':');const n=a.slice(0,k),re=new RegExp(a.slice(k+1),'gi');
 let t;try{t=fs.readFileSync(`pages/${n}.txt`,'utf8').replace(/\s+/g,' ')}catch{console.log(`[${n}] NOFILE`);continue}
 let m,c=0;const hits=[];while((m=re.exec(t))&&c<(+process.env.M||2)){hits.push(t.slice(Math.max(0,m.index-C),m.index+m[0].length+C));c++;if(!m[0].length)re.lastIndex++}
 console.log(`[${n}] /${a.slice(k+1)}/ ${c?'':'NO MATCH'}`);hits.forEach(h=>console.log('   …'+h+'…'))}
