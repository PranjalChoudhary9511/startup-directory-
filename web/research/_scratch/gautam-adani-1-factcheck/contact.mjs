import fs from "node:fs";
const b=JSON.parse(fs.readFileSync(process.argv[2],"utf8"));const dir=process.argv[3];
const raw=k=>{for(const e of ["html","pdf.pdf"]){const p=`${dir}/src/${k}.${e}`;if(fs.existsSync(p)&&e=="html")return fs.readFileSync(p,"utf8");}const t=`${dir}/txt/${k}.txt`;return fs.existsSync(t)?fs.readFileSync(t,"utf8"):null;};
const dig=s=>s.replace(/\D/g,"");
console.log("CHANNELS");
b.contact.channels.forEach((c,i)=>{const val=c.value;for(const k of c.src){const h=raw(k);if(h==null){console.log(i,c.label,"src",k,"NOFILE");continue;}
 let hit;if(c.kind=="phone"){const d=dig(val);const dd=dig(h.replace(/[^\d]/g,""));const last=d.slice(-8);hit=dd.includes(last);}
 else if(c.kind=="address"){hit=/Shantigram/i.test(h)&&/382421/.test(h);}
 else if(c.kind=="website"||c.kind=="form"){const host=val.split("/")[0];hit=h.toLowerCase().includes(host.toLowerCase());}
 else hit=h.toLowerCase().includes(val.toLowerCase());
 console.log(i,c.kind,val,"src",k,hit?"FOUND":"not found");}});
console.log("SOCIALS");
b.contact.socials.forEach((s,i)=>{for(const k of s.src){const h=raw(k);if(h==null){console.log(i,s.handle,"src",k,"NOFILE");continue;}
 const key=s.handle.replace(/^@/,"").toLowerCase();const hit=h.toLowerCase().includes(key);
 const m=[...h.matchAll(new RegExp("https?://[^\"' ]*"+s.platform.replace("x","(?:x|twitter)")+"[^\"' ]*","gi"))].map(x=>x[0]).slice(0,4);
 console.log(i,s.platform,s.handle,"src",k,hit?"FOUND":"not found",m.join(" | ").slice(0,200));}});
