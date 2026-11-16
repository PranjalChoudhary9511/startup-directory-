const titles=["File:The CEO Magazine Cover.jpg","File:Fangheng Fashion Center with ByteDance markings (20220728154237).jpg","File:ByteDance 1733 Commercial Space (20240731145554).jpg","File:ByteDance Dazhongsi Plaza No. 2 (20240322133432).jpg","File:Douyin Group and Feishu logos on Fashion Vanke Center 20260620143040.jpg","File:AVIC Plaza A2 (20220411155409).jpg","File:East gate of AVIC Plaza (20220411153919).jpg","File:TikTok and other ByteDance apps.jpg","File:字节跳动厦门总部大楼.jpg","File:ByteDance logo English.svg","File:ByteDance apps being pulled from Google Play Store.png","File:后海湾CBD.jpg","File:抖inCity青岛站·无限远航 远航市集嘉年华.jpg"];
(async()=>{
 const u="https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=1000&format=json&titles="+encodeURIComponent(titles.join("|"));
 const r=await fetch(u,{headers:{"User-Agent":"BillionDollarPDFs-research/1.0 (read-only)"}});
 const j=await r.json();
 const strip=s=>(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,400);
 for(const p of Object.values(j.query.pages)){
  const i=p.imageinfo&&p.imageinfo[0]; if(!i){console.log(p.title,"MISSING");continue}
  const m=i.extmetadata;
  console.log(JSON.stringify({title:p.title,thumb:i.thumburl.split("?")[0],w:i.thumbwidth,h:i.thumbheight,page:i.descriptionurl,desc:strip(m.ImageDescription&&m.ImageDescription.value),artist:strip(m.Artist&&m.Artist.value),lic:m.LicenseShortName&&m.LicenseShortName.value,date:strip(m.DateTimeOriginal&&m.DateTimeOriginal.value),cats:strip(m.Categories&&m.Categories.value)},null,0));
 }
})();
