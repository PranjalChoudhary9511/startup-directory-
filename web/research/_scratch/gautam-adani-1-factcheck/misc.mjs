import fs from "node:fs";
const d = process.argv[2];
const UA = { headers: { "user-agent": "firstrupee-books-check/1.0 (education)" } };
const flat = (k) => fs.readFileSync(`${d}/txt/${k}.txt`, "utf8").replace(/\s+/g, " ");
const show = (k, re, a, b) => {
  const t = flat(k);
  const i = t.search(re);
  console.log(`--${k} ${re} @${i}:`, i < 0 ? "" : t.slice(Math.max(0, i - a), i + b));
};
show(82, /discriminatory/, 500, 500);
show(223, /Vineet Jain/, 100, 500);
show(223, /alter ego/, 500, 300);
show(223, /four hours/, 300, 300);
show(23, /AdaniVandeBharatam/, 200, 60);
const wb = await (await fetch("https://api.worldbank.org/v2/country/IN/indicator/NY.GDP.PCAP.CN?format=json&date=1981", UA)).json();
console.log("WB", JSON.stringify(wb[1]?.[0]?.value), wb[1]?.[0]?.date);
for (const u of [
  "https://www.ndtv.com/india-news/father-trading-through-verbal-commitment-my-initial-lesson-on-trust-gautam-adani-3675604",
  "https://economictimes.indiatimes.com/magazines/panache/gautam-adani-dropped-out-of-college-in-1978-to-start-his-phenomenal-career-but-regrets-not-completing-college-education/articleshow/96859920.cms",
  "https://www.revoi.in/renowned-industrialist-gautam-adani-visited-his-hometown-palanpur-relived-old-memories/",
  "https://humdekhenge.in/banaskantha-has-a-great-contribution-in-my-formation-gautam-adani/",
  "https://www.youtube.com/@AdaniVandeBharatam",
  "https://www.mlex.com/mlex/articles/2545323/no-reason-to-force-dismissals-in-adani-corruption-case-us-judge-says",
]) {
  try {
    const r = await fetch(u, UA);
    const t = await r.text();
    console.log(r.status, u.slice(0, 70), t.length, /I now believe/.test(t), /Gujarat Mail/i.test(t), /Prakashbhai Desai/.test(t), /Vande Bharatam/i.test(t));
  } catch (e) {
    console.log("ERR", u, e.code || e.name);
  }
}
const h = fs.readFileSync(`${d}/src/23.html`, "utf8");
console.log(h.match(/https?:[^"' ]*youtube[^"' ]*/gi)?.slice(0, 4));
// copy check: 12+ word runs outside quotes shared with cited sources
const b = JSON.parse(fs.readFileSync(process.argv[3], "utf8"));
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const cache = {};
const T = (k) => (k in cache ? cache[k] : (cache[k] = fs.existsSync(`${d}/txt/${k}.txt`) ? norm(fs.readFileSync(`${d}/txt/${k}.txt`, "utf8")) : ""));
const hits = [];
const chk = (w, text, src) => {
  const clean = text.replace(/\*\*|__|==/g, "").replace(/["“][^"“”]*["”]/g, " | ");
  for (const seg of clean.split("|")) {
    const ws = norm(seg).split(" ");
    for (let i = 0; i + 10 <= ws.length; i++) {
      const g = ws.slice(i, i + 10).join(" ");
      if ((src || []).some((k) => T(k).includes(g))) {
        hits.push(`${w}: ${g}`);
        i += 9;
      }
    }
  }
};
b.chapters.forEach((c, ci) => c.blocks.forEach((x, i) => {
  const w = ci + "." + i;
  if (x.t === "p" || x.t === "example") chk(w, x.text, x.src);
  if (x.t === "venture") chk(w, [x.idea, x.decision, x.howStarted, x.funding, x.whatHappened, x.lesson].join(" | "), x.src);
  if (x.t === "timeline") x.items.forEach((y) => chk(w, y.text, y.src));
}));
console.log("COPY HITS", hits.length);
hits.slice(0, 40).forEach((h) => console.log(" ", h));
// structure
const longNotes = [];
const runs = [];
const longP = [];
b.chapters.forEach((c, ci) => {
  let run = 0;
  c.blocks.forEach((x, i) => {
    if (x.t === "note" && x.text.trim().split(/\s+/).length > 14) longNotes.push(`${ci}.${i} (${x.text.trim().split(/\s+/).length}): ${x.text}`);
    if (x.t === "p") {
      run++;
      if (run === 5) runs.push(`${ci}.${i}`);
      const n = x.text.split(/(?<=[.!?])\s+(?=[A-Z"_=*])/).length;
      if (n > 6 || n < 2) longP.push(`${ci}.${i} s=${n}`);
    } else if (x.t !== "h") run = 0;
  });
});
console.log("LONG NOTES", longNotes.length);
longNotes.forEach((n) => console.log(" ", n));
console.log("P RUNS >=5:", runs.join(" "));
console.log("P SENT:", longP.join(" "));
