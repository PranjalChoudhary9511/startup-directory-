import fs from "node:fs";
const dir = process.argv[2];
const h = fs.readFileSync(dir + "/src/24.html", "utf8");
console.log(h.length, h.slice(0, 300).replace(/\s+/g, " "));
const scripts = [...h.matchAll(/src="([^"]+\.js[^"]*)"/g)].map((x) => x[1]);
console.log(scripts);
const base = "https://www.vandebharatam.org";
for (const s of scripts) {
  const u = s.startsWith("http") ? s : base + (s.startsWith("/") ? "" : "/") + s;
  try {
    const r = await fetch(u, { headers: { "user-agent": "firstrupee-books-check/1.0 (education)" } });
    const t = await r.text();
    console.log(u, r.status, t.length);
    for (const re of [/contact@vandebharatam\.org/g, /7041278555/g, /AdaniVandeBharatam/g, /missed call/gi, /[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}/gi]) {
      const m = [...t.matchAll(re)].slice(0, 4);
      for (const x of m) console.log("  ", x[0], "::", t.slice(Math.max(0, x.index - 90), x.index + 90).replace(/\s+/g, " "));
    }
  } catch (e) {
    console.log(u, "ERR", e.code || e.name);
  }
}
