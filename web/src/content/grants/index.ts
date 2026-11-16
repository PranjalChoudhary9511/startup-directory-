import centralSector from "./data/central-sector.json";
import centralStartup from "./data/central-startup.json";
import giantsData from "./data/giants.json";
import privateGlobal from "./data/private-global.json";
import statesNorthEast from "./data/states-north-east.json";
import statesSouthWest from "./data/states-south-west.json";
import type { Grant, ProviderType } from "./schema";

export type { Grant, GrantStatus, Instrument, ProviderType, Stage } from "./schema";

export type Giant = {
  name: string;
  person: string | null;
  year: number;
  amount: string;
  program: string;
  story: string;
  lesson: string;
  source: { label: string; url: string };
};

const REQUIRED: (keyof Grant)[] = [
  "slug", "name", "shortName", "provider", "providerType", "instrument", "amountText", "equity", "duration",
  "status", "stages", "oneLiner", "what", "who", "why", "steps", "pros", "cons", "goodFitIf", "skipIf",
  "performance", "applyUrl", "officialUrl", "sources", "lastVerified",
];

const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

/** Drops entries missing SOP fields so a bad record can never break a page. */
function normalize(raw: unknown[]): Grant[] {
  return raw.flatMap((r) => {
    const g = r as Partial<Grant>;
    if (!g || REQUIRED.some((k) => g[k] === undefined || g[k] === null || g[k] === "")) return [];
    return [
      {
        ...g,
        state: g.state ?? null,
        launchedYear: g.launchedYear ?? null,
        maxAmountINR: typeof g.maxAmountINR === "number" ? g.maxAmountINR : null,
        timeToMoney: g.timeToMoney ?? "Not published",
        deadline: g.deadline ?? "Not published",
        sectors: arr<string>(g.sectors).length ? arr<string>(g.sectors) : ["Any"],
        notFor: arr<string>(g.notFor),
        documents: arr<string>(g.documents),
        benefits: arr<string>(g.benefits),
        insiderTips: arr<string>(g.insiderTips),
        howItWorks: g.howItWorks ?? "",
        confidenceNote: g.confidenceNote ?? "",
        performance: {
          summary: g.performance?.summary ?? "",
          metrics: arr(g.performance?.metrics),
          series: arr<Grant["performance"]["series"][number]>(g.performance?.series).filter((s) => arr(s.points).length > 0),
        },
      } as Grant,
    ];
  });
}

const ORDER: ProviderType[] = ["central", "state", "private", "global"];

const all = normalize([...centralStartup, ...centralSector, ...statesSouthWest, ...statesNorthEast, ...privateGlobal]);
const seen = new Set<string>();

export const GRANTS: Grant[] = all
  .filter((g) => (seen.has(g.slug) ? false : (seen.add(g.slug), true)))
  .sort((a, b) => ORDER.indexOf(a.providerType) - ORDER.indexOf(b.providerType) || (b.maxAmountINR ?? 0) - (a.maxAmountINR ?? 0));

export const GIANTS: Giant[] = arr<Giant>(giantsData).filter((g) => g?.name && g?.source?.url);

export function getGrant(slug: string) {
  return GRANTS.find((g) => g.slug === slug);
}

export function similarGrants(g: Grant, n = 3) {
  const score = (o: Grant) =>
    (o.providerType === g.providerType ? 2 : 0) + (g.state && o.state === g.state ? 3 : 0) + o.stages.filter((s) => g.stages.includes(s)).length;
  return GRANTS.filter((o) => o.slug !== g.slug).sort((a, b) => score(b) - score(a)).slice(0, n);
}

export * from "./labels";
