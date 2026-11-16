// Contact and photo audit: one batched Commons API call, then raw hrefs on official contact pages.
import fs from "node:fs";
const book = "C:/Users/Pranjal Choudhary/Desktop/start-up derectory/web/src/content/billionaires/books/mukesh-ambani.json";
const b = JSON.parse(fs.readFileSync(book, "utf8"));
const UA = { "user-agent": "firstrupee-books-check/1.0 (education; run by the site owner)" };
const photos = [["portrait", b.portrait], ...b.photos.map((p, i) => [`photos[${i}]`, p])];
b.chapters.forEach((c, ci) => c.blocks.forEach((x, i) => x.t === "photo" && photos.push([`${ci}.${i}`, x.photo])));
const titleOf = (p) => decodeURIComponent(p.page.split("/wiki/")[1]).replace(/_/g, " ");
const titles = [...new Set(photos.map(([, p]) => titleOf(p)))];
const pages = {};
for (let i = 0; i < titles.length; i += 20) {
  const u = `https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo&iiprop=url|extmetadata&titles=${encodeURIComponent(titles.slice(i, i + 20).join("|"))}`;
  let j = null;
  for (let tries = 0; tries < 10 && !j; tries++) {
    await new Promise((r) => setTimeout(r, 20000 + tries * 30000));
    const r = await fetch(u, { headers: UA });
    const t = await r.text();
    try { j = JSON.parse(t); } catch { console.error("rate limited, waiting", tries); }
  }
  for (const pg of j.query.pages) pages[pg.title] = pg;
}
for (const [w, p] of photos) {
  const pg = pages[titleOf(p)];
  const ii = pg?.imageinfo?.[0];
  const m = ii?.extmetadata || {};
  const v = (k) => (m[k]?.value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 170);
  const base = ii ? decodeURIComponent(ii.url.split("/").pop()) : "";
  console.log(`\n${w}: ${titleOf(p)}\n  book: ${p.license} | ${p.author} | ${p.year}\n  api : ${v("LicenseShortName")} | ${v("Artist")} | ${v("DateTimeOriginal")} | ${v("Credit").slice(0, 80)}\n  desc: ${v("ImageDescription")}\n  url matches file: ${ii ? decodeURIComponent(p.url).includes(base) : "NO PAGE"}\n  caption: ${p.caption}`);
}
console.log("\n=== CONTACT PAGES");
for (const u of ["https://www.ril.com/contact-us", "https://www.ril.com/investors/shareholders-information/investor-contacts", "https://www.reliancefoundation.org/contact-us", "https://www.jio.com/help/contact-us"]) {
  try {
    const r = await fetch(u, { headers: UA });
    const h = await r.text();
    const hrefs = [...new Set([...h.matchAll(/https?:\/\/(?:www\.|in\.)?(?:twitter|x|instagram|linkedin|youtube|facebook)\.com\/[^"'\s<>)\\]+/gi)].map((m) => m[0]))];
    const mails = [...new Set([...h.matchAll(/[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)].map((m) => m[0]))];
    const tels = [...new Set([...h.matchAll(/(?:\+91[-\s\d]{8,}|1800[-\s\d]{6,}|7000[\s\d]{6,})/g)].map((m) => m[0].trim()))];
    console.log(`\n${u} -> ${r.status}\n  socials: ${hrefs.join(" , ")}\n  mails: ${mails.join(" , ")}\n  tels: ${tels.slice(0, 15).join(" , ")}`);
    const addr = [...h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").matchAll(/.{0,60}(Maker Chambers|Nariman Point).{0,80}/g)].slice(0, 3).map((m) => m[0]);
    console.log("  addr:", addr.join(" || "));
  } catch (e) { console.log(u, "ERR", e.message); }
}
for (const so of b.contact.socials) {
  try {
    const r = await fetch(so.url, { headers: UA, redirect: "follow" });
    console.log(so.url, r.status, r.url === so.url ? "" : "-> " + r.url);
  } catch (e) { console.log(so.url, "ERR", e.code || e.message); }
}
