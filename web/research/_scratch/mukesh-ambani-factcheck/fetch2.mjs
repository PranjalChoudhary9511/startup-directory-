import fs from "node:fs";
const urls = {
  plast: "https://www.plasteurope.com/news/detail.asp?id=215242",
  dom0308: "https://www.domain-b.com/companies/companies_r/Reliance_Industries/20100308_restructuring.html",
  chem2: "https://www.chemanager-online.com/node/386579",
  dom2017: "https://domain-b.com/companies/companies_r/Reliance_Industries/20171007_prices.html",
  bs126: "https://www.business-standard.com/article/companies/reliance-industries-sells-us-shale-block-for-126-million-117100601142_1.html",
  scroll: "https://amp.scroll.in/article/778534/scroll_in",
  btjio: "https://www.businesstoday.in/story/ril-agm-mukesh-ambani-announces-reliance-jio-hiring-plans/1/195640.html",
  bs50: "https://www.business-standard.com/article/pti-stories/jio-crosses-50-million-subscriber-mark-in-83-days-116112801292_1.html",
  telecompaper: "https://www.voicendata.com/jio-crosses-50-million-subscribers-in-83-days",
};
const dir = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web/research/_scratch/mukesh-ambani-factcheck/pagesx/";
for (const [k, u] of Object.entries(urls)) {
  try {
    const r = await fetch(u, { headers: { "user-agent": "firstrupee-books-check/1.0 (education)" }, redirect: "follow" });
    const t = (await r.text()).replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    fs.writeFileSync(dir + k + ".txt", t);
    console.log(k, r.status, t.length);
  } catch (e) { console.log(k, "ERR", e.cause?.code || e.name); }
}
const grep = (re) => {
  console.log(`\n## ${re}`);
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt"))) {
    const t = fs.readFileSync(dir + f, "utf8");
    const m = new RegExp(re, "i").exec(t);
    if (m) console.log(`  [${f}] ...${t.slice(Math.max(0, m.index - 150), m.index + m[0].length + 150)}...`);
  }
};
["15\\.5", "3,261", "impair", "Dec(ember)? 27|27(th)? Dec", "renamed", "83 days", "Blavatnik", "too low"].forEach(grep);
