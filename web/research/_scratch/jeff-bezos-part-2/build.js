// Assembles part-2.json: resolves source keys to indexes, validates the schema rules, reports word count.
const fs = require("fs");
const path = require("path");
const cat = require("./sources.js");
const ch1 = require("./ch1.js");
const { firstMoney, nearDeath } = require("./ch2.js");
const { bigBets, fortune } = require("./ch3.js");

const OUT = path.resolve(__dirname, "../../billionaires/jeff-bezos/part-2.json");
const chapters = [ch1, firstMoney, nearDeath, bigBets, fortune];

const used = new Map();
const sources = [];
const idx = (k) => {
  if (!cat[k]) throw new Error("Unknown source key: " + k);
  if (!used.has(k)) { used.set(k, sources.length); sources.push({ label: cat[k][0], url: cat[k][1] }); }
  return used.get(k);
};
const res = (o) => { if (o.src) o.src = [...new Set(o.src)].map(idx); };

const problems = [];
let words = 0;
const wc = (s) => (s ? s.trim().split(/\s+/).length : 0);
let ventures = 0, notes = 0;

for (const c of chapters) {
  let run = 0, maxRun = 0;
  for (const b of c.blocks) {
    if (b.t === "p") { run++; maxRun = Math.max(maxRun, run); } else if (b.t !== "h") run = 0;
    res(b);
    if (b.items) b.items.forEach(res);
    switch (b.t) {
      case "p": case "example": case "quote": case "note": case "h": words += wc(b.text); break;
      case "facts":
        if (b.items.length < 2 || b.items.length > 4) problems.push("facts size " + b.items.length);
        b.items.forEach((i) => (words += wc(i.value) + wc(i.label)));
        break;
      case "timeline":
        if (b.items.length < 3 || b.items.length > 8) problems.push("timeline size " + b.items.length);
        b.items.forEach((i) => (words += wc(i.when) + wc(i.text)));
        break;
      case "venture": {
        ventures++;
        for (const f of ["name", "years", "outcome", "idea", "decision", "howStarted", "funding", "whatHappened", "lesson"]) {
          if (!b[f]) problems.push("venture " + b.name + " missing " + f);
          words += wc(b[f]);
        }
        if (!["failed", "shut", "sold", "merged", "pivoted", "running", "public"].includes(b.outcome)) problems.push("bad outcome " + b.name);
        break;
      }
    }
    if (b.t === "note") { notes++; if (wc(b.text) > 14) problems.push("note too long: " + b.text); }
    if (b.t === "p" && !b.src.length && !/__/.test(b.text)) problems.push("p without src: " + b.text.slice(0, 60));
    if (b.t === "p") {
      const n = (b.text.match(/[.!?](\s|$|_)/g) || []).length;
      if (n > 6) problems.push("long p (" + n + "): " + b.text.slice(0, 60));
    }
    if (b.t === "quote" && wc(b.text) >= 15) problems.push("quote too long");
  }
  if (maxRun > 4) problems.push(c.id + ": " + maxRun + " paragraphs in a row");
}

