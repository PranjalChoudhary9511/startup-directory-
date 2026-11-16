import fs from "node:fs";
const d = process.argv[2];
const UA = { headers: { "user-agent": "firstrupee-books-check/1.0 (education)" } };
const t = fs.readFileSync(`${d}/txt/223.txt`, "utf8").replace(/\s+/g, " ");
for (const re of [/alter/i, /Malay/, /spearhead/i]) {
  const i = t.search(re);
  console.log(re, i, t.slice(Math.max(0, i - 400), i + 300));
}
const home = await (await fetch("https://www.vandebharatam.org/", UA)).text();
const scripts = [...home.matchAll(/src="([^"]+\.js[^"]*)"/g)].map((x) => x[1]);
console.log("home", home.length, scripts.length, /youtube/i.test(home));
for (const s of scripts) {
  const u = s.startsWith("http") ? s : "https://www.vandebharatam.org" + s;
  const c = await (await fetch(u, UA)).text();
  for (const m of c.matchAll(/https?:\/\/[a-z.]*(youtube|instagram|linkedin|facebook|twitter|x)\.com[^"'`\s)]*/gi)) {
    if (/vande|adani/i.test(m[0])) console.log(m[0]);
  }
}
const yt = await (await fetch("https://www.youtube.com/@AdaniVandeBharatam", UA)).text();
const mt = yt.match(/<meta property="og:title" content="([^"]*)"/);
const md = yt.match(/<meta property="og:description" content="([^"]*)"/);
console.log("YT", mt?.[1], "|", md?.[1]?.slice(0, 300));
