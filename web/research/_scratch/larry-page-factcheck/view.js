const fs=require('fs');
const b=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const mode=process.argv[3];
if(mode==='meta'){
  const {chapters,sources,...rest}=b;
  console.log(JSON.stringify(rest,null,1));
  console.log('CHAPTERS');
  chapters.forEach((c,i)=>{const n={};c.blocks.forEach(x=>n[x.t]=(n[x.t]||0)+1);console.log(i,c.id,'|',c.kicker,'|',c.title,JSON.stringify(n))});
  console.log('SOURCES',sources.length);
} else if(mode==='sources'){
  b.sources.forEach((s,i)=>console.log(i,s.label,'|',s.url));
} else if(mode==='ch'){
  const from=+process.argv[4],to=+(process.argv[5]||process.argv[4]);
  for(let i=from;i<=to;i++){const c=b.chapters[i];console.log('=== '+i+' '+c.id+' | '+c.kicker+' | '+c.title);
    c.blocks.forEach((x,j)=>{const {t,...r}=x;
      if(t==='photo'){console.log(j,'[photo]',x.photo.page,'|',x.photo.caption,'|',x.photo.author,'|',x.photo.license);return;}
      if(t==='venture'){console.log(j,'[venture]',JSON.stringify(r,null,0));return;}
      if(t==='facts'||t==='timeline'){console.log(j,'['+t+']');x.items.forEach(it=>console.log('   ',JSON.stringify(it)));return;}
      console.log(j,'['+t+']',x.text||x.title, x.who?('— '+x.who):'', x.src?JSON.stringify(x.src):'');
    });
  }
}
