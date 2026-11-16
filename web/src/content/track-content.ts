// Written notes, tasks and checks for tracks, keyed by "<pillar-slug>/<track-slug>".
// Tracks without an entry render their outline and a "notes in production" state.
// Move to MDX or a CMS once non-developers write content (see 04-website-spec.md).

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string };

export type NoteSection = { heading: string; blocks: NoteBlock[] };

export type TrackContent = {
  videoMinutes: number;
  readMinutes: number;
  taskMinutes: number;
  learn: string;
  sections: NoteSection[];
  task: { title: string; steps: string[]; dossier: string };
  quiz: QuizQuestion[];
  sources: { label: string; href?: string }[];
  /** Facts that must be checked against primary sources before publishing. */
  needsFactCheck?: boolean;
};

export const TRACK_CONTENT: Record<string, TrackContent> = {
  "problem/01-01": {
    videoMinutes: 18,
    readMinutes: 6,
    taskMinutes: 30,
    needsFactCheck: true,
    learn: "How to tell an idea from a problem, and a three-question test to run on every startup idea you ever have.",
    sections: [
      {
        heading: "The core idea",
        blocks: [
          { type: "p", text: "An idea is a solution looking for someone to care. A problem is a pain that already exists, whether or not you ever show up." },
          { type: "p", text: "Most first-time founders start from the wrong end: “wouldn’t it be cool if…” instead of “people are suffering because…”. Founders rarely fail because they can’t build. They fail because they build something nobody desperately needed." },
        ],
      },
      {
        heading: "The Three-P Check",
        blocks: [
          {
            type: "table",
            head: ["Check", "Question", "Red flag"],
            rows: [
              ["People", "Can you name 10 specific people who have this problem?", "“Everyone”"],
              ["Pain", "What do they do today to cope?", "“Nothing”"],
              ["Pay", "Do they already spend time or money on a workaround?", "No workaround exists"],
            ],
          },
          { type: "callout", title: "Rule of thumb", text: "If an idea fails the Three-P Check, it isn’t a startup yet. It’s a hobby." },
        ],
      },
      {
        heading: "Story: Juicero vs Zomato",
        blocks: [
          { type: "p", text: "Juicero raised roughly $120 million for a Wi-Fi connected press that squeezed juice from proprietary packs. In 2017, reporters showed the packs could be squeezed by hand with much the same result. The company shut down within months. The engineering was impressive; the problem wasn’t real." },
          { type: "p", text: "In 2008, Deepinder Goyal, then a consultant at Bain & Company in India, noticed colleagues struggling to find menus for nearby restaurants. He and his co-founder collected menu cards and put them online as Foodiebay. The pain was small but daily, and people already spent time on a bad workaround. Foodiebay became Zomato, which listed publicly in 2021." },
          { type: "callout", title: "The contrast", text: "Juicero started with a machine and went looking for a problem. Zomato started with a menu card and let the solution grow out of the problem." },
        ],
      },
      {
        heading: "Worked example: the tiffin idea",
        blocks: [
          { type: "p", text: "Idea: “an app for ordering home-cooked tiffins”. Turn it into a problem:" },
          {
            type: "list",
            items: [
              "People: first-year IT employees in Hinjewadi, Pune, who moved from another state and live in PGs.",
              "Pain: they eat out, spend a lot, miss home food, and some fall sick.",
              "Pay: they already pay home cooks over WhatsApp, with irregular quality and no backup when the cook is away.",
            ],
          },
          { type: "p", text: "Now it’s specific, painful and already paid for. Your first version might not even be an app: a WhatsApp group with three reliable cooks. 40 customers × ₹3,000/month = ₹1.2 lakh/month." },
        ],
      },
      {
        heading: "Mistakes to avoid",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "“Everyone has this problem.” If it’s everyone, it’s no one. Name ten real people.",
              "Asking friends if they like your idea. They’ll be nice. Ask what they did the last time they faced the problem.",
              "Falling in love with the technology. Describe the problem without mentioning your product.",
            ],
          },
        ],
      },
    ],
    task: {
      title: "Turn your ideas into problems",
      steps: [
        "Write down every startup idea you’ve ever had.",
        "Rewrite each one as a problem: who is suffering, what they do today, what it costs them.",
        "Run the Three-P Check on each. Keep only the ones that pass.",
      ],
      dossier: "Your filtered list is page one of your Founder Dossier.",
    },
    quiz: [
      {
        question: "A friend says: “I want to build an AI app that plans your whole week.” What’s the best first question to ask?",
        options: [
          "Which AI model will you use?",
          "Who specifically struggles to plan their week, and what do they do about it today?",
          "How will you raise funding?",
          "What will the logo look like?",
        ],
        answerIndex: 1,
        explanation: "That question tests People and Pain. Model choice, funding and logos are solution details that come later.",
      },
      {
        question: "Which signal is the strongest evidence of a real problem?",
        options: [
          "50 friends liked your Instagram poll",
          "People say “that’s a cool idea”",
          "People already pay for an imperfect workaround",
          "A big company hasn’t built it yet",
        ],
        answerIndex: 2,
        explanation: "Existing spending on a bad workaround passes the Pay check. Likes and compliments cost nothing.",
      },
      {
        question: "Why did Juicero fail the Three-P Check?",
        options: [
          "The machine was poorly engineered",
          "It was too cheap",
          "The pain it solved was barely there: the packs could be squeezed by hand",
          "It launched in the wrong city",
        ],
        answerIndex: 2,
        explanation: "The product worked; the problem didn’t exist at the price people were asked to pay.",
      },
    ],
    sources: [
      { label: "Book: The Mom Test, Rob Fitzpatrick" },
      { label: "Juicero and Zomato facts: verify against primary reporting before publishing" },
    ],
  },
};

export function getTrackContent(pillarSlug: string, trackSlug: string): TrackContent | undefined {
  return TRACK_CONTENT[`${pillarSlug}/${trackSlug}`];
}
