const fs=require('fs');const F=process.argv[2];let raw=fs.readFileSync(F,'utf8');const b=JSON.parse(raw);
const ch=id=>b.chapters.find(c=>c.id===id).blocks;
const idx=(bl,start)=>{const i=bl.findIndex(x=>(x.text||'').startsWith(start));if(i<0)throw new Error('no '+start);return i};
const o=ch('origins');
let i=idx(o,'Michael defended his thesis');
const src=o[i].src;
o.splice(i,3,
 {t:'p',text:'Michael defended his thesis in Kharkov, Ukraine, and went straight back to GOSPLAN. The reward was a raise of ==100 rubles==. “I thought I was rich. Life was beautiful,” he said with a chuckle.',src},
 {t:'p',text:'Genia had also fought through the entrance hurdles at Moscow State and worked in a research lab at the Soviet Oil and Gas Institute. She was happy there. “I was content in my job and had many friends,” she said. __So nobody in this family was starving. What they were running out of was a future.__',src});
i=idx(o,'They described the work');
o.splice(i+1,0,{t:'note',text:'Seeing the other side once was enough. Travel can end an old belief.'});
i=idx(o,"The school's director, Patty Barshay");
o.splice(i+1,0,{t:'note',text:'Imagine a supermarket as culture shock. That is how far they had come.'});
i=idx(o,'The worst of it came at Hebrew school');
const s2=o[i].src;
o.splice(i,2,
 {t:'p',text:'The worst of it came at Hebrew school. He went to Mishkan Torah for the better part of three years and hated the language lessons and everything else. “He was teased there by other kids and he begged us not to send him any more,” his mother remembered. “Eventually, it worked.”',src:s2},
 {t:'p',text:'At home, his father was a dry-humoured presence. “Sergey was a good boy,” Michael once joked, “when he was asleep.”',src:s2});
const g=ch('growing-up');
i=idx(g,'As a boy who loved basketball');
g.splice(i+1,0,{t:'note',text:'In this house, even the basketball joke needed a Ph.D.'});
i=idx(g,'His father told a reporter flatly');
g.splice(i+1,0,{t:'note',text:'No teen side hustle here. Skills first, money later. Both routes can work.'});
i=idx(g,'It is one of the most quoted lines');
g.splice(i+1,0,{t:'note',text:'Two thank-yous in a lifetime. One for a country, one for a toilet.'});
const line=o=>JSON.stringify(o);
let out='{\n  "chapters": [\n'+b.chapters.map(c=>'    {\n      "id": '+line(c.id)+',\n      "kicker": '+line(c.kicker)+',\n      "title": '+line(c.title)+',\n      "blocks": [\n'+c.blocks.map(x=>'        '+line(x)).join(',\n')+'\n      ]\n    }').join(',\n')+'\n  ],\n  "sources": [\n'+b.sources.map(s=>'    '+line(s)).join(',\n')+'\n  ],\n  "factCheck": {\n    "method": '+line(b.factCheck.method)+',\n    "disputed": [\n'+b.factCheck.disputed.map(d=>'      '+line(d)).join(',\n')+'\n    ]\n  }\n}\n';
fs.writeFileSync(F,out);
