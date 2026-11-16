// Second pass: Dash source and an honest method note. Each old string must occur exactly once.
const fs = require("fs");
const path = require("path");
const edits = {
  "sources.js": [
    [`  insidePhil: [`, `  startuptalky: ["StartupTalky, Anamika Mahapatra and Apoorva Bajj (21 Mar 2025): List of Amazon failed products (secondary, used only for the end of Dash buttons)", "https://startuptalky.com/amazon-failed-products/"],\n  insidePhil: [`],
  ],
  "ch1.js": [
    [`}, "fool17", "street", "yahooFail", "biFailed", "halo", "kill"),`, `}, "fool17", "street", "yahooFail", "biFailed", "halo", "kill", "startuptalky"),`],
  ],
  "build.js": [
    [`SEC EDGAR refused automated reading, so filings are cited through Amazon's own copies.`, `SEC EDGAR refused a direct automated request, so filings are cited through Amazon's own copies, apart from one 2000 Form 8-K whose text came back in search results.`],
    [`Share price is the 30 October 2026 close, the latest we could verify.`, `Share price is the 30 October 2026 close, the latest we could verify. Weakest single sourcing, for the fact-checker: the end date of Dash buttons (StartupTalky only); Kozmo's 2001 closure and the IPO-size arithmetic (Atticus Li, who cites filings); AWS's 2015 profit figure (GeekWire search text only).`],
  ],
};
for (const [file, list] of Object.entries(edits)) {
  const fp = path.join(__dirname, file);
  let txt = fs.readFileSync(fp, "utf8");
  for (const [a, b] of list) {
    const n = txt.split(a).length - 1;
    if (n !== 1) throw new Error(file + ": expected 1 match, found " + n + " for: " + a.slice(0, 70));
    txt = txt.replace(a, () => b);
  }
  fs.writeFileSync(fp, txt, "utf8");
}
console.log("patched");
