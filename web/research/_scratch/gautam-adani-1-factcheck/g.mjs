import fs from "node:fs";
// usage: node g.mjs txtdir "k:regex" ...
const dir=process.argv[2];
for(const a of process.argv.slice(3)){const i=a.indexOf(":");const k=a.slice(0,i),re=new RegExp(a.slice(i+1),"gi");
 const p=dir+"/"+k+".txt";if(!fs.existsSync(p)){console.log(`--${k} NOFILE`);continue;}
 const t=fs.readFileSync(p,"utf8").replace(/\s+/g," ");let n=0;let m;console.log(`--${k} /${a.slice(i+1)}/ len=${t.length}`);
 while((m=re.exec(t))&&n<3){console.log("  ..."+t.slice(Math.max(0,m.index-170),m.index+m[0].length+170)+"...");n++;if(m[0].length==0)re.lastIndex++;}
 if(!n)console.log("  (no match)");}
