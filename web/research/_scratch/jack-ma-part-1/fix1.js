const fs = require("fs");
const f = process.argv[2];
let s = fs.readFileSync(f, "utf8");
const R = [
["Fighting for friends at nine. Eighteen people will follow him into a flat later.", "Fighting for friends as a kid. Eighteen people later followed him into a flat."],
["He was also, at home in the evenings and on his own, teaching himself. There were no English books around and nowhere to take classes. So he went to where the English was.", "So he taught himself. There were no English books around and nowhere to take classes. He went to where the English was."],
["Most of them passed through one hotel by West Lake, the Hangzhou Hotel, where Nixon's party had stayed and which is now a Shangri-La.\", \"src\": [1, 2, 8]", "The place to find them was the Hangzhou Hotel by West Lake, where Nixon's party had stayed and which is now a Shangri-La. One visitor remembers it as the only hotel in the city open to Westerners at the time.\", \"src\": [1, 2, 8, 28]"],
["He would stand there reading English out loud, waiting for foreigners to come out.", "He would stand there reading English, waiting for foreigners to come out."],
["That is about 2,000 customer conversations, in a foreign language, before he turned 25.", "That is 2,000 conversations in a foreign language, with strangers he first had to win over."],
["His son David slipped across the road from the hotel to the park one free evening, with a box of matches. Ma was 15.", "On a free evening, his son David slipped across the road from the hotel to the park to flick matches. Ma was 15."],
["Thirty-seven years later, at an Alibaba event in Detroit, he stood outside holding a sign reminding Ma that he had once been his tour guide.", "Thirty-seven years later, at an Alibaba event in Detroit, he held up a sign reminding Ma that he had once been his tour guide."],
["Thelen joked Ma's English was better at 16. Read that again.", "Thelen joked that Ma's English was better at 16."],
["So the boy who talked to foreigners at dawn did what work he could find, as a temporary secretary and a porter.", "So the boy who talked to foreigners at dawn did what work he could find, as a secretary and a porter."],
["His first real money came from pedalling magazines. Not from anything clever.", "Some of his first wages came from pedalling magazines. Nothing clever about it."],
["Ma has said the story embarrassed him. The hero who fails the exam tries again, and he had just gone off to pedal a cart.", "Ma has said he came away thinking that this man failed and tried again, while he himself had failed and gone off to pedal a cart."],
["His parents begged him to stop.", "His parents tried to talk him out of trying again."],
["A teacher told him that if he passed, she or he would write their own name backwards.", "A teacher told him that if he ever passed, the teacher would write their own name backwards."],
["It was the least glamorous year of his life, and he has said it was the first thing he ever finished because he chose to.\", \"src\": [2, 16, 20]", "One account stresses that this third try was his own decision, taken against nearly everyone's advice.\", \"src\": [2, 12, 16, 20]"],
["__The skill nobody had asked him to build opened the door that the skill everyone demanded had shut.__\", \"src\": [2, 20]", "__The skill nobody had asked him to build opened the door that the skill everyone demanded had shut.__\", \"src\": [2, 12, 20]"],
["A former teacher remembers asking students to come up and share their experience, and the whole class refusing except for one.", "A former teacher remembers asking students to come up and share their experience, and the whole class refusing except for one. That one was Ma, and the teacher later gave him two class hours to talk about his trip to Australia."],
["And Ken Morley argued with him, with an Australian lack of ceremony that he clearly loved. As Ma told it in Newcastle in 2017:", "And Ken Morley argued with him. As Ma told it in Newcastle in 2017:"],
["They visited often, and Ken gave talks at his college in Hangzhou.", "Ken visited most years to help at the college where Ma taught."],
["So at 23 he joined the Hangzhou Institute of Electronic Engineering, on a monthly wage of ==90 yuan==, later 120. That was about $12 to $15 a month.", "So at 23 he joined the Hangzhou Institute of Electronic Engineering, on a monthly wage of ==90 yuan==, later 120. He told Inc. that his pay was like $12 to $15 a month."],
["Students recall that he rarely prepared, but they never stopped listening.", "One student recalls that he never prepared a lesson, yet everyone's interest in English rose."],
["Later, Jiang Fang, Han Min and Dai Shan would give up safe jobs to follow him.", "Later, his students Jiang Fang, Han Min and Dai Shan would give up safe graduate careers to follow him."],
["“A promise is a promise. No means no,” is how he put it in a later speech (translated from Chinese).", "“A promise is a promise. If I'm not going, I'm not going,” is how he put it in a later speech (translated from Chinese)."],
["Many versions place all this right after his exams, in his teens. __The dates say otherwise.__", "Some versions, including his biography, place the KFC story right after his exams, in his teens. __The dates say otherwise.__"],
["So Ma slung a big sack over his shoulder and took the train to Yiwu and Guangzhou, buying small goods to resell. For a while, Hangzhou's first professional translation agency was kept alive by flowers, books, clothes, socks and flashlights.\", \"src\": [9, 11, 31, 35]", "So Ma slung a big sack over his shoulder and went to Yiwu and Guangzhou, buying small goods to resell. For a while, Hangzhou's first professional translation agency was kept alive by flowers, books, clothes, socks and flashlights. The journalist Liu Ren, who interviewed Ma in 2002, adds that he also spent a year selling medicine, to everyone from big hospitals to village doctors.\", \"src\": [9, 11, 31, 35, 52]"],
["By 1995 he had a reputation as maybe the best English speaker in town. That is why he was asked to help with a highway project near Hangzhou, where an American investor's money had not appeared after a year of talks. The investor blamed a language problem, and he blamed his board. So Ma was sent, first to Hong Kong and then to the United States, to find out. It was his first time in America.", "By 1995 word had got around about his English. That is why he was asked to help with a highway project near Hangzhou, where an American investor's money had not appeared after a year of talks. Both sides decided the problem was poor translation, so they brought in Ma. The investor then blamed his board in Hong Kong, and after that the money being held in America, so Ma went to both. It was his first time in the United States."],
["As they drove him round rich neighbourhoods, he pointed at big houses and said he was going to buy them.", "As he was shown round rich neighbourhoods, he pointed at big houses and said he was going to buy them."],
["Then Aho's son-in-law, Stuart Trusty, took him into his small internet firm in a downtown office tower. There was a computer.", "Then Aho's son-in-law, Stuart Trusty, took him into his internet consultancy in a downtown office tower: two small rooms, by one account, with five young people typing at screens."],
["his internet consultancy in a downtown office tower: two small rooms, by one account, with five young people typing at screens. Ma, who had never touched a keyboard, was scared to touch it because he did not think he could afford to pay if he broke it. Then he typed the first word he could think of.\", \"src\": [1, 11, 36]", "his internet consultancy in a downtown office tower: two small rooms, by one account, with five young people typing at screens. Ma, who had never touched a keyboard, was scared to touch the computer because he did not think he could afford to pay if he broke it. Then he typed the first word he could think of.\", \"src\": [1, 11, 36, 52]"],
["Trusty's team put up a very plain page for the Hope agency, with its prices and contact details.", "His new friends put up a very plain page for the Hope agency, with its prices and contact details."],
["Back in Hangzhou, he invited ==24 friends== to his home, most of them people in the foreign trade business. He talked at them for two hours about the internet. It went badly.\", \"src\": [11]", "Back in Hangzhou, one night in March 1995, he invited ==24 friends== to his home. Most were people in foreign trade he had met while teaching evening classes. He told them he was quitting to do the internet, and talked for two hours. They asked five questions, and he could not answer any of them.\", \"src\": [11, 52]"],
["I talked for two full hours. They were confused, and so was I. In the end 23 of them said forget it, and only one said you can try it, and if it fails, run back quickly.", "They listened in a daze, and I talked in a daze. In the end 23 of them said forget it, and only one said you can try it, and if it fails, run back quickly."],
["He slept on it, and in the morning he decided to go ahead even if all 24 were against him. He told his superior at the college, Chen Dingguo, showing him a scrap of paper no bigger than a cigarette box, covered in terms Chen had never heard.", "“Open a bar, open a restaurant, run a night school, anything. Just not this,” Liu Ren reports them saying (translated from Chinese). He slept on it, and in the morning he decided to go ahead even if all 24 were against him. He showed his superior at the college, Chen Dingguo, a scrap of paper no bigger than a cigarette box, covered in terms Chen had never heard."],
["He left the college in 1995, having stayed more than six years rather than the five he had promised.\", \"src\": [11, 31, 34]", "He left the college in 1995, having stayed more than six years rather than the five he had promised.\", \"src\": [11, 31, 34, 52]"],
["The starting money was small: about 20,000 yuan, with 7,000 of it his own and the rest from family. He told Inc. it was $2,000, borrowed. __The internet had not yet arrived in Hangzhou, and he was already selling it.__\", \"src\": [0, 8, 9, 11, 31]", "The starting money was small: about 20,000 yuan, with 7,000 of it his own and the rest from family. He told Inc. it was $2,000, borrowed. __China's public internet was still months away, and he was already selling it.__\", \"src\": [0, 8, 11, 31, 51, 52]"],
["Only then would he pay. Everyone assumed Ma was running a scam.\", \"src\": [37, 40]", "Only then would he pay. Many people assumed Ma was running a scam.\", \"src\": [35, 37, 40, 52]"],
["{ \"t\": \"note\", \"text\": \"Being called a fraud is normal when you sell the future early.\" },", "{ \"t\": \"example\", \"text\": \"For example: a page of about 3,000 characters and one photo cost a customer 20,000 yuan. Of that, 12,000 went to the American partner who built it. Ma's team kept 8,000, and had to fight for every sale.\", \"src\": [52] },\n        { \"t\": \"note\", \"text\": \"Being called a fraud is normal when you sell the future early.\" },"],
["Equity he says he was promised never arrived.", "Equity promised to the team never arrived, one report says."],
["He was a free tour guide again, just as at 15.", "He was a tour guide again, just as at 15."],
["One night in late 1998 he called the team", "One night in 1998 he called the team"],
["“Everything has to start again from zero,” he says.", "“Everything has to start again from the beginning,” he says (translated from Chinese)."],
["He was tiny, and he fought anyway. Chinese profiles describe him as the student who got into more fights than anyone else at school. Friends mattered more to him than lessons, and by his own account he fought for friends, not for himself. He imagined himself as a wandering hero out of a martial arts novel.\", \"src\": [11, 17, 18]", "He was tiny, and classmates teased him for it. He fought anyway. Chinese profiles describe him as the student who got into more fights than anyone else at school, and say he fought for friends, not for himself. He imagined himself as a wandering hero out of a martial arts novel.\", \"src\": [11, 17, 18, 49]"],
["Accounts differ: The Paper and The Beijing News say five, IT Times says six in another 2007 retelling, and People.cn says four in three hours.", "Accounts differ: The Paper and The Beijing News say five, a 2007 Sina Finance retelling says six, and People.cn says four in three hours. Ma told Inc. the search was on Yahoo, while Liu Ren says Lycos."],
["{ \"claim\": \"Who gave him the name Jack\"", "{ \"claim\": \"Where he bought Lu Yao's novel, and when the hotel turned him down\", \"note\": \"Ma's own words reported by Jiemian say Yiwu railway station; other Chinese accounts say Jinhua or Hangzhou station, or that he found it while delivering books. We use Yiwu. Sources also differ on whether the hotel waiter rejection followed his first exam (People's Daily Online) or his second (China Daily).\" },\n      { \"claim\": \"When the translation agency started and what its rent was\", \"note\": \"Clark and Sina Finance say January or early 1994. Liu Ren, after interviewing Ma in 2002, says 1992, and other reports say the idea began taking shape in 1992. First-month rent is given as 2,000 yuan (People.cn, IT Times) or 2,400 yuan (Liu Ren). All agree revenue was 700 yuan. We use January 1994 and 2,000.\" },\n      { \"claim\": \"Who gave him the name Jack\""],
["{ \"label\": \"Australian Financial Review, “Alibaba billionaire founder Jack Ma gives $26m to University of Newcastle” (Feb 2017)\", \"url\": \"https://www.afr.com/work-and-careers/management/alibaba-billionaire-founder-jack-ma-gives-26m-to-university-of-newcastle-in-memory-of-australian-mentor-20170202-gu4fg3\" }", "{ \"label\": \"Australian Financial Review, “Alibaba billionaire founder Jack Ma gives $26m to University of Newcastle” (Feb 2017)\", \"url\": \"https://www.afr.com/work-and-careers/management/alibaba-billionaire-founder-jack-ma-gives-26m-to-university-of-newcastle-in-memory-of-australian-mentor-20170202-gu4fg3\" },\n    { \"label\": \"Zhejiang Online, interview with He Yibing, Ma's first partner at China Pages (July 2019, Chinese)\", \"url\": \"https://zjnews.zjol.com.cn/zjnews/hznews/201907/t20190718_10612786.shtml\" },\n    { \"label\": \"Liu Ren and Hou Jiyong, “The Real and Fake Ma Yun”, based on Liu Ren's 2002 interview with Ma, on Huxiu (Chinese)\", \"url\": \"https://m.huxiu.com/article/2008282.html\" }"],
];
let miss = 0;
for (const [a, b] of R) {
  const n = s.split(a).length - 1;
  if (n !== 1) { console.log("MISS", n, a.slice(0, 80)); miss++; }
  else s = s.replace(a, () => b);
}
if (miss) { console.log("not written"); process.exit(1); }
fs.writeFileSync(f, s);
const j = JSON.parse(s);
const S = j.sources.length;
let words = 0, chapterWords = [];
for (const c of j.chapters) {
  let w = 0, run = 0, maxRun = 0;
  for (const b of c.blocks) {
    const texts = [];
    if (b.text) texts.push(b.text);
    if (b.title) texts.push(b.title);
    if (b.items) for (const it of b.items) texts.push(it.text || (it.value + " " + it.label));
    if (b.photo) texts.push(b.photo.caption);
    w += texts.join(" ").split(/\s+/).filter(Boolean).length;
    if (b.t === "p") { run++; maxRun = Math.max(maxRun, run); } else if (b.t !== "h") run = 0;
    if (b.t === "note" && b.text.split(/\s+/).length > 14) console.log("LONG NOTE", b.text);
    const cite = (x) => { if (!Array.isArray(x) || !x.length) console.log("NO SRC", JSON.stringify(b).slice(0, 80)); else for (const i of x) if (i < 0 || i >= S) console.log("BAD SRC", i); };
    if (["p", "example", "quote"].includes(b.t)) cite(b.src);
    if (b.items) b.items.forEach((it) => cite(it.src));
  }
  chapterWords.push([c.id, w, c.blocks.length, "maxPRun", maxRun]);
  words += w;
}
const used = new Set();
JSON.stringify(j.chapters, (k, v) => { if (k === "src" && Array.isArray(v)) v.forEach((i) => used.add(i)); return v; });
console.log("sources", S, "unused", [...Array(S).keys()].filter((i) => !used.has(i)));
console.log(chapterWords, "total", words);
