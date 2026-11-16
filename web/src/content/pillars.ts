// Pillar identity. Keep number/slug/title/color in sync with the pillars insert in
// supabase/migrations/0001_initial_schema.sql.
export type PillarMeta = {
  number: number;
  slug: string;
  title: string;
  /** Short name used on the home folder cards ("Basics of AI"). */
  cardTitle: string;
  /** Folder cover colour; also used for dots and accents. */
  color: string;
  /** Translucent card background behind the folder (fanout-style). */
  cardBg: string;
  tagline: string;
  bullets: [string, string, string];
  /** Pillar overview headline: plain first line, mono second line. */
  lead: [string, string];
  /** Pillar 8 ships after launch; it is listed but marked "Soon". */
  isPublished: boolean;
};

export const PILLAR_META: PillarMeta[] = [
  {
    number: 1,
    slug: "problem",
    title: "Problem",
    cardTitle: "Problem solving",
    color: "#D9826F",
    cardBg: "rgba(219, 162, 146, 0.5)",
    tagline: "Find a problem worth solving.",
    bullets: ["Find and decode real problems", "Customer interviews, done right", "From 20 ideas to one sharp brief"],
    lead: ["Learn to find problems", "worth solving."],
    isPublished: true,
  },
  {
    number: 2,
    slug: "solution",
    title: "Solution",
    cardTitle: "Solution design",
    color: "#E9BE2F",
    cardBg: "rgba(241, 207, 78, 0.5)",
    tagline: "Build the smallest thing that truly solves it.",
    bullets: ["From problem to the smallest MVP", "Validate with real pre-sales", "Business models that fit India"],
    lead: ["Learn to build the", "smallest thing that works."],
    isPublished: true,
  },
  {
    number: 3,
    slug: "market-research",
    title: "Market Research",
    cardTitle: "Market research",
    color: "#7E8A66",
    cardBg: "rgba(138, 149, 115, 0.5)",
    tagline: "Who pays, how much, who supplies, who competes.",
    bullets: ["TAM to landed cost, honestly", "Suppliers, MOQs and negotiation", "Competitors decoded"],
    lead: ["Learn to read a market", "before you spend."],
    isPublished: true,
  },
  {
    number: 4,
    slug: "build-with-ai",
    title: "Build with AI",
    cardTitle: "Basics of AI",
    color: "#6F96BC",
    cardBg: "rgba(127, 162, 195, 0.5)",
    tagline: "Build your business infrastructure yourself.",
    bullets: ["Claude, ChatGPT and Gemini, used well", "Websites and payment gateways", "Automations that run your ops"],
    lead: ["Learn to build your business", "with AI."],
    isPublished: true,
  },
  {
    number: 5,
    slug: "branding",
    title: "Branding",
    cardTitle: "Branding",
    color: "#A866C4",
    cardBg: "rgba(182, 109, 208, 0.5)",
    tagline: "What you stand for, and how you look and sound.",
    bullets: ["Positioning that sticks", "Naming, identity and packaging", "Brands decoded, Rolex to boAt"],
    lead: ["Learn to build a brand", "people remember."],
    isPublished: true,
  },
  {
    number: 6,
    slug: "marketing",
    title: "Marketing",
    cardTitle: "Marketing",
    color: "#C9503A",
    cardBg: "rgba(201, 80, 55, 0.5)",
    tagline: "Get found by the right people, again and again.",
    bullets: ["Organic content that grows", "Meta ads from your first ₹3,000", "Growth loops and retention"],
    lead: ["Learn to get found,", "from zero."],
    isPublished: true,
  },
  {
    number: 7,
    slug: "sales",
    title: "Sales",
    cardTitle: "Sales",
    color: "#1B9EA6",
    cardBg: "rgba(27, 158, 166, 0.5)",
    tagline: "Close revenue through every channel.",
    bullets: ["D2C, B2B, B2G and offline", "Cold outreach to closed deals", "Make your first sale"],
    lead: ["Learn to sell through", "every channel."],
    isPublished: true,
  },
  {
    number: 8,
    slug: "money-and-ops",
    title: "Money & Ops",
    cardTitle: "Money & ops",
    color: "#8F8F8F",
    cardBg: "rgba(149, 149, 149, 0.5)",
    tagline: "Make the numbers work and stay legal.",
    bullets: ["Unit economics and pricing", "Company setup and GST", "Grants, angels and VCs"],
    lead: ["Learn to make the", "numbers work."],
    isPublished: false,
  },
];
