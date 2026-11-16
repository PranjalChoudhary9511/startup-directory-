import fs from "node:fs";
const urls=process.argv.slice(2);
for(const u of urls){try{const r=await fetch(u,{redirect:"follow",headers:{"user-agent":"firstrupee-books-check/1.0 (education)"}});const t=await r.text();
const links=[...t.matchAll(/href="([^"]*(?:x\.com|twitter\.com|instagram\.com|youtube\.com|linkedin\.com|facebook\.com)[^"]*)"/g)].map(m=>m[1]);
console.log(u,r.status,r.url===u?"":"→ "+r.url,[...new Set(links)].slice(0,12));}catch(e){console.log(u,"ERR",e.code||e.cause?.code)}}
