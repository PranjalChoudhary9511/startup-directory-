const https=require('https');
const titles=process.argv.slice(2);
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'BillionDollarPDFsResearch/1.0 (read-only research)'}},r=>{let d='';r.on('data',c=>d+=c).on('end',()=>res(d))}).on('error',rej)})}
(async()=>{for(const t of titles){const u='https://commons.wikimedia.org/w/api.php?action=query&titles='+encodeURIComponent(t)+'&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1000&format=json';
const j=JSON.parse(await get(u));const p=Object.values(j.query.pages)[0];const i=p.imageinfo&&p.imageinfo[0];if(!i){console.log('MISSING',t);continue}const m=i.extmetadata;const s=x=>m[x]?String(m[x].value).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim():'';
console.log(JSON.stringify({t,thumb:i.thumburl,page:i.descriptionurl,w:i.thumbwidth,lic:s('LicenseShortName'),artist:s('Artist'),date:s('DateTimeOriginal'),desc:s('ImageDescription').slice(0,400),credit:s('Credit').slice(0,150)}));}})();
