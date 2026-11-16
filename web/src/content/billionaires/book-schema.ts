// Billion Dollar PDFs: one researched, fact-checked "book" per billionaire.
// File: src/content/billionaires/books/<forbes-uri>.json   (one Book object)
// Built from research fragments by `node scripts/merge-book.mjs <slug>`, validated by
// `node scripts/check-books.mjs <slug> [--online]`.
//
// RULES (the book SOP):
// 1. Every factual sentence is traceable to `sources` (cite by index in `src`). Reddit, forums
//    and social posts may be used as leads only. A claim needs a reliable source: filings, court
//    records, the person's own interviews or letters, books, or established press.
// 2. Contact: only channels the person or their company has published themselves. That means
//    company HQ switchboards, press/IR emails, official forms, and verified social accounts.
//    Never personal phone numbers, personal emails, home addresses, leaked or guessed contacts.
// 3. Photos: Wikimedia Commons only, free licences only, with exact author + licence.
// 4. Quotes: verbatim with a source; never paraphrase inside quote marks.
// 5. Personal life: only what is public and relevant to how they built their life and work.
//    No speculation about health, relationships or children beyond established reporting.
// 6. Plain words for a 17-year-old. Story first, then the lesson. Contested claims go in
//    `factCheck.disputed`, never stated as fact.
//
// Inline markup allowed in any `text`: **bold**, __hand-underlined key insight__, ==highlighter==.

export type Cite = number[]; // indexes into `sources`

export type Photo = {
  url: string; // upload.wikimedia.org
  page: string; // Commons File: page
  caption: string;
  author: string;
  license: string;
  year: number | null;
};

export type Block =
  | { t: "p"; text: string; src: Cite } // a paragraph of the story
  | { t: "h"; text: string } // a bold serif sub-heading inside a chapter
  | { t: "note"; text: string } // handwritten margin note: our voice to the reader, ≤ 14 words
  | { t: "quote"; text: string; who: string; src: Cite }
  | { t: "facts"; items: { value: string; label: string; src: Cite }[] } // 2–4 key numbers
  | { t: "timeline"; items: { when: string; text: string; src: Cite }[] } // 3–8 dated beats
  | { t: "example"; text: string; src: Cite } // "For example:" a concrete scene or number
  | { t: "photo"; photo: Photo }
  | {
      t: "venture"; // one company or project, including the ones that failed
      name: string;
      years: string;
      outcome: "failed" | "shut" | "sold" | "merged" | "pivoted" | "running" | "public";
      idea: string;
      decision: string; // why they chose to do it, and the decision points
      howStarted: string;
      funding: string; // where the first money came from
      whatHappened: string;
      lesson: string;
      src: Cite;
    }
  | { t: "lesson"; title: string; text: string }; // numbered "straight-forward" lesson

export type Chapter = {
  id: string; // kebab-case, unique in the book
  kicker: string; // "Chapter 1" style label, e.g. "Ages 0–17"
  title: string; // handwritten chapter title, short
  blocks: Block[];
};

export type Social = {
  platform: "x" | "linkedin" | "instagram" | "facebook" | "youtube" | "threads" | "telegram" | "tiktok" | "weibo" | "website" | "other";
  handle: string;
  url: string;
  whose: string; // "Elon Musk (personal, verified)" / "Tesla (company)"
  src: Cite;
};

export type Channel = {
  kind: "phone" | "email" | "form" | "address" | "website" | "whatsapp";
  label: string; // "Investor relations", "Press", "Head office switchboard"
  value: string; // the number / address / email / url as published
  url: string | null; // link to dial / mail / open, if any
  whose: string; // the organisation that publishes it
  src: Cite;
};

export type Book = {
  slug: string; // Forbes real-time list uri, e.g. "elon-musk"
  name: string;
  verifiedAt: string; // ISO date of the last fact-check pass
  title: string; // handwritten cover title (our words), e.g. "The Man Who Bet Everything Twice"
  subtitle: string; // one line under the title
  hook: string; // the most surprising true fact, opening the book
  hookSrc: Cite;
  portrait: Photo | null;
  photos: Photo[]; // 0–8 more photos, used through the book
  glance: { label: string; value: string; src: Cite }[]; // 6–10 "at a glance" facts (born, studied, first job…)
  contact: {
    howToReach: string; // practical advice: which channel actually gets read, and how to write
    channels: Channel[];
    socials: Social[];
  };
  chapters: Chapter[];
  lessons: { title: string; text: string }[]; // 10–15 closing "straight-forward business lessons"
  sources: { label: string; url: string }[];
  factCheck: { method: string; disputed: { claim: string; note: string }[] };
};

// A research fragment: any subset of Book fields, with its own local `sources` list.
// merge-book.mjs re-numbers every `src` into one combined list.
export type Fragment = Partial<Omit<Book, "sources">> & { sources: Book["sources"] };
