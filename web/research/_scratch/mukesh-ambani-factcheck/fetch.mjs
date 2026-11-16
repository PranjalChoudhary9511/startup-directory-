// Read-only fetch of every cited source, with an honest user agent. Blocked pages are just recorded.
import fs from "node:fs";
import path from "node:path";
const root = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web";
const out = path.join(root, "research/_scratch/mukesh-ambani-factcheck/pages");
fs.mkdirSync(out, { recursive: true });
const b = JSON.parse(fs.readFileSync(path.join(root, "src/content/billionaires/books/mukesh-ambani.json"), "utf8"));
const only = process.argv.slice(2).map(Number);
const list = b.sources.map((s, i) => ({ ...s, i })).filter((s) => !only.length || only.includes(s.i));
const strip = (h) => {
  const ld = [...h.matchAll(/"articleBody"\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1].replace(/\\n/g, " ").replace(/\\"/g, '"')).join("\n");
  const t = h
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;|&rsquo;|&lsquo;|&#8217;|&#8216;/g, "'")
    .replace(/&ldquo;|&rdquo;|&#8220;|&#8221;/g, '"').replace(/&mdash;|&ndash;/g, "-")
    .replace(/\s+/g, " ");
  return (ld ? ld + "\n" : "") + t;
};
const status = {};
async function one(s) {
  try {
    const ac = new AbortController();
    const to = setTimeout(() => ac.abort(), 40000);
    const r = await fetch(s.url, { redirect: "follow", signal: ac.signal, headers: { "user-agent": "firstrupee-books-check/1.0 (education)" } });
    clearTimeout(to);
    const ct = r.headers.get("content-type") || "";
    if (ct.includes("pdf")) {
      fs.writeFileSync(path.join(out, `${s.i}.pdf`), Buffer.from(await r.arrayBuffer()));
      status[s.i] = { st: r.status, kind: "pdf" };
      return;
    }
    const h = await r.text();
    const t = strip(h);
    fs.writeFileSync(path.join(out, `${s.i}.txt`), t);
    status[s.i] = { st: r.status, len: t.length };
  } catch (e) {
    status[s.i] = { st: e.code || e.name || "ERR" };
  }
}
const q = [...list];
await Promise.all(Array.from({ length: 12 }, async () => { while (q.length) await one(q.shift()); }));
const sf = path.join(out, "_status.json");
const prev = fs.existsSync(sf) ? JSON.parse(fs.readFileSync(sf, "utf8")) : {};
fs.writeFileSync(sf, JSON.stringify({ ...prev, ...status }, null, 0));
for (const s of b.sources.map((s, i) => ({ ...s, i })).filter((s) => status[s.i])) {
  const v = status[s.i];
  if (v.st !== 200 || (v.len !== undefined && v.len < 1500)) console.log(s.i, JSON.stringify(v), s.url.slice(0, 90));
}
console.log("done", Object.keys(status).length);
