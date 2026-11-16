// Read-only: downloads each source URL with a plain, honest UA. No retries around blocks.
import fs from "node:fs";
import path from "node:path";
const bookPath = process.argv[2];
const outDir = process.argv[3];
fs.mkdirSync(outDir, { recursive: true });
const b = JSON.parse(fs.readFileSync(bookPath, "utf8"));
const strip = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#x2019;|&rsquo;|&#39;|&apos;|&#x27;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;|&quot;|&#x201c;|&#x201d;/gi, '"')
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/\s+/g, " ");
const log = [];
let next = 0;
async function worker() {
  while (next < b.sources.length) {
    const i = next++;
    const s = b.sources[i];
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 25000);
    try {
      const r = await fetch(s.url, { redirect: "follow", signal: ctl.signal, headers: { "user-agent": "firstrupee-books-check/1.0 (education)" } });
      const ct = r.headers.get("content-type") || "";
      const buf = Buffer.from(await r.arrayBuffer());
      let txtLen = 0;
      if (r.status < 400) {
        if (/pdf/i.test(ct) || /\.pdf($|\?)/i.test(s.url)) {
          fs.writeFileSync(path.join(outDir, `${i}.pdf`), buf);
          txtLen = -buf.length;
        } else {
          const txt = strip(buf.toString("utf8"));
          fs.writeFileSync(path.join(outDir, `${i}.txt`), txt);
          txtLen = txt.length;
        }
      }
      log.push({ i, status: r.status, len: txtLen, url: s.url, final: r.url === s.url ? undefined : r.url });
    } catch (e) {
      log.push({ i, status: e.name === "AbortError" ? "TIMEOUT" : e.code || e.cause?.code || "ERR", len: 0, url: s.url });
    }
    clearTimeout(t);
  }
}
await Promise.all(Array.from({ length: 10 }, worker));
log.sort((a, b) => a.i - b.i);
fs.writeFileSync(path.join(outDir, "_log.json"), JSON.stringify(log, null, 0));
const okc = log.filter((l) => l.status === 200 && Math.abs(l.len) > 1500).length;
console.log("ok with content:", okc, "of", log.length);
for (const l of log) if (l.status !== 200 || Math.abs(l.len) <= 1500) console.log(l.i, l.status, l.len, l.url);
