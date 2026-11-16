const fs=require('fs');const[,,spec]=process.argv;
for(const s of fs.readFileSync(0,'utf8').split('\n').filter(Boolean)){const[i,marker,len]=s.split('|');const t=fs.readFileSync(`pages/${i}.txt`,'utf8');let p=t.indexOf(marker);if(p<0){console.log('=== '+i+' marker missing');p=0}console.log(`=== ${i}\n`+t.slice(p,p+(+len||2500))+'\n')}
