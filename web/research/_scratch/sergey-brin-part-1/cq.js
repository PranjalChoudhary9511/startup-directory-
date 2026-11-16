const https=require('https');
const qs=process.argv.slice(2);
function g(q){return new Promise(r=>{const u='https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch='+encodeURIComponent(q)+'&gsrlimit=6&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiextmetadatafilter=Artist|LicenseShortName|DateTimeOriginal&format=json';
https.get(u,{headers:{'User-Agent':'BillionDollarPDFsResearch/1.0'}},res=>{let s='';res.on('data',d=>s+=d);res.on('end',()=>r(JSON.parse(s)))})})}
(async()=>{for(const q of qs){console.log('## '+q);const j=await g(q);if(!j.query){console.log('none');continue}
Object.values(j.query.pages).forEach(p=>{const i=p.imageinfo[0],m=i.extmetadata;const a=((m.Artist||{}).value||'').replace(/<[^>]+>/g,'').trim();console.log([p.title,i.url.split('?')[0],a,(m.LicenseShortName||{}).value,((m.DateTimeOriginal||{}).value||'').replace(/<[^>]+>/g,'').slice(0,20)].join(' | '))})}})()
