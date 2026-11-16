import fs from "node:fs";
const path = process.argv[2];
const b = JSON.parse(fs.readFileSync(path, "utf8"));
const errs = [];
function walk(o, fn) {
  if (Array.isArray(o)) o.forEach((v, i) => { if (typeof v === "string") o[i] = fn(v); else walk(v, fn); });
  else if (o && typeof o === "object") for (const k of Object.keys(o)) { const v = o[k]; if (typeof v === "string") o[k] = fn(v); else walk(v, fn); }
}
function R(old, nw) {
  let n = 0;
  const f = (s) => { if (s.includes(old)) { n++; return s.split(old).join(nw); } return s; };
  for (const k of Object.keys(b)) { if (k === "factCheck" || k === "sources") continue; if (typeof b[k] === "string") b[k] = f(b[k]); else walk(b[k], f); }
  if (!n) errs.push("NO MATCH: " + old.slice(0, 80));
}
function S(label, url) { const j = b.sources.findIndex((s) => s.url === url); if (j >= 0) return j; b.sources.push({ label, url }); return b.sources.length - 1; }
function A(snippet, ...idx) {
  let n = 0;
  const hit = (x) => { x.src = [...new Set([...(x.src || []), ...idx])]; n++; };
  for (const c of b.chapters) for (const x of c.blocks) {
    if (x.t === "facts" || x.t === "timeline") { for (const it of x.items) if (JSON.stringify(it).includes(snippet)) hit(it); }
    else if (x.src && JSON.stringify(x).includes(snippet)) hit(x);
  }
  if (!n) errs.push("CITE NO MATCH: " + snippet.slice(0, 70));
}

const sMehta = S("US District Court, D.C., United States v. Google LLC, memorandum opinion of Judge Amit Mehta (5 Aug 2024)", "https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1033.0_2.pdf");
const sFTC = S("US Federal Trade Commission press release on Google's $22.5 million penalty (9 Aug 2012)", "https://www.ftc.gov/news-events/news/press-releases/2012/08/google-will-pay-225-million-settle-ftc-charges-it-misrepresented-privacy-assurances-users-apples");
const sTaara = S("X, the moonshot factory: Taara project page", "https://x.company/projects/taara/");
const sBBC = S("BBC News, \"Plans for asteroid mining emerge\" (24 Apr 2012)", "https://www.bbc.com/news/science-environment-17827347");
const sFool = S("The Motley Fool via Yahoo Finance, on Alphabet's early stakes in SpaceX and Anthropic (9 Jul 2026)", "https://finance.yahoo.com/markets/stocks/articles/anthropics-ipo-lead-windfall-profits-092600849.html");

// Mehta: primary source for quote and figures
A("Judge Amit Mehta ruled that Google had broken US antitrust law", sMehta);
for (const c of b.chapters) for (const x of c.blocks) if (x.t === "quote" && x.text.startsWith("Google is a monopolist")) x.src = [sMehta, 155];
A("US Judge Amit Mehta rules that Google illegally kept a search monopoly", sMehta);

// FTC
A("Google pays a $22.5 million civil penalty", sFTC);

// SpaceX $900m second source
A("In 2015 Google invested ==$900 million==", sFool);

// Taara
R("But its laser links for beaming data live on in another project, Taara, which is working with partners to bring cheaper internet to parts of Sub-Saharan Africa.", "But its laser links live on in another project, Taara, inspired by the way Loon connected two balloons. A partner has rolled out Taara's links to more than 50 communities in Africa.");
A("But its laser links live on in another project, Taara", sTaara);

// Planetary Resources: keep only what we could open
for (const c of b.chapters) for (const x of c.blocks) if (x.t === "venture" && x.name === "Planetary Resources") {
  x.decision = "Page backed it from the start, alongside Eric Schmidt and the film director James Cameron. The BBC called them among the founders. He was a funder, not the person running it.";
  x.howStarted = "Details emerged in April 2012: robotic spacecraft would squeeze fuel and metals such as platinum out of asteroids, with a fuel depot in space by 2020. It was based in Redmond, Washington. Scientists called the plan daring, difficult and highly expensive.";
  x.funding = "Billionaire backers, including Page. We found no public figure for his personal share.";
  x.whatHappened = "The mining never happened. After months of financial uncertainty, a blockchain firm, ConsenSys, bought its assets in October 2018. Terms were kept confidential.";
  x.idea = "Mine near-Earth asteroids for the ingredients of rocket fuel and for rare metals.";
  x.src = [79, sBBC];
}

// Playboy: unopened quote
R(" A securities lawyer called this unprecedented.", "");
for (const c of b.chapters) for (const x of c.blocks) if (x.t === "p" && x.text.includes("as Appendix B")) x.src = x.src.filter((i) => i !== 216);

// Earnings calls: no quote we could open
R("In October 2013 he told investors he would stop joining every earnings call, because they needed him to “ruthlessly prioritize my time”. He did not come back.", "In 2013 he stopped joining earnings calls, the quarterly calls where bosses answer investors. He did not come back.");

// Residency: only what we could open
R("His representatives told Forbes he is now a Florida resident, and Forbes's profile lists Miami. But Forbes also could not find updated voter registration or a declaration of domicile, and his spokespeople declined to provide proof. As of mid-October he was still not registered to vote in Florida. Courts may yet test the residency date.", "His representatives told Forbes he has left California, and Forbes's profile lists Miami. But Forbes reported in mid-October that he still was not registered to vote in Florida. California looks at things like time spent in the state and business ties when deciding who counts as a resident, so the date he left could still matter.");
const fl = b.factCheck.disputed.find((x) => x.claim === "Page's Florida residency");
fl.note = "His representatives told Forbes he has left California and Forbes lists Miami, but Forbes reported in October 2026 that he was not registered to vote in Florida. We could read only the opening of those Forbes articles.";

// EU fine: drop what we could not open
R("The EU also fined Google €2.95 billion in September 2025 over similar practices, and Google has said it will appeal.", "The EU also fined Google €2.95 billion in September 2025 over similar practices.");

if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
fs.writeFileSync(path, JSON.stringify(b, null, 2) + "\n");
console.log("ok; sources", b.sources.length);
