const cats=["Category:Zhang Yiming","Category:Nankai University","Category:Main building of Nankai University","Category:Longyan","Category:Liang Rubo","Category:Shou Zi Chew","Category:ByteDance offices","Category:ByteDance","Category:TikTok","Category:Toutiao","Category:Douyin"];
(async()=>{for(const c of cats){
 const u="https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtype=file%7Csubcat&cmlimit=40&format=json&cmtitle="+encodeURIComponent(c);
 const r=await fetch(u,{headers:{"User-Agent":"BillionDollarPDFs-research/1.0 (read-only)"}});const j=await r.json();
 console.log("##",c);console.log((j.query&&j.query.categorymembers||[]).map(x=>x.title).join("\n"));
}})();
