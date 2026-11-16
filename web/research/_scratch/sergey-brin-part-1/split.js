const fs=require('fs');const F=process.argv[2];const b=JSON.parse(fs.readFileSync(F,'utf8'));
const prot=t=>t.replace(/\b(Dr|Mr)\./g,'$1\u0001').replace(/Ph\.D\./g,'Ph\u0001D\u0001').replace(/N\.B\.A\./g,'N\u0001B\u0001A\u0001').replace(/U\.S\./g,'U\u0001S\u0001');
const unprot=t=>t.replace(/\u0001/g,'.');
function sents(t){const p=prot(t);const out=[];let last=0;const re=/[.!?][”’]?\s+(?=[A-Z“_=])/g;let m;while((m=re.exec(p))){out.push(p.slice(last,m.index+m[0].length));last=m.index+m[0].length}out.push(p.slice(last));return out.map(unprot)}
function bal(t){return (t.split('__').length-1)%2===0&&(t.split('==').length-1)%2===0}
for(const c of b.chapters){const nb=[];for(const x of c.blocks){if(x.t!=='p'){nb.push(x);continue}
  const s=sents(x.text);if(s.length<=5){nb.push(x);continue}
  const parts=s.length>=9?3:2;const size=Math.ceil(s.length/parts);let i=0;const chunks=[];
  while(i<s.length){let j=Math.min(i+size,s.length);while(j<s.length&&!bal(s.slice(i,j).join('')))j++;chunks.push(s.slice(i,j).join('').trim());i=j}
  chunks.forEach(t=>nb.push({t:'p',text:t,src:x.src}));
 }c.blocks=nb}
// keep the compact one-block-per-line layout
const line=o=>JSON.stringify(o);
let out='{\n  "chapters": [\n'+b.chapters.map(c=>'    {\n      "id": '+line(c.id)+',\n      "kicker": '+line(c.kicker)+',\n      "title": '+line(c.title)+',\n      "blocks": [\n'+c.blocks.map(x=>'        '+line(x)).join(',\n')+'\n      ]\n    }').join(',\n')+'\n  ],\n  "sources": [\n'+b.sources.map(s=>'    '+line(s)).join(',\n')+'\n  ],\n  "factCheck": {\n    "method": '+line(b.factCheck.method)+',\n    "disputed": [\n'+b.factCheck.disputed.map(d=>'      '+line(d)).join(',\n')+'\n    ]\n  }\n}\n';
fs.writeFileSync(F,out);
