// The Graveyard: one researched "autopsy" per failed company.
// File: src/content/graveyard/graves/<slug>.json   (one Grave object)
//
// RULES (the graveyard SOP):
// 1. Every factual claim must be traceable to `sources` (cite by 0-based index in `src`).
// 2. Numbers only from sources. If a number is not published, use null. Never estimate silently.
// 3. Quotes: verbatim only, with a source. Never paraphrase inside quote marks.
// 4. Plain words a Class 11 student understands. Short sentences. No jargon without a one-line
//    explanation in brackets the first time ("burn rate (money lost each month)").
// 5. In `chapters[].body`, `inOneMinute`, `mistakes[].explain` and `killerLine`, wrap the 1–3 most
//    important phrases in **double asterisks**. They render as highlighter marks. Use sparingly.
// 6. Contested or unverifiable claims go in `factCheck.disputed`, never in the story.
// 7. `causes` weights are our editorial analysis (labelled as such on the page), summing to 100.
// 8. Fair to people: say "was charged with" until convicted; separate honest failure from fraud.

export type Cite = number[];

export type CauseKey =
  | "burn" // Spent faster than it could earn or raise
  | "unit-economics" // Lost money on every order / customer
  | "no-market" // Not enough people needed it (or would pay)
  | "business-model" // No clear way to make money
  | "fraud" // Lying to investors, customers or regulators
  | "governance" // Weak controls, founder conduct, conflicts of interest
  | "competition" // A stronger rival won
  | "regulation" // A law, court or regulator ended it
  | "tech" // The product or technology did not work well enough
  | "timing" // Too early, too late, or hit by a downturn
  | "over-expansion" // Grew too fast: cities, products, headcount
  | "funding-dried" // Investors stopped funding (funding winter)
  | "team" // Co-founder fights, key people leaving
  | "focus"; // Too many pivots / lost focus

export type GraveStatus =
  | "shut-down" // Closed by its owners
  | "bankrupt" // Formal bankruptcy / liquidation
  | "insolvent" // In insolvency proceedings
  | "sold-for-parts" // Assets or brand sold for a fraction of peak value
  | "absorbed-and-closed" // Acquired, then shut by the buyer
  | "licence-revoked"; // Regulator stopped the business

export type Grave = {
  slug: string; // kebab-case, equals the file name
  name: string; // display name, e.g. "Byju's"
  region: "india" | "global"; // india = HQ or main market in India
  country: string; // HQ country, e.g. "India", "United States"
  city: string | null;
  sector: string; // short, e.g. "Edtech", "Quick commerce", "Crypto exchange"
  founded: number; // year
  died: number; // year it shut down / was declared bankrupt / was sold for parts
  status: GraveStatus;
  brandColor: string; // hex: the brand's main colour (approximate is fine), used to tint the tombstone
  founders: { name: string; role: string }[];

  // ── The tombstone
  epitaph: string; // ≤ 60 chars, engraved on the stone. Wry but respectful. "Delivered everything except profit."
  oneLiner: string; // what it did, in one plain sentence (≤ 140 chars)
  causeOfDeath: string; // one sentence (≤ 160 chars): the real reason it died

  // ── The money (USD millions; null when not published). Convert INR at the rate of that year and say so in `moneyNote`.
  raisedUsdM: number | null; // total equity + debt raised over its life
  peakValuationUsdM: number | null;
  endValueUsdM: number | null; // sale price at the end, or 0 if it closed with nothing
  moneyNote: string; // one line: how these numbers were sourced / converted
  moneySrc: Cite;

  // ── Read this first
  inOneMinute: string[]; // exactly 3 bullets, ≤ 30 words each, with **highlights**
  killerLine: string; // the single sentence a founder must remember (≤ 140 chars), with **highlights**

  numbers: { value: string; label: string; src: Cite }[]; // exactly 4 headline numbers, e.g. "₹4,588 cr" / "loss in FY22"

  // ── The story, in 4 short chapters: the idea, the rise, the cracks, the fall
  chapters: { title: string; body: string; src: Cite }[]; // body 90–160 words each, with **highlights**

  timeline: { date: string; event: string; kind: "start" | "money" | "peak" | "warning" | "crisis" | "end" | "after"; src: Cite }[]; // 7–12, in order

  // Real data only. Examples: revenue vs loss by year; users by year; funding by year; employees.
  // 1–2 charts. `labels` are the x-axis (years); each series has one value per label (null if unknown).
  // Don't repeat `rounds` here: the page draws them already.
  charts: {
    title: string; // "Revenue vs loss"
    unit: string; // "₹ crore", "$ millions", "million users"
    kind: "bar" | "line";
    labels: string[];
    series: { name: string; values: (number | null)[] }[]; // 1–2 series
    takeaway: string; // one plain line: what this chart proves
    src: Cite;
  }[];

  // Funding rounds, in order. Leave [] if not public (e.g. a subsidiary).
  rounds: { date: string; round: string; amountUsdM: number | null; valuationUsdM: number | null; investors: string[]; src: Cite }[];

  causes: { key: CauseKey; weight: number }[]; // 2–4 entries, weights sum to 100, largest first

  mistakes: { title: string; explain: string; src: Cite }[]; // 3–6, worst first; explain 40–80 words with **highlights**
  warningSigns: string[]; // 4–6 yes/no questions about the reader's OWN startup where YES = danger ("Is headcount growing faster than orders?")
  lessons: { title: string; detail: string }[]; // exactly 5, practical, for a 17–25 year-old founder
  quote: { text: string; who: string; context: string; src: Cite } | null; // verbatim only

  afterlife: { text: string; src: Cite }; // what happened next: buyers, court cases, founders' next act (comebacks!)

  sources: { label: string; url: string }[]; // ≥ 6, reputable (filings, court records, major outlets, founder posts)
  factCheck: { verifiedAt: string; disputed: { claim: string; note: string }[] };
};
