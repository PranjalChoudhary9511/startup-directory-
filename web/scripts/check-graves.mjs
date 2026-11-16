// Validates graveyard JSON files against the SOP in src/content/graveyard/schema.ts.
// Usage: node scripts/check-graves.mjs [slug ...]   (no args = every file)
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "src/content/graveyard/graves");
const CAUSES = ["burn", "unit-economics", "no-market", "business-model", "fraud", "governance", "competition", "regulation", "tech", "timing", "over-expansion", "funding-dried", "team", "focus"];
const STATUS = ["shut-down", "bankrupt", "insolvent", "sold-for-parts", "absorbed-and-closed", "licence-revoked"];
const KINDS = ["start", "money", "peak", "warning", "crisis", "end", "after"];

const want = process.argv.slice(2);
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json") && (!want.length || want.includes(f.replace(/\.json$/, ""))));
let bad = 0;

for (const f of files) {
  const errs = [];
  let g;
  try {
    g = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  } catch (e) {
    console.log(`✗ ${f}: invalid JSON (${e.message})`);
    bad++;
    continue;
  }
  const need = (cond, msg) => cond || errs.push(msg);
  const n = g.sources?.length ?? 0;
  const cites = (src, where) => {
    if (!Array.isArray(src) || !src.length) return errs.push(`${where}: missing src`);
    for (const i of src) if (!Number.isInteger(i) || i < 0 || i >= n) errs.push(`${where}: src ${i} out of range`);
  };

  need(g.slug === f.replace(/\.json$/, ""), "slug must equal file name");
  for (const k of ["name", "country", "sector", "epitaph", "oneLiner", "causeOfDeath", "killerLine", "moneyNote"]) need(typeof g[k] === "string" && g[k].trim(), `${k} missing`);
  need(["india", "global"].includes(g.region), "region must be india|global");
  need(STATUS.includes(g.status), `status must be one of ${STATUS.join(", ")}`);
  need(/^#[0-9a-f]{6}$/i.test(g.brandColor ?? ""), "brandColor must be #rrggbb");
  need(Number.isInteger(g.founded) && Number.isInteger(g.died) && g.died >= g.founded, "founded/died years");
  need((g.epitaph ?? "").length <= 60, `epitaph ${g.epitaph?.length} > 60 chars`);
  for (const k of ["raisedUsdM", "peakValuationUsdM", "endValueUsdM"]) need(g[k] === null || typeof g[k] === "number", `${k} must be number|null`);
  cites(g.moneySrc, "moneySrc");
  need(Array.isArray(g.inOneMinute) && g.inOneMinute.length === 3, "inOneMinute must have 3 bullets");
  need(Array.isArray(g.numbers) && g.numbers.length === 4, "numbers must have 4");
  g.numbers?.forEach((x, i) => cites(x.src, `numbers[${i}]`));
  need(Array.isArray(g.chapters) && g.chapters.length === 4, "chapters must have 4");
  g.chapters?.forEach((c, i) => cites(c.src, `chapters[${i}]`));
  need(Array.isArray(g.timeline) && g.timeline.length >= 6, "timeline needs ≥ 6");
  g.timeline?.forEach((t, i) => (need(KINDS.includes(t.kind), `timeline[${i}].kind`), cites(t.src, `timeline[${i}]`)));
  need(Array.isArray(g.charts) && g.charts.length <= 2, "charts: 0–2");
  g.charts?.forEach((c, i) => {
    cites(c.src, `charts[${i}]`);
    need(["bar", "line"].includes(c.kind), `charts[${i}].kind`);
    c.series?.forEach((s, j) => need(s.values?.length === c.labels?.length, `charts[${i}].series[${j}] length ≠ labels`));
  });
  need(Array.isArray(g.rounds), "rounds must be an array");
  g.rounds?.forEach((r, i) => cites(r.src, `rounds[${i}]`));
  const sum = (g.causes ?? []).reduce((a, c) => a + c.weight, 0);
  need(g.causes?.length >= 2 && g.causes.length <= 4 && sum === 100, `causes: 2–4 entries summing to 100 (got ${sum})`);
  g.causes?.forEach((c) => need(CAUSES.includes(c.key), `cause ${c.key} unknown`));
  need(g.mistakes?.length >= 3 && g.mistakes.length <= 6, "mistakes: 3–6");
  g.mistakes?.forEach((m, i) => cites(m.src, `mistakes[${i}]`));
  need(g.warningSigns?.length >= 4, "warningSigns: ≥ 4");
  need(g.lessons?.length === 5, "lessons: exactly 5");
  if (g.quote) cites(g.quote.src, "quote");
  cites(g.afterlife?.src, "afterlife");
  need(n >= 6, `sources: ≥ 6 (got ${n})`);
  need(g.factCheck && Array.isArray(g.factCheck.disputed), "factCheck.disputed");

  // Soft limits from the SOP: reported, not fatal.
  const warns = [];
  const words = (t) => (t ?? "").replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
  if ((g.oneLiner ?? "").length > 140) warns.push(`oneLiner ${g.oneLiner.length} > 140 chars`);
  if ((g.causeOfDeath ?? "").length > 160) warns.push(`causeOfDeath ${g.causeOfDeath.length} > 160 chars`);
  if ((g.killerLine ?? "").replace(/\*\*/g, "").length > 140) warns.push(`killerLine > 140 chars`);
  g.inOneMinute?.forEach((b, i) => words(b) > 34 && warns.push(`inOneMinute[${i}] ${words(b)} words > 30`));
  g.chapters?.forEach((c, i) => words(c.body) > 175 && warns.push(`chapters[${i}] ${words(c.body)} words > 160`));
  g.mistakes?.forEach((m, i) => words(m.explain) > 90 && warns.push(`mistakes[${i}] ${words(m.explain)} words > 80`));
  if (warns.length) console.log(`! ${f}\n  ~ ${warns.join("\n  ~ ")}`);

  if (errs.length) {
    bad++;
    console.log(`✗ ${f}\n  - ${errs.join("\n  - ")}`);
  } else console.log(`✓ ${f}`);
}
console.log(`\n${files.length - bad}/${files.length} valid`);
process.exit(bad ? 1 : 0);
