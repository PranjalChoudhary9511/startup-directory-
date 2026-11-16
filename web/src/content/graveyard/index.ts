import fs from "node:fs";
import path from "node:path";
import { CAUSE_ORDER, toCard } from "./labels";
import type { CauseKey, Grave } from "./schema";

export type { CauseKey, Grave, GraveStatus } from "./schema";
export { CAUSES, STATUS, toCard, usd, type GraveCard } from "./labels";

// One researched autopsy per JSON file in ./graves (see schema.ts for the SOP and
// `node scripts/check-graves.mjs` to validate). Dropping in a file adds a stone. Read once in
// production; re-read on every call in development so new files show up without a restart.
const DIR = path.join(process.cwd(), "src/content/graveyard/graves");
let cache: Grave[] | null = null;

function valid(g: Grave) {
  return (
    g?.slug &&
    g.name &&
    Number.isInteger(g.founded) &&
    Number.isInteger(g.died) &&
    Array.isArray(g.causes) &&
    g.causes.length > 0 &&
    Array.isArray(g.chapters) &&
    Array.isArray(g.sources)
  );
}

function load() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  cache = (fs.existsSync(DIR) ? fs.readdirSync(DIR) : [])
    .filter((f) => f.endsWith(".json"))
    .flatMap((f) => {
      try {
        const g = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Grave;
        return valid(g) ? [{ ...g, charts: g.charts ?? [], rounds: g.rounds ?? [], timeline: g.timeline ?? [] }] : [];
      } catch {
        return []; // a half-written file never breaks the page
      }
    })
    // The biggest burns first: that's the order the cemetery opens in.
    .sort((a, b) => (b.raisedUsdM ?? -1) - (a.raisedUsdM ?? -1) || a.name.localeCompare(b.name));
  return cache;
}

export const graves = () => load();
export const getGrave = (slug: string) => load().find((g) => g.slug === slug);
export const graveSlugs = () => load().map((g) => g.slug);

/** Previous / next stone in cemetery order, wrapping around. */
export function neighbours(slug: string) {
  const all = load();
  const i = all.findIndex((g) => g.slug === slug);
  if (i === -1 || all.length < 2) return { prev: null, next: null };
  return { prev: all[(i - 1 + all.length) % all.length], next: all[(i + 1) % all.length] };
}

/** Graves that died mainly of the same thing: the pattern is the lesson. */
export function sameCause(g: Grave, n = 4) {
  const primary = [...g.causes].sort((a, b) => b.weight - a.weight)[0].key;
  return load()
    .filter((x) => x.slug !== g.slug && toCard(x).cause === primary)
    .slice(0, n);
}

/** Totals and distributions for the cemetery-wide infographics. All computed, never typed in. */
export function cemeteryStats() {
  const all = load();
  const raised = all.reduce((s, g) => s + (g.raisedUsdM ?? 0), 0);
  const years = all.reduce((s, g) => s + Math.max(1, g.died - g.founded), 0);

  // Each grave spreads its 100 points over its causes; summing gives "share of all deaths".
  const weight = new Map<CauseKey, number>();
  for (const g of all) for (const c of g.causes) weight.set(c.key, (weight.get(c.key) ?? 0) + c.weight / 100);
  const causes = CAUSE_ORDER.map((key) => ({ key, deaths: weight.get(key) ?? 0, primary: all.filter((g) => toCard(g).cause === key).length }))
    .filter((c) => c.deaths > 0)
    .sort((a, b) => b.deaths - a.deaths);

  const byYear = new Map<number, number>();
  for (const g of all) byYear.set(g.died, (byYear.get(g.died) ?? 0) + 1);
  const span = all.length ? [Math.min(...all.map((g) => g.died)), Math.max(...all.map((g) => g.died))] : [0, 0];
  const deathsByYear = [];
  for (let y = span[0]; y <= span[1]; y++) deathsByYear.push({ year: y, count: byYear.get(y) ?? 0 });

  const lifespans = all.map((g) => g.died - g.founded).sort((a, b) => a - b);
  return {
    count: all.length,
    india: all.filter((g) => g.region === "india").length,
    raised,
    years,
    medianLife: lifespans.length ? lifespans[Math.floor(lifespans.length / 2)] : 0,
    causes,
    deathsByYear,
    biggest: all.filter((g) => g.raisedUsdM).slice(0, 8),
  };
}
