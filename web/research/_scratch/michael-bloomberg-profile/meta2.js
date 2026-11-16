const https=require('https');
const titles=process.argv.slice(2);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'BillionDollarPDFsResearch/1.0 (read-only research; contact via project owner)'}},r=>{let d='';r.on('data',c=>d+=c).on('end',()=>res(d))}).on('error',rej)})}
(async()=>{for(const t of titles){
 const u='https://commons.wikimedia.org/w/api.php?action=query&titles='+encodeURIComponent(t)+'&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=960&format=json';
 let raw,tries=0;
 for(;;){raw=await get(u);if(raw[0]==='{'||tries++>4)break;await sleep(20000);}
 if(raw[0]!=='{'){console.log('RATELIMIT',t);continue}
 const p=Object.values(JSON.parse(raw).query.pages)[0];const i=p.imageinfo&&p.imageinfo[0];
 if(!i){console.log('MISSING',t);await sleep(5000);continue}
 const m=i.extmetadata;const s=x=>m[x]?String(m[x].value).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim():'';
 console.log(JSON.stringify({t,thumb:i.thumburl,orig:i.url,page:i.descriptionurl,lic:s('LicenseShortName'),artist:s('Artist'),date:s('DateTimeOriginal'),desc:s('ImageDescription').slice(0,350)}));
 await sleep(5000);
}})();
