import fs from "node:fs";
import path from "node:path";
const dir = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web/research/_scratch/mukesh-ambani-factcheck";
const src = JSON.parse(fs.readFileSync(path.join(dir, "newsrc.json"), "utf8"));
const out = path.join(dir, "pagesx");
fs.mkdirSync(out, { recursive: true });
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
const q = Object.entries(src);
await Promise.all(Array.from({ length: 8 }, async () => {
  while (q.length) {
    const [k, s] = q.shift();
    try {
      const ac = new AbortController();
      const to = setTimeout(() => ac.abort(), 40000);
      const r = await fetch(s.url, { redirect: "follow", signal: ac.signal, headers: { "user-agent": "firstrupee-books-check/1.0 (education)" } });
      clearTimeout(to);
      const ct = r.headers.get("content-type") || "";
      if (ct.includes("pdf")) { fs.writeFileSync(path.join(out, k + ".pdf"), Buffer.from(await r.arrayBuffer())); console.log(k, r.status, "pdf"); continue; }
      const t = strip(await r.text());
      fs.writeFileSync(path.join(out, k + ".txt"), t);
      console.log(k, r.status, t.length);
    } catch (e) { console.log(k, "ERR", e.cause?.code || e.name); }
  }
}));
