import fs from 'fs';
const [f,pat,w='350']=process.argv.slice(2);
const s=fs.readFileSync(f,'utf8').replace(/\s+/g,' ');
const re=new RegExp(pat,'gi');let m,last=-1e9,n=0;
while((m=re.exec(s))&&n<40){ if(m.index-last<+w)continue; last=m.index;n++;
 console.log('['+m.index+'] …'+s.slice(Math.max(0,m.index-+w),m.index+ +w)+'…\n');}
