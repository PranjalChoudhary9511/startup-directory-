const https=require('https');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'BillionDollarPDFsResearch/1.0 (read-only research; contact via project owner)'}},r=>{let d='';r.on('data',c=>d+=c).on('end',()=>res(d))}).on('error',rej)})}
async function api(q){let raw,t=0;for(;;){raw=await get('https://commons.wikimedia.org/w/api.php?'+q+'&format=json');if(raw[0]==='{'||t++>4)break;await sleep(25000)}return raw[0]==='{'?JSON.parse(raw):{}}
(async()=>{const titles=["File:Mike Bloomberg in 2024 (cropped).jpg","File:President Joe Biden presents the Medal of Freedom to Mayor Michael Bloomberg.jpg","File:New York City Mayor Michael Bloomberg speaks at ceremony (6130408025).jpg","File:President George W. Bush meets with New York Governor George Pataki and Mayor Michael Bloomberg.jpg"];
for(const t of titles){const j=await api('action=query&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=960&titles='+encodeURIComponent(t));if(!j.query){console.log('RATE',t);continue}
 const p=Object.values(j.query.pages)[0];const i=p.imageinfo&&p.imageinfo[0];if(!i){console.log('MISSING',t);continue}const m=i.extmetadata;const s=x=>m[x]?String(m[x].value).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim():'';
 console.log(JSON.stringify({t,thumb:(i.thumburl||'').split('?')[0],orig:i.url.split('?')[0],w:i.width,h:i.height,page:i.descriptionurl,lic:s('LicenseShortName'),artist:s('Artist'),date:s('DateTimeOriginal'),desc:s('ImageDescription').slice(0,400)}));await sleep(5000)}
})();