const factCheck = {
  method: "Written from sources read on 3 November 2026. The core funding history comes from Amazon's 1997 Form S-1 as hosted on Amazon's investor-relations CDN; other money figures come from Amazon press releases, Bezos's 2020 statement to Congress, a Lehman Brothers report, Tony Hsieh's own Inc. essay and established press (Reuters, AP, BBC, CNBC, Forbes, Bloomberg, WIRED, The New Yorker, NYT, Economic Times, Mint). Where a page was paywalled or refused automated reading, only the text returned by search was used; this applies to several Forbes, Bloomberg, GeekWire and WSJ-derived figures, which are worth a manual check. SEC EDGAR refused a direct automated request, so filings are cited through Amazon's own copies, apart from one 2000 Form 8-K whose text came back in search results. Brad Stone's books are used only through press accounts and excerpts, never pirated copies. Sums and per-share figures marked 'our arithmetic' or 'by our arithmetic' are our own calculations from sourced inputs. Bezos's and others' words are paraphrased in our own words, with one short verbatim quote; single terms such as Amazon.bomb, Ouch and Get Big Fast are given as names. Reddit, forums and social posts were not used as sources. Share price is the 30 October 2026 close, the latest we could verify. Weakest single sourcing, for the fact-checker: the end date of Dash buttons (StartupTalky only); Kozmo's 2001 closure and the IPO-size arithmetic (Atticus Li, who cites filings); AWS's 2015 profit figure (GeekWire search text only).",
  disputed: [
    { claim: "How many meetings it took to raise Amazon's first $1 million.", note: "Bezos's 2020 statement to Congress says more than 50; CNBC, citing Brad Stone, says about 60 meetings with about 20 yeses. We use his own sworn-hearing figure. Investor counts vary between about 20 and 22." },
    { claim: "Amazon's pre-money valuation in the angel round.", note: "Alberg recalled $6 million with Bezos refusing to lower it (GeekWire). Stone's account, summarised by Commoncog, has Eric Dillon negotiating it to $5 million. Both are reported with attribution." },
    { claim: "Bezos's stake at the IPO.", note: "The March 1997 S-1 says 43.1%, based on selling 2.5 million shares. The final deal sold 3 million, giving about 41% by our arithmetic, using the 23.86 million outstanding shares reported by a secondary source. We say 'about 41 percent' and flag the S-1 draft figure. We did not read the final 424B1 directly." },
    { claim: "The February 2000 European bond amount.", note: "Stone (via Commoncog) gives $672 million at 6.9%; a filings-based secondary source gives EUR 690 million at 6.875%. These are probably the same deal in different currencies." },
    { claim: "Amazon's peak share price in the bubble.", note: "Bezos told Congress $116. Commoncog says $113 on 9 December 1999. Atticus Li gives about $107 on a closing, split-adjusted basis. Intraday, closing and adjustment methods differ. We use Bezos's figure and attribute it." },
    { claim: "Ravi Suria's age in June 2000.", note: "Commoncog says 28, Atticus Li says 29. We write 'young'." },
    { claim: "Price paid for Junglee.", note: "Reports range from $173.2 million (WIRED, at the prior day's close) and $180 million (WSJ abstract) through about $200 million (Forbes India) and $240 million (Economic Times) to $250 million in other accounts. All agree on about 1.6 million shares, so we give the share count." },
    { claim: "Size and pricing of Bezos's 1998 Google investment.", note: "Ken Auletta reported $250,000 at four cents a share; AllThingsD notes earlier reports of $100,000 and six cents; CNBC in 2017 wrote $1 million; Forbes says an 'estimated' $250,000. Other accounts differ on whether the other angels invested equal sums. We use $250,000 as reported. Amazon has not confirmed what he later did with the shares." },
    { claim: "Where Bezos met Page and Brin.", note: "Auletta via AllThingsD says a Menlo Park garage; a podcast account says Shriram's house. We follow Auletta." },
    { claim: "Blue Origin's valuation in the 2026 round.", note: "CNBC, citing the WSJ, and PitchBook via Nairametrics report $140 billion; Forbes uses $130 billion. Blue Origin's CEO did not confirm numbers." },
    { claim: "Bezos's Prometheus stake.", note: "Bloomberg assumes about 35%, explicitly from its own assumptions about founder splits and investment. A secondary French report attributes about 20% to Forbes. Neither is disclosed by the company." },
    { claim: "Price of Zappos.", note: "About $1.2 billion at closing because Amazon's stock rose (Investopedia, Forbes); a GeekWire list gives $928 million from the original announcement. We report the closing value." },
    { claim: "Price of Ring and Twitch.", note: "Forbes lists Ring at $839 million while Bloomberg and others reported about $1 billion. Twitch is commonly given as $970 million, while The Seattle Times says the filing penciled out to about $840 million. We say 'reported'." },
    { claim: "Fire Phone sales of 35,000.", note: "This is an outside estimate reported by The Guardian, not an Amazon figure. Amazon never disclosed sales." },
    { claim: "Who started the voice-computer project that became Alexa.", note: "Brad Stone (WIRED excerpt) has Bezos sketching it on a whiteboard in early 2011 and giving it to Greg Hart. The New Yorker, via CNBC and GeekWire, ties the moment to a Fire Phone software demo with Ian Freed. Both are given with attribution; the accounts may describe different stages." },
    { claim: "Amazon Marketplace's start date.", note: "Sources agree Auctions came in March 1999 and zShops later that year, but we did not verify an exact primary date for the Marketplace launch, so we do not state one." },
  ],
};

const book = { chapters, sources, factCheck };
fs.writeFileSync(OUT, JSON.stringify(book, null, 2) + "\n", "utf8");
console.log("written", OUT);
console.log({ chapters: chapters.length, words, ventures, notes, sources: sources.length });
console.log("unused sources:", Object.keys(cat).filter((k) => !used.has(k)).join(", ") || "none");
console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "no schema problems");
