// Builds src/content/billionaires/list.json, the Billion Dollar PDFs directory.
//   node scripts/build-billionaires.mjs
// Inputs in research/billionaires/_data/:
//   forbes-rtb.json  Forbes real-time list (rank, name, net worth, source, country, birth date)
//   matches.json     Wikidata/Commons photo matches from scripts/match-billionaire-photos.py
//                    (accepted only when the Wikidata birth year equals Forbes' birth year)
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const data = path.join(root, "research/billionaires/_data");
const forbes = JSON.parse(fs.readFileSync(path.join(data, "forbes-rtb.json"), "utf8")).personList.personsLists;
const matchFile = path.join(data, "matches.json");
const matches = fs.existsSync(matchFile) ? JSON.parse(fs.readFileSync(matchFile, "utf8")) : {};
const AS_OF = Date.UTC(2026, 9, 29);

const FREE = /^(public domain|pd|cc0|cc[ -]by(-sa)?[ -][1-4]\.0|cc[ -]by(-sa)?[ -]2\.5|attribution|no restrictions)/i;

function commonsPath(file) {
  const f = file.replace(/ /g, "_");
  const h = crypto.createHash("md5").update(f, "utf8").digest("hex");
  return `${h[0]}/${h.slice(0, 2)}/${f}`;
}

function age(ms) {
  if (ms == null) return null;
  const b = new Date(ms);
  const now = new Date(AS_OF);
  let a = now.getUTCFullYear() - b.getUTCFullYear();
  if (now.getUTCMonth() < b.getUTCMonth() || (now.getUTCMonth() === b.getUTCMonth() && now.getUTCDate() < b.getUTCDate())) a--;
  return a;
}

const list = forbes
  .filter((p) => p.finalWorth >= 1000)
  .sort((a, b) => b.finalWorth - a.finalWorth)
  .map((p, i) => {
    const m = matches[p.uri];
    const lic = m?.credit?.license ?? "";
    const ok = m?.image && m.credit?.free !== false && FREE.test(lic);
    return {
      slug: p.uri,
      name: p.personName,
      rank: i + 1,
      worth: Math.round(p.finalWorth * 10) / 10,
      country: p.countryOfCitizenship ?? "",
      source: p.source ?? "",
      industry: (p.industries ?? [])[0] ?? "",
      age: age(p.birthDate),
      selfMade: typeof p.selfMade === "boolean" ? p.selfMade : null,
      city: p.city || null,
      photo: ok ? commonsPath(m.image) : null,
      credit: ok ? [m.credit.author || "Unknown author", lic].join(" · ") : null,
      wiki: m?.enwiki ?? null,
    };
  });

fs.writeFileSync(path.join(root, "src/content/billionaires/list.json"), JSON.stringify(list));
console.log(`✓ ${list.length} people, ${list.filter((p) => p.photo).length} with a free photo, ${new Set(list.map((p) => p.country)).size} countries`);
