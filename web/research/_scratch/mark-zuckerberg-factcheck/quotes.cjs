const fs=require('fs');
const b=JSON.parse(fs.readFileSync('../../../src/content/billionaires/books/mark-zuckerberg.json','utf8'));
const norm=s=>s.replace(/&#0*39;|&#x27;|&apos;|&#8217;|&rsquo;/gi,"'").replace(/&#8230;/g,'...').toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]+/g,'');
const pages={};b.sources.forEach((s,i)=>{let t='';try{t=fs.readFileSync(`pages/${i}.txt`,'utf8')}catch{};pages[i]=norm(t)});
for(const f of fs.existsSync('extra')?fs.readdirSync('extra'):[]){const i=+f.split('.')[0];pages[i]=(pages[i]||'')+norm(fs.readFileSync('extra/'+f,'utf8'))}
const out=[];let n=0,ok=0;
function chk(where,q,src){n++;const q2=norm(q.replace(/\[[^\]]*\]/g,' ').replace(/==|__|\*\*/g,''));if(q2.length<6)return;
 // handle bracket: split on bracket
 const parts=q.split(/\[[^\]]*\]/).map(norm).filter(x=>x.length>3);
 const inS=(src||[]).filter(i=>parts.every(p=>pages[i]&&pages[i].includes(p)));
 if(inS.length){ok++;return}
 const any=Object.keys(pages).filter(i=>parts.every(p=>pages[i].includes(p)));
 out.push(`${where} src{${src}} anyin{${any}} :: ${q}`)}
function scan(where,text,src){if(!text)return;const re=/["“]([^"”]{4,}?)["”]/g;let m;while((m=re.exec(text)))chk(where,m[1],src)}
scan('hook',b.hook,b.hookSrc);
b.chapters.forEach((c,ci)=>c.blocks.forEach((x,i)=>{const w=`${ci}.${i}`;
 if(x.t==='quote')chk(w+' QUOTE',x.text,x.src);
 if(x.t==='p'||x.t==='example')scan(w,x.text,x.src);
 if(x.t==='venture')for(const k of['idea','decision','howStarted','funding','whatHappened','lesson'])scan(w+'.'+k,x[k],x.src);
 if(x.t==='facts'||x.t==='timeline')x.items.forEach((y,j)=>scan(w+'.'+j,y.text||y.label,y.src));
}));
b.lessons.forEach((l,i)=>scan('lesson'+i,l.text,Object.keys(pages).map(Number)));
console.log(n,ok);console.log(out.join('\n'));
