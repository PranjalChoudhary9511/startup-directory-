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
R("He became a professor of computer science and artificial intelligence at Michigan State University.", "He went on to teach computer science and AI at Michigan State University.");
R("In a 2000 interview he said his father was willing to spend all his available income on buying a computer.", "In a 2000 interview he said his father would put all the money he could spare into buying one.");
R("he often came out with ideas that bordered on the fantastic.", "he often came out with ideas that sounded close to fantasy.");
R("He kept thinking about what things could be built and how to build them.", "He kept wondering what could be built, and how.");
R("The team designed a solar-powered car that raced in the ==1993 World Solar Challenge==.", "The team's solar-powered car competed in the ==1993 World Solar Challenge==.");
R("At Michigan he wrote a business plan for a company that would use software to build a music synthesiser, mixing his engineering with his music.", "At Michigan he planned a company whose software would act as a music synthesiser, mixing his engineering with his music.");
R("His first thought: what if we could download the whole web, and just keep the links?", "His first thought, in his own words: “what if we could download the whole web, and just keep the links”.");
R("When they needed storage, they maxed out three credit cards buying hard disks off the back of a truck.", "When they needed storage, in Larry's words, they “maxed out three credit cards buying hard disks off the back of a truck.”");
R("That charge meant Google expected to post a loss in its first quarter as a public company.", "That charge meant Google expected to lose money in its first quarter on the stock market.");
R("Is this something you will use once or twice a day, and does it make your life better?", "Will people reach for it once or twice a day, and will it improve their lives?");
R("California looks at things like time spent in the state and business ties when deciding who counts as a resident, so the date he left could still matter.", "California judges residency partly by how much time you spend there and what business ties you keep, so the date he left could still matter.");
R("His \"do not delegate\" rule also died.", "His rule against delegating also died.");
b.factCheck.method = "Four writers researched this book in parallel, one on the profile and contact card and three on the chapters, working from filings, court papers, Page's own speeches and letters, and established press. An independent fact-checker then downloaded about 200 of the cited pages, machine-matched every quotation and most figures against the cited text, read the filings and the search-monopoly opinion directly, opened the contact details and social links, and confirmed every photo's author and licence through the Commons API, correcting or removing what failed. Softer narrative details were spot-checked rather than each re-read, and many pages at Reuters, NYT, Bloomberg, AP, FT, Forbes and Ars Technica block automated readers, so those were read only through a page reader, often just the opening section, or confirmed through another source; the search tools ran out before the check closed, so a few leads were cut rather than chased. Forbes figures move daily and are dated, and California's 3 November 2026 vote on Proposition 40 had no result when this check closed.";
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
fs.writeFileSync(path, JSON.stringify(b, null, 2) + "\n");
console.log("ok");
