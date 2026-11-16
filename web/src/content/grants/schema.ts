// The Grant SOP, as a type. Every grant on the site fills these fields in this order.
// Human-readable version: ../../../../07-grants-sop.md
//
// Rules:
// - Never invent numbers. Every figure in `performance` carries a source URL and an as-of date.
// - Unknown is a valid answer: use null / "Not published" and say so in `confidenceNote`.
// - Plain words: write for a 17-year-old and a 30-year-old first-time founder.

export type ProviderType = "central" | "state" | "private" | "global";

export type Instrument =
  | "grant"
  | "seed-loan"
  | "convertible"
  | "equity"
  | "fellowship"
  | "credits"
  | "prize"
  | "subsidy"
  | "loan"
  | "guarantee"
  | "tax-benefit"
  | "incubation";

export type Stage = "student" | "idea" | "prototype" | "early-revenue" | "growth";

export type GrantStatus = "open" | "rolling" | "call-based" | "closed" | "unverified";

export type Source = { label: string; url: string };

export type Metric = { label: string; value: string; asOf: string; source: Source };

export type Series = {
  label: string;
  unit: string; // e.g. "startups", "₹ crore", "grantees"
  points: { period: string; value: number }[];
  source: Source;
};

export type Grant = {
  // ── Identity
  slug: string; // kebab-case, unique
  name: string; // official name
  shortName: string; // e.g. "SISFS"
  provider: string; // e.g. "DPIIT, Ministry of Commerce & Industry"
  providerType: ProviderType;
  state: string | null; // for state schemes, e.g. "Karnataka"
  launchedYear: number | null;

  // ── The money, at a glance
  instrument: Instrument[];
  maxAmountINR: number | null; // largest single award in rupees (convert USD at ~₹85 and say so in amountText)
  amountText: string; // e.g. "Up to ₹20 lakh grant + up to ₹50 lakh as convertible debt"
  equity: string; // "None" | "~3% equity" | "Convertible debenture" ...
  duration: string; // support period, e.g. "Disbursed over 12–24 months in milestones"
  timeToMoney: string; // apply → first rupee, e.g. "3–6 months (typical, incubator-dependent)"
  status: GrantStatus;
  deadline: string; // "Rolling" | "Calls twice a year" | "Closed 20 Dec 2025" ...
  stages: Stage[];
  sectors: string[]; // ["Any"] or ["Biotech", "MedTech"]

  // ── The SOP sections
  oneLiner: string; // what it is, in one plain sentence
  what: string; // 2–4 sentences: what it is and what it pays for
  who: string[]; // eligibility, as bullets
  notFor: string[]; // who can't apply / common disqualifiers
  why: string[]; // why get it (reasons a founder should care)
  howItWorks: string; // the mechanism: who evaluates, how money flows
  steps: { title: string; detail: string }[]; // application process, in order
  documents: string[]; // what you need ready
  benefits: string[]; // what you get beyond money too
  pros: string[];
  cons: string[];
  goodFitIf: string[]; // decision helper
  skipIf: string[]; // decision helper
  insiderTips: string[]; // practical tips that improve odds

  // ── Evidence
  performance: {
    summary: string; // how it has performed since launch, plain words
    metrics: Metric[];
    series: Series[]; // time series for charts; empty if no data is published
  };

  // ── Links & trust
  applyUrl: string; // official application page
  officialUrl: string; // official scheme page / guidelines
  sources: Source[];
  lastVerified: string; // ISO date the facts were checked
  confidenceNote: string; // what could not be verified
};
