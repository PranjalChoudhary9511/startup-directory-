const fs=require('fs');const b=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const S=b.sources.length;let tot=0;const used=new Set();
const wc=t=>t.trim().split(/\s+/).length;
for(const c of b.chapters){let w=0,run=0;const types={};
 for(const x of c.blocks){types[x.t]=(types[x.t]||0)+1;
  (x.src||[]).forEach(i=>{used.add(i);if(i>=S)console.log('BAD SRC',i)});
  (x.items||[]).forEach(it=>{(it.src||[]).forEach(i=>{used.add(i);if(i>=S)console.log('BAD SRC',i)});w+=wc((it.value||it.when||'')+' '+(it.label||it.text||''))});
  if(x.text)w+=wc(x.text);
  if(x.t==='note'&&wc(x.text)>14)console.log('LONG NOTE',wc(x.text),x.text);
  if(x.t==='p'){const n=x.text.replace(/\b(Dr|Ph\.D|N\.B\.A|U\.S|D\.C)\./g,'$1').split(/[.!?][”’]?\s+(?=[A-Z“_=])/).length;if(n>5)console.log('LONG P',n,x.text.slice(0,80));if(!x.src||!x.src.length)console.log('NOSRC',x.text.slice(0,60));run++;if(run>4)console.log('RUN>4 at',x.text.slice(0,60))}else if(x.t!=='h')run=0;
 }
 console.log(c.id,w,JSON.stringify(types));tot+=w}
console.log('total',tot,'sources',S,'unused',[...Array(S).keys()].filter(i=>!used.has(i)));
