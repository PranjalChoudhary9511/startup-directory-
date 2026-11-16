// Brand notes: one set of immersive notes per company (shared by all of its videos).
// File: src/content/stories/notes/<company-slug>.json   (one BrandNotes object)
//
// RULES (the notes SOP):
// 1. Every factual claim must be traceable to `sources` (cite by index in `src`).
// 2. Photos: Wikimedia Commons only, free licences only (PD, CC0, CC BY, CC BY-SA), with the
//    exact author + licence from the Commons file page. No other web photos. No logos.
// 3. Quotes: only verbatim quotes with a source. Never paraphrase inside quote marks.
// 4. Video moments: only timestamps the creator published (video chapters / description).
// 5. Plain words for a Class 11 student. Short sentences. Visual first, words second.
// 6. Contested or unverifiable claims go in `factCheck.disputed`, not in the story.

export type Cite = number[]; // indexes into `sources`

export type Photo = {
  url: string; // upload.wikimedia.org URL (a thumb ~800–1200px wide is fine)
  page: string; // the Commons file page URL
  caption: string;
  author: string; // as stated on Commons
  license: string; // e.g. "CC BY-SA 4.0", "Public domain"
  year: number | null;
};

export type BrandNotes = {
  slug: string; // must equal the company slug in the Stories data
  company: string;
  verifiedAt: string; // ISO date of the last fact-check pass

  // ── Brand identity (used to theme the notes page)
  palette: {
    primary: string; // dominant brand colour, hex
    secondary: string; // second brand colour, hex
    accent: string; // highlight colour, hex
    ink: string; // dark text colour that works on `paper`
    paper: string; // light background in the brand's mood, hex
    note: string; // one line: where these colours come from
  };
  tagline: string; // the one-line essence (our words, not their slogan)
  hook: string; // the opening line of the notes; a "wow" fact, cited
  hookSrc: Cite;

  // ── The people around the founder: co-founders, partners, key figures (0–4)
  cast: { name: string; role: string; photo: Photo | null; src: Cite }[];

  // ── The founder (the heart of the notes)
  founder: {
    name: string;
    role: string; // "Founder, Rolex" / "Co-founder & CEO"
    born: string; // "22 Mar 1881, Kulmbach, Germany"
    died: string | null;
    portrait: Photo | null;
    photos: Photo[]; // more photos of the founder / early company (0–4)
    background: string; // 3–5 sentences: family, childhood, money, schooling
    backgroundSrc: Cite;
    // Every job, attempt, failure and turning point in order: the career "life map".
    journey: { year: string; kind: "life" | "job" | "attempt" | "failure" | "breakthrough" | "now"; title: string; detail: string; src: Cite }[];
    mindset: { idea: string; explain: string; src: Cite }[]; // 3–5 ways the founder thought
    habits: { habit: string; detail: string; src: Cite }[]; // how they managed time / worked (only if sourced)
    darkestHour: { title: string; story: string; src: Cite }; // the worst moment and how they got through
    genuineness: { story: string; src: Cite } | null; // a sourced story showing character/integrity
    now: string; // what the founder is doing now (or legacy if deceased), cited
    nowSrc: Cite;
  };

  // ── The company
  numbers: { value: string; label: string; asOf: string; src: Cite }[]; // 4–6 headline numbers
  milestones: { year: string; title: string; detail: string; src: Cite }[]; // 6–12, company timeline
  howItMakesMoney: { summary: string; flows: { from: string; to: string; what: string }[]; src: Cite };
  failures: { year: string; title: string; whatHappened: string; lesson: string; src: Cite }[]; // 2–4
  mythVsFact: { myth: string; fact: string; src: Cite }[]; // 1–3
  quotes: { text: string; who: string; src: Cite }[]; // 2–4 verbatim, sourced
  lessons: { title: string; detail: string }[]; // exactly 5, for a young founder
  moments: { youtubeId: string; at: number; label: string }[]; // creator chapters only; may be []

  sources: { label: string; url: string }[];
  factCheck: { method: string; disputed: { claim: string; note: string }[] };
};
