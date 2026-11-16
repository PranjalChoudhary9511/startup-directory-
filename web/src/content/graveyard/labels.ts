// Display helpers for the Graveyard. No data imports, so client components can use them freely.
import type { CauseKey, Grave, GraveStatus } from "./schema";

export const CAUSES: Record<CauseKey, { label: string; short: string; line: string }> = {
  burn: { label: "Burned through cash", short: "Cash burn", line: "Spent money faster than it could earn or raise it." },
  "unit-economics": { label: "Lost money on every sale", short: "Unit economics", line: "Each order or customer cost more than it brought in." },
  "no-market": { label: "Nobody needed it enough", short: "No market", line: "Too few people wanted it, or wanted to pay for it." },
  "business-model": { label: "No way to make money", short: "Business model", line: "Loved by users, but there was no plan to earn." },
  fraud: { label: "Fraud and lies", short: "Fraud", line: "Someone lied to investors, customers or regulators." },
  governance: { label: "Weak governance", short: "Governance", line: "No checks on the founder, messy books, conflicts of interest." },
  competition: { label: "Beaten by a rival", short: "Competition", line: "A stronger, richer or faster competitor won." },
  regulation: { label: "Law or regulator", short: "Regulation", line: "A court, a law or a regulator ended the business." },
  tech: { label: "The tech didn't work", short: "Technology", line: "The product could not do what was promised, well enough." },
  timing: { label: "Wrong timing", short: "Timing", line: "Too early, too late, or caught in a downturn." },
  "over-expansion": { label: "Grew too fast", short: "Over-expansion", line: "Too many cities, products or people, too soon." },
  "funding-dried": { label: "Funding dried up", short: "Funding winter", line: "Investors stopped writing cheques before it could stand alone." },
  team: { label: "Team fell apart", short: "Team", line: "Co-founder fights or key people leaving." },
  focus: { label: "Lost focus", short: "Focus", line: "Too many pivots, too many bets, no core." },
};

export const CAUSE_ORDER = Object.keys(CAUSES) as CauseKey[];

type Kind = Grave["timeline"][number]["kind"];

/** Timeline moments: label, dot colour, and spike height on the heartbeat. */

export const KIND: Record<Kind, { label: string; color: string; amp: number }> = {
  start: { label: "Started", color: "#6e6e6e", amp: 26 },
  money: { label: "Money in", color: "#2a78d6", amp: 46 },
  peak: { label: "Peak", color: "#0f9d58", amp: 70 },
  warning: { label: "Warning", color: "#c98500", amp: 22 },
  crisis: { label: "Crisis", color: "#d9480f", amp: 34 },
  end: { label: "The end", color: "#b42318", amp: 12 },
  after: { label: "After", color: "#929292", amp: 0 },
};

export const STATUS: Record<GraveStatus, string> = {
  "shut-down": "Shut down",
  bankrupt: "Bankrupt",
  insolvent: "In insolvency",
  "sold-for-parts": "Sold for parts",
  "absorbed-and-closed": "Bought, then closed",
  "licence-revoked": "Stopped by regulator",
};

/** The light shape sent to the cemetery (client). */
export type GraveCard = Pick<
  Grave,
  | "slug"
  | "name"
  | "region"
  | "country"
  | "sector"
  | "founded"
  | "died"
  | "status"
  | "brandColor"
  | "epitaph"
  | "oneLiner"
  | "causeOfDeath"
  | "raisedUsdM"
  | "peakValuationUsdM"
> & { cause: CauseKey; causes: CauseKey[] };

export function toCard(g: Grave): GraveCard {
  const causes = [...g.causes].sort((a, b) => b.weight - a.weight).map((c) => c.key);
  return {
    slug: g.slug,
    name: g.name,
    region: g.region,
    country: g.country,
    sector: g.sector,
    founded: g.founded,
    died: g.died,
    status: g.status,
    brandColor: g.brandColor,
    epitaph: g.epitaph,
    oneLiner: g.oneLiner,
    causeOfDeath: g.causeOfDeath,
    raisedUsdM: g.raisedUsdM,
    peakValuationUsdM: g.peakValuationUsdM,
    cause: causes[0],
    causes,
  };
}

/** $ millions → "$1.2B" / "$340M" / "$800K". */
export function usd(m: number | null | undefined) {
  if (m === null || m === undefined) return "Undisclosed";
  if (m === 0) return "$0";
  if (m >= 1000) return `$${(m / 1000).toFixed(m >= 10000 ? 0 : 1).replace(/\.0$/, "")}B`;
  if (m >= 1) return `$${Math.round(m)}M`;
  return `$${Math.round(m * 1000)}K`;
}

/** Splits "**marked**" text into plain and highlighted runs. */
export function marks(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((t) => (t.startsWith("**") ? { hi: true, t: t.slice(2, -2) } : { hi: false, t }));
}

export const plain = (text: string) => text.replace(/\*\*/g, "");

/** Deterministic 0..1 from a string, so every stone keeps its shape and tilt across renders. */
export function seeded(s: string, salt = 0) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}
