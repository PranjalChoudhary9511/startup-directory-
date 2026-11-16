const https=require('https');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'BillionDollarPDFsResearch/1.0 (read-only research; contact via project owner)'}},r=>{let d='';r.on('data',c=>d+=c).on('end',()=>res(d))}).on('error',rej)})}
async function api(q){let raw,t=0;for(;;){raw=await get('https://commons.wikimedia.org/w/api.php?'+q+'&format=json');if(raw[0]==='{'||t++>4)break;await sleep(25000)}return raw[0]==='{'?JSON.parse(raw):{}}
(async()=>{
for(const c of ['Category:Michael_Bloomberg_in_2002','Category:Michael_Bloomberg_in_2024','Category:New_York_City_mayoral_election,_2001','Category:Michael_Bloomberg_presidential_campaign,_2020']){
 const j=await api('action=query&list=categorymembers&cmlimit=40&cmtitle='+encodeURIComponent(c));console.log('##',c);(j.query?j.query.categorymembers:[]).forEach(x=>console.log(x.title));await sleep(6000)}
const titles=["File:Mike Bloomberg Headshot.jpg","File:MichaelBloomberg-byPhilipRomano (cropped).jpg","File:MichaelBloomberg-byPhilipRomano (cropped 2).jpg","File:Vintage Bloomberg terminal at the Museum of the City of New York.jpg","File:Bloomberg Terminal Museum.jpg","File:Bloomberg Terminal and keyboard.JPG","File:2012 Bloomberg Terminal by jm3 - Creative Commons licensed.jpg","File:Interior of Bloomberg LP offices within Bloomberg Tower.jpg","File:Bloomberg Tower (2005).jpg","File:Bloomberg Tower.jpg","File:Bloomberg European Headquarters, London.jpg"];
for(const t of titles){const j=await api('action=query&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=960&titles='+encodeURIComponent(t));if(!j.query){console.log('RATE',t);continue}
 const p=Object.values(j.query.pages)[0];const i=p.imageinfo&&p.imageinfo[0];if(!i){console.log('MISSING',t);continue}const m=i.extmetadata;const s=x=>m[x]?String(m[x].value).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim():'';
 console.log(JSON.stringify({t,thumb:(i.thumburl||'').split('?')[0],orig:i.url.split('?')[0],w:i.width,h:i.height,page:i.descriptionurl,lic:s('LicenseShortName'),artist:s('Artist'),date:s('DateTimeOriginal'),desc:s('ImageDescription').slice(0,300)}));await sleep(5000)}
})();
