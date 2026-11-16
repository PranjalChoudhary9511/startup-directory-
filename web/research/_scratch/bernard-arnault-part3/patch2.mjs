import { readFileSync, writeFileSync } from "node:fs";
const after = {
  "ch1.mjs": [
    ["even when he thinks they are wrong.\", \"legend\", \"wsj23\"),", "n(\"Ninety minutes. An iPad. Five children. Imagine preparing for that lunch.\"),"],
    ["and that side of the story deserves equal space.\", \"toledano\"),", "n(\"Quick decisions are a start-up's edge. He kept his at 200,000 people.\"),"],
  ],
  "ch3.mjs": [
    ["and came to dinner whenever he was in Paris.\", \"legend\"),", "n(\"He bought Basquiat because he couldn't afford Warhol. Limits can sharpen your eye.\"),"],
  ],
  "ch4.mjs": [
    ["greeted their sympathy with “Two to zero.”\", \"wwdtexas\", \"legend\", \"wwdlegend\"),", "n(\"Same man, two countries. Home is rarely your easiest audience.\"),"],
  ],
  "ch5.mjs": [
    ["\"hsf\", \"lvmhhermes\", \"fashionlaw\"),", "n(\"Legal step by step isn't the same as safe. Regulators judge the whole picture.\"),"],
  ],
  "ch6.mjs": [
    ["he is backing his view with his own money.__\", \"vogueagm\", \"fuagm\", \"bafrica\", \"bofagm\"),", "q(\"You just need to be patient. In business, in fact, you always have to be patient.\", \"Bernard Arnault, to shareholders, April 2026, as reported by Vogue\", \"vogueagm\"),"],
    ["such as the new Louis Vuitton stores in Beijing and Seoul.\", \"q3call\", \"h126\", \"letter\"),", "n(\"Sell the side bets. Back the stars. Same move he made in 2002.\"),"],
  ],
};
for (const [file, list] of Object.entries(after)) {
  const path = new URL(file, import.meta.url);
  let s = readFileSync(path, "utf8");
  for (const [a, b] of list) {
    if (!s.includes(a)) { console.log("MISS", file, a.slice(0, 70)); continue; }
    s = s.replace(a, a + "\n    " + b);
  }
  writeFileSync(path, s, "utf8");
}
