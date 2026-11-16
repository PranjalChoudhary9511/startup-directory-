// Display helpers shared by server and client components. No data imports here,
// so client components can use these without bundling the grants dataset.
import type { Grant } from "./schema";

/** Indian-notation money: ₹1.5 Cr, ₹20 L, ₹10,000. */
export function formatINR(n: number | null): string {
  if (n === null) return "Varies";
  if (n >= 1e7) return `₹${+(n / 1e7).toFixed(n % 1e7 ? 1 : 0)} Cr`;
  if (n >= 1e5) return `₹${+(n / 1e5).toFixed(n % 1e5 ? 1 : 0)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export const PROVIDER_LABEL: Record<Grant["providerType"], string> = {
  central: "Central govt",
  state: "State govt",
  private: "Private · India",
  global: "Global",
};

export const STATUS_LABEL = {
  open: "Open",
  rolling: "Rolling",
  "call-based": "Call-based",
  closed: "Closed",
  unverified: "Unverified",
} as const;

export const INSTRUMENT_LABEL: Record<string, string> = {
  grant: "Grant",
  "seed-loan": "Seed loan",
  convertible: "Convertible",
  equity: "Equity",
  fellowship: "Fellowship",
  credits: "Credits",
  prize: "Prize",
  subsidy: "Subsidy",
  loan: "Loan",
  guarantee: "Guarantee",
  "tax-benefit": "Tax benefit",
  incubation: "Incubation",
};

export const STAGE_LABEL: Record<string, string> = {
  student: "Student",
  idea: "Idea",
  prototype: "Prototype",
  "early-revenue": "Early revenue",
  growth: "Growth",
};

/** True when the founder keeps all equity. */
export function isEquityFree(g: Pick<Grant, "equity">) {
  return /^(none|no equity|non-dilutive)/i.test(g.equity.trim());
}

/** The light shape sent to client components (cards, filters). */
export type GrantCard = Pick<
  Grant,
  "slug" | "name" | "shortName" | "provider" | "providerType" | "state" | "instrument" | "maxAmountINR" | "amountText" | "equity" | "status" | "stages" | "sectors" | "oneLiner" | "deadline" | "launchedYear" | "lastVerified"
>;

export function toCard(g: Grant): GrantCard {
  const { slug, name, shortName, provider, providerType, state, instrument, maxAmountINR, amountText, equity, status, stages, sectors, oneLiner, deadline, launchedYear, lastVerified } = g;
  return { slug, name, shortName, provider, providerType, state, instrument, maxAmountINR, amountText, equity, status, stages, sectors, oneLiner, deadline, launchedYear, lastVerified };
}
