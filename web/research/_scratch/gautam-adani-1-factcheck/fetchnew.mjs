import fs from "node:fs";
const [bookPath, dir, ...ks] = process.argv.slice(2);
const b = JSON.parse(fs.readFileSync(bookPath, "utf8"));
const ent = (s) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"').replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n));
for (const k of ks) {
  const r = await fetch(b.sources[k].url, { headers: { "user-agent": "firstrupee-books-check/1.0 (education)" } });
  let h = await r.text();
  const ld = [...h.matchAll(/"articleBody"\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]).join("\n");
  h = h.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  const t = ent(h.replace(/<[^>]+>/g, " ")).replace(/[ \t]+/g, " ") + "\n" + ent(ld);
  fs.writeFileSync(`${dir}/txt/${k}.txt`, t);
  console.log(k, r.status, t.length);
}
