// Builds part-1.json. Keys in S map to source indexes, so citations stay correct.
const fs = require("fs");
const OUT = process.argv[2];

const S = {
  globe: ["Boston Globe: Michael Bloomberg, from Medford kid to potential presidential contender (2020)", "https://www.bostonglobe.com/2020/02/25/metro/michael-bloomberg-medford-kid-potential-presidential-contender/"],
  purnick: ["Joyce Purnick, Mike Bloomberg: Money, Power, Politics, chapter 2 excerpt (New York Times, 2009)", "https://www.nytimes.com/2009/10/09/books/excerpt-mike-bloomberg.html"],
  newsweek: ["Newsweek, Jon Meacham: How Bloomberg Could Shake Up '08 (2007)", "https://www.newsweek.com/how-bloomberg-could-shake-08-96261"],
  ch2: ["Michael R. Bloomberg, Bloomberg by Bloomberg, revised edition (Wiley, 2019), publisher extract with chapters 1 and 2", "https://www.ciando.com/img/books/extract/111955456X_lp.pdf"],
  ch1: ["Michael R. Bloomberg, Bloomberg by Bloomberg, chapter 1 excerpt (Wiley)", "https://catalogimages.wiley.com/images/db/pdf/9781119554264.excerpt.pdf"],
  horatio: ["Horatio Alger Association: Michael R. Bloomberg member biography", "https://horatioalger.org/members/detail/michael-r-bloomberg/"],
  cbio: ["Bloomberg LP: Bio of Charlotte Rubens Bloomberg", "https://data.bloomberglp.com/mike/sites/10/2015/06/Bio-CharlotteBloomberg.pdf"],
  obit: ["New York Times death notice: Charlotte Bloomberg (via Legacy.com, 2011)", "https://www.legacy.com/us/obituaries/nytimes/name/charlotte-bloomberg-obituary?id=32829986"],
  nytrec: ["New York Times: A Mayor's Recollections of Motherly Advice (2011)", "https://www.nytimes.com/2011/06/21/nyregion/a-mayors-recollections-a-lifetime-of-motherly-advice.html"],
  nbc: ["NBC New York / AP: Bloomberg's Mother Dies at 102 (2011)", "https://www.nbcnewyork.com/news/local/ny-bloombergs-mother-dies-at-102/1921192/"],
  wgbh: ["GBH News: Michael Bloomberg on His Boston-Area Roots (2020, from a 1997 interview)", "https://www.wgbh.org/news/politics/2020-01-02/michael-bloomberg-on-his-boston-area-roots"],
  politico: ["Politico Magazine: 55 Things You Need to Know About Mike Bloomberg (2020)", "https://www.politico.com/news/magazine/2020/02/19/mike-bloomberg-55-things-you-need-to-know-115862"],
  mospr: ["Museum of Science, Boston: press release on the $50 million gift (2016)", "https://www.mos.org/press/press-releases/50-million-gift-bloomberg-philanthropies-museum-science-boston-dramatically-expands"],
  mos: ["Museum of Science, Boston: About Us, William and Charlotte Bloomberg Science Education Center", "https://www.mos.org/about"],
  lib: ["Fifty Plus Advocate: Michael Bloomberg grew up in Medford, with his 2022 library dedication remarks (2025)", "https://www.fiftyplusadvocate.com/2025/11/27/business-titan-philanthropist-and-politician-michael-bloomberg-grew-up-in-medford/"],
  mb: ["MikeBloomberg.com: About / Meet Mike", "https://www.mikebloomberg.com/about/"],
  wusa: ["WUSA9, quoting Bloomberg's campaign website on his father's NAACP check (2020)", "https://www.wusa9.com/article/news/politics/dc-mayor-muriel-bowser-endorses-michael-bloomberg-for-president/65-3d6fd8e3-b3f6-40db-968f-2fe811b8c6f3"],
  oral: ["Johns Hopkins University Sheridan Libraries: Oral history of Michael Bloomberg, interviewed by Mame Warren (1999)", "https://digitalcollections.library.jhu.edu/documents/detail/oral-history-of-michael-bloomberg/78464"],
  tun: ["The University Network: Mike Bloomberg's Life as a College Student (2020), drawing on Purnick, the Baltimore Sun and the 1999 interview", "https://www.tun.com/blog/mike-bloombergs-life-as-a-college-student/"],
  nyt13: ["New York Times: Bloomberg to Johns Hopkins, $1.1 Billion Thanks (2013)", "https://www.nytimes.com/2013/01/27/nyregion/at-1-1-billion-bloomberg-is-top-university-donor-in-us.html"],
  jhmi: ["Johns Hopkins Medical Archives: Michael Rubens Bloomberg portrait note", "https://medicalarchives.jhmi.edu/portrait/bloomberg-michael-rubens/"],
  ency: ["Encyclopedia of World Biography (Encyclopedia.com): Michael Bloomberg", "https://www.encyclopedia.com/people/history/us-history-biographies/michael-bloomberg"],
  ny: ["The New Yorker, Ken Auletta: The Bloomberg Threat (1997)", "https://www.newyorker.com/magazine/1997/03/10/profile-michael-bloomberg-the-bloomberg-threat"],
  jhu: ["Johns Hopkins Magazine, Dale Keiger: What Makes Mike Bloomberg So Smart? (1996)", "https://pages.jh.edu/jhumag/1196web/bloombrg.html"],
  obs: ["New York Observer, Andrea Bernstein: The Bloomberg Chronicles (2001)", "https://observer.com/2001/10/the-bloomberg-chronicles/"],
  cnbc: ["CNBC Make It: Michael Bloomberg on choosing a job (2017)", "https://www.cnbc.com/make-it/2017/05/22/michael-bloomberg-when-choosing-a-job-prioritize-this-over-salary.html"],
  billy: ["Michael R. Bloomberg: Billy Salomon's Leadership School (Bloomberg View column, via 3BL Media, 2015)", "https://www.3blmedia.com/news/michael-bloomberg-billy-salomons-leadership-school"],
  founders: ["Founders podcast #433, transcript: long readings from Bloomberg by Bloomberg (2026)", "https://podscripts.co/podcasts/founders/how-michael-bloomberg-works"],
  euro: ["Euromoney: Interview, Gutfreund shows his hand (1999)", "https://www.euromoney.com/article/27bjsstsqxhkmh14o5nwf/interview-gutfreund-shows-his-hand/"],
  hbs: ["Harvard Business School: Baker Library / Bloomberg Center", "https://www.hbs.edu/about/campus-and-culture/campus-built-on-philanthropy/baker-library-bloomberg-center"],
  invest: ["Investopedia: Who Is Michael Bloomberg?", "https://www.investopedia.com/terms/m/michael-bloomberg.asp"],
  nyt17: ["New York Times: Michael Bloomberg on How to Succeed in Business (2017)", "https://www.nytimes.com/2017/02/01/education/edlife/mike-bloomberg-salomon-brothers.html"],
};

const used = [];
const idx = (k) => {
  if (!S[k]) throw new Error("unknown source " + k);
  let i = used.indexOf(k);
  if (i < 0) { used.push(k); i = used.length - 1; }
  return i;
};
const src = (s) => s.trim().split(/\s+/).map(idx);

const p = (text, s) => ({ t: "p", text, src: src(s) });
const h = (text) => ({ t: "h", text });
const note = (text) => ({ t: "note", text });
const quote = (text, who, s) => ({ t: "quote", text, who, src: src(s) });
const example = (text, s) => ({ t: "example", text, src: src(s) });
const facts = (...items) => ({ t: "facts", items: items.map(([value, label, s]) => ({ value, label, src: src(s) })) });
const timeline = (...items) => ({ t: "timeline", items: items.map(([when, text, s]) => ({ when, text, src: src(s) })) });
const lesson = (title, text) => ({ t: "lesson", title, text });
const photo = (url, page, caption, author, license, year) => ({ t: "photo", photo: { url, page, caption, author, license, year } });

const origins = {
  id: "origins",
  kicker: "Ages 0–12",
  title: "The Bookkeeper's Boy",
  blocks: [
    p(`On Valentine's Day 1942, at a hospital in the Brighton part of Boston, Charlotte and William Bloomberg had their first child. They named him Michael Rubens Bloomberg, and the middle name was his mother's family name. He was the grandson of Russian and Lithuanian immigrants. Nothing about this baby's start said "future billionaire."`, "globe ency obit nyt17"),
    p(`His father, William, kept the books at a dairy in Somerville, just outside Boston. He worked "six or seven days a week, all his life," his son later said. His pay never went above ==$6,000 a year==.`, "wgbh horatio ny"),
    p(`His mother, Charlotte, was the surprise in the family. Born in Jersey City in 1909, she finished high school at 16 and earned an accounting degree from New York University in 1929, when few women went to college. She took a job as an auditor at the Breakstone dairy, met William there, and married him in 1934. __So the boy grew up in a house where the mother held the business degree and the father did the daily grind.__`, "cbio obit"),
    note(`His mother had an accounting degree. In 1929. Read that again.`),
    facts(
      ["$6,000", "the most his father ever earned in a year", "ny horatio"],
      ["1929", "the year his mother graduated from NYU in accounting", "obit cbio"],
      ["102", "his mother's age when she died, in the same family house", "nbc obit"],
    ),
    h(`The house they could not simply buy`),
    p(`The family first lived in Allston, then rented in Brookline, until a new owner told them the apartment was no longer for rent. They chose a modest house in West Medford, close to William's job. Medford was a blue-collar town of mostly Irish and Italian families. The man selling the house did not want to be the first on his block to sell to Jews.`, "globe newsweek"),
    quote(`And so he sold it to my father's Irish lawyer, who resold it to my father at the same table.`, "Michael Bloomberg, recalling the deal to Newsweek", "ency newsweek"),
    p(`Stop and picture that table. One signature made the lawyer the owner, and a second made William the owner. The family did not win an argument about prejudice. They got the house anyway, and Charlotte lived in it for the rest of her very long life.`, "newsweek politico nbc"),
    p(`It was not the last door shut on William. In the late 1940s his firm sent him to a convention in Miami Beach, and a hotel clerk looked at his name and told him the hotel did not take Jews. Someone made a fuss, and he got his room. __Mike grew up hearing that the rules could be unfair, and that you still found a way through.__`, "newsweek"),
    note(`He would run America's biggest city one day. Remember that table.`),
    photo("https://upload.wikimedia.org/wikipedia/commons/8/83/Medford_Square_with_streetcar_-_1913_postcard.jpg", "https://commons.wikimedia.org/wiki/File:Medford_Square_with_streetcar_-_1913_postcard.jpg", "Medford Square on a postcard from about 1913, a generation before the Bloombergs arrived. This was the center of the town Mike could not wait to leave.", "Unknown author", "Public domain", 1913),
    h(`Two very different parents`),
    p(`Charlotte told a biographer she was the disciplinarian, while William doted on their son. She made Mike and his younger sister, Marjorie, wait for their father before dinner. She used a tablecloth and serving dishes every night, even with no guests. When Mike asked why, she said the best should be saved for the most important people, your family. Her rule, as he remembered it, was that "we've got to take care of each other."`, "globe horatio cbio"),
    example(`For example: Mike came home from summer camp and announced that the camp food was better than her cooking. A softer mother might have sulked. Charlotte's answer, as he told it decades later: “Go back! I don't want to be a cook.”`, "nytrec"),
    p(`On Saturdays, William often took the boy along to the dairy office. While his father worked through the numbers, Mike rode the freight elevator up and down and played with the office machines. It was the first workplace he ever knew. Nobody had to give him a speech about work, because he watched it happen every week.`, "horatio"),
    p(`William also had strong ideas about duty. Called for jury duty, he told the judge he was too busy at work to serve. The judge asked him who he would want on his own jury if he were on trial, the men in that courtroom or someone like himself. The family took the point: the system only works when everyone does his part.`, "newsweek"),
    p(`One of Mike's earliest memories is from the family's dining table. His father sat down and wrote a check to the NAACP, the civil rights group, for $25 or $50. That was real money on a bookkeeper's pay. Mike asked him why.`, "wusa"),
    quote(`Because discrimination against anyone is a threat to everyone.`, "William Bloomberg, as quoted on his son's 2020 campaign website", "wusa"),
    note(`$25 on a bookkeeper's pay. That is what real giving looks like.`),
    h(`What he was like at five, at ten`),
    p(`Even as a small boy, he went his own way. At 98, sitting in that same house, his mother smiled as she remembered it. "He could do everything from his point of view, you know?" she told a biographer. He was no star at baseball or football, so he looked for other ways to stand out. His closest friend in the neighborhood was two years older, and he ran with a crowd of older boys.`, "purnick newsweek"),
    quote(`He could get along with boys that were older than he, he had enough self-confidence.`, "Charlotte Bloomberg, to Newsweek", "newsweek"),
    p(`At the Gleason School he took part in the Memorial Day ceremony every year, and each year one student was picked to give a speech. "You just knew ahead of time that he was going to be the one," his mother said. Standing in front of a crowd never seemed to bother him.`, "newsweek"),
    p(`One of his favorite TV shows as a boy was John Cameron Swayze's "Camel News Caravan," named for its cigarette sponsor. The boy noticed something about the animal on the cigarette pack. He wrote to Swayze to explain that a one-humped animal is, to be exact, a dromedary.`, "politico"),
    note(`A kid correcting a national news anchor. You can see where this goes.`),
    p(`At ==ten==, by his own telling, he was picked from his Boy Scout troop to read "Paul Revere's Ride" at Medford's Patriots' Day celebration. He stood on a raised platform with "Paul" on a prancing horse in front of him, the high school band playing and photographers snapping. He read into what he called "a real live microphone." He called it perhaps the proudest moment of his early life, and at a library dedication in 2022, he still called it "the honor of my young life."`, "newsweek lib"),
    p(`On Saturday mornings he rode a trolley, a subway and a bus to the Boston Museum of Science. For two hours each week, instructors handed the kids snakes, porcupines and owls to hold, ran physics experiments and quizzed them on the exhibits. Every kid tried to show off by having every answer, and Mike was no exception. __It was his first taste of competing on knowledge, not on sports.__`, "mos ch2"),
    example(`For example: one week the instructor asked how old "the redwood tree" upstairs was. The museum showed a five-foot slice of trunk, with light bulbs marking historic events on its rings. The kids all gave the obvious answer, and the instructor kept refusing it. Finally someone saw the catch: the slice was not from a redwood at all, but from a giant sequoia. Mike's takeaway, written years later, was to listen, question, test and think.`, "ch2"),
    quote(`People often remember the first teacher to have a profound impact on their lives. For me, that teacher was the Museum of Science.`, "Michael Bloomberg, 2016", "mospr"),
    p(`In 2016 his foundation gave that museum ==$50 million==, the largest gift in its 186-year history. The money named its education center for William and Charlotte. The boy on the trolley paid his Saturday mornings back, with interest.`, "mospr"),
    h(`The young Eagle`),
    p(`The Boy Scouts gave him what school did not: a ladder he could climb as fast as he wanted. "I savored earning every merit badge," he wrote, and he took pride in each rank. In 1954, at ==12==, he became an Eagle Scout, with his parents and sister watching. He says he was one of the youngest in the organization's history, and his biographer says he got there before he was old enough to qualify.`, "ch2 mb purnick"),
    p(`Scouting also put him in the middle of town life. His troop put flags on the graves of old American heroes. He also escorted elderly residents to the polls on election day. Twice, one of those voters was the mother of the aviator Amelia Earhart.`, "newsweek politico"),
    p(`Then there was camp: six weeks in the wilds of New Hampshire, in two-man tents, with a bugle at dawn and ice-cold showers. Everyone took turns peeling potatoes and doing dishes, and he loved a grape drink called "bug juice." His parents could afford only two of those weeks. So he covered the gap himself by shoveling snow, cutting lawns and selling his troop's Christmas wreaths door to door, which he remembered as his first selling experience.`, "ch2 horatio"),
    note(`A Boy Scout knocking on doors. First sales job. Very important.`),
    timeline(
      ["1909", "Charlotte Rubens is born in Jersey City.", "obit"],
      ["1934", "Charlotte marries William Bloomberg, whom she met working at the dairy.", "obit cbio"],
      ["Feb 14, 1942", "Michael is born in Boston.", "globe"],
      ["About 1945", "The family settles in Medford, after their lawyer buys the house and resells it to them.", "globe ency"],
      ["About 1952", "Age 10: he reads Longfellow's poem on the stage in Medford.", "lib newsweek"],
      ["1954", "Age 12: he becomes an Eagle Scout.", "mb"],
    ),
    p(`Long after he got rich, that house stayed in the family. In 2020 he told the Boston Globe he still paid for its phone line, so he could call and hear his late mother's voice on the answering machine. "If I want to hear her, I can just call the number," he said. Whatever else this book says about him, start with that.`, "globe"),
    lesson(`What to take from this chapter`, `You do not choose your starting point, but you do choose what you learn from it. Mike got a father who worked every day and a mother who would not let him feel sorry for himself. He also got a town that showed him early what an unfair rule looks like. None of it cost money. Look at your own family this way, and list what you are getting for free.`),
  ],
};

const growingUp = {
  id: "growing-up",
  kicker: "Ages 13–18",
  title: "Bored, Busy and Argumentative",
  blocks: [
    p(`Medford High School was built for kids who were expected to go straight to work. Most students were working class, and their parents were immigrants or the children of immigrants. By his own account, job training was the school's main mission and very few students went on to college. Mike was "totally bored" until his final year.`, "globe ch2"),
    p(`He was not a top student, and he was not a top athlete. What he was, says his biographer, was willful and serious, a contrarian with his own plan to get out of a town that bored him. His sister remembers the year he took two math courses and got an A in one and a D in the other. Their parents could not understand it.`, "purnick newsweek"),
    example(`For example: the D had a simple explanation. On the final exam he wrote down all the right answers, but he had done the work in his head and did not show the steps. The teacher assumed he had cheated.`, "newsweek"),
    note(`Right answer, no working shown. Investors will react exactly like that teacher.`),
    h(`The one book`),
    p(`Outside school, his obsession was a novel called "Johnny Tremain," about a teenage messenger and spy for the rebels in Boston in 1776. He has said he read it at least 50 times, and elsewhere a hundred. He took the book out of the Medford library, and he rode the subway downtown to visit the places it mentioned. He pictured himself as the hero, "sticking it to old George III."`, "ch2 politico lib newsweek"),
    p(`In 2007, when a Newsweek writer brought a copy to an interview at the mayor's residence in New York, he was 65. He looked at the cover and said, with a flourish, "One if by land, two if by sea!" Then he said he did not know why he had loved the book so much. The writer had a theory: Johnny was a boy from nowhere who made himself indispensable to powerful men through hard work. __Hold on to that plot, because Mike is about to live it on Wall Street.__`, "newsweek"),
    facts(
      ["50–100", "times he says he read Johnny Tremain", "politico ch2"],
      ["2", "honors courses in senior year that finally woke him up", "ch2 globe"],
      ["1", "word his high school class dictionary gave him: \"argumentative\"", "globe"],
    ),
    h(`Clubs, debates and an edge`),
    p(`He joined the Slide Rule Club, where members timed each other doing calculations on slide rules, the pocket calculators of that age. A fellow member called him "one of the geeks like we were." He was also president of the Debating Society, started by a group of seniors to argue about capital punishment, immigration and "recognizing Red China." Medford High's class dictionary gave each senior one defining word, and his was "argumentative."`, "globe"),
    quote(`If anybody in this Slide Rule Club said they were gonna run for president of the United States, we probably all would have laughed.`, "Carmen Comite, Medford High class of 1960, to the Boston Globe", "globe"),
    p(`Classmates remember him in different ways. One remembers a smart, quiet kid who hung out at Brigham's ice cream in Medford Square. Richard Black, the class president, sat in front of him in homeroom for years and remembers someone friendly but assertive, who said what he thought whatever the cost. "He had a little bit of an edge and sometimes rubbed people the wrong way," Black said.`, "globe"),
    note(`Same kid, two memories. Both are probably true.`),
    photo("https://upload.wikimedia.org/wikipedia/commons/4/4f/Michael_Bloomberg_in_1960_Blue_and_White.jpg", "https://commons.wikimedia.org/wiki/File:Michael_Bloomberg_in_1960_Blue_and_White.jpg", "Michael Bloomberg in the 1960 Blue and White, the Medford High School yearbook.", "Medford High School", "Public domain", 1960),
    h(`Trouble, the quiet kind`),
    p(`We found no record of a big teenage scandal. The trouble that does show up is smaller. Asked by Newsweek about prejudice in his childhood, he vaguely recalled a fight after another kid said something to him. Asked if he won, he said he was alive, and he did not know about the other boy. Asked whether feeling different had driven him, he said he did not remember feeling different.`, "newsweek"),
    h(`The paper the teacher threw back`),
    p(`In senior year, Medford High started two honors courses, and for the first time he was challenged. His literature teacher was Kathleen Sharkey, known for being tough and a great admirer of President Franklin Roosevelt. Mike's research paper argued that Roosevelt knew in advance about the Pearl Harbor attack and let it happen. That theory has been discredited. A classmate says Sharkey threw the paper back at him with one line: "Bloomberg, I'm not even going to read this paper."`, "ch2 globe"),
    p(`He did not rewrite it and he did not argue with her. He handed the same paper to his honors history teacher, according to his 2009 biography, and it got an ==A==. Being wrong about Pearl Harbor is nothing to admire. __But he learned something useful at 18: one person's no is not the final answer, so go and find a different reader.__`, "globe"),
    quote(`We realized in retrospect that he was smarter than Medford High.`, "Dorothy Rubin Schepps, classmate, to the Boston Globe", "globe"),
    note(`The theory was wrong. Finding a second reader was the clever part.`),
    p(`Those two classes changed how he saw school. His history teacher told them about the trial of Sacco and Vanzetti, two anarchists whose case split America in the 1920s, and said his own mother had gone to the courthouse each day to listen. His English teacher skipped spelling and grammar and asked what the great books meant. Mike later wrote that this showed him the difference between fascinating and boring. __Being bored at school did not mean he was dumb. It meant nobody had yet given him a reason to care.__`, "ch2"),
    h(`First money, and the job that changed everything`),
    p(`By now he knew how to earn. As a younger boy he had shoveled snow, cut lawns and sold wreaths door to door. In high school he went further and worked after class, on weekends and through summers at a small electronics company in Cambridge. It was not glamorous work, but it was the job that decided where he went next.`, "horatio ch2 globe"),
    p(`The company was run by a woman engineer with a Ph.D. from MIT. Mike called her the technical genius of the place, and she told him to apply to Johns Hopkins University in Baltimore. She knew people at its Applied Physics Laboratory, and he liked science. "Since I had to go to college someplace, why not?" he wrote. Later he found out the lab and the university had little real connection, but by then it did not matter.`, "oral ch2"),
    example(`For example: trace the chain. A part-time job led to one engineer's tip. The tip led to one application, with an interview held in Boston because nobody could afford to travel to see campuses. That application led to a university he would stay tied to for the rest of his life, as a student, a trustee and its chairman.`, "oral ch2 jhu"),
    note(`Your part-time boss might be the most important teacher you ever have.`),
    timeline(
      ["Early teens", "Reads Johnny Tremain again and again, and rides the subway to the Revolutionary War sites.", "ch2 politico"],
      ["High school", "Works after class, on weekends and in summers at a Cambridge electronics company.", "ch2 globe"],
      ["Senior year", "Takes two new honors courses and is challenged by school for the first time.", "ch2 globe"],
      ["Feb 1960", "Turns 18, in his last year at Medford High.", "globe"],
      ["1960", "Graduates, president of the Debating Society, labeled \"argumentative.\"", "globe"],
      ["1960", "Leaves for Johns Hopkins without ever having seen the campus.", "oral"],
    ),
    lesson(`What to copy, and what not to`, `Copy the outside work: the museum, the library book, the job in Cambridge. He treated school as only one of his teachers. Do not copy the D in math. Being right and refusing to show how you got there cost him, and it will cost you with teachers, co-founders and investors.`),
  ],
};

const firstSteps = {
  id: "first-steps",
  kicker: "Ages 18–39",
  title: "The Parking Lot, the Vault, the Door",
  blocks: [
    h(`Baltimore, 1960`),
    p(`He had never seen the Johns Hopkins campus when he got off the train at Penn Station in Baltimore. He shared a cab with another freshman he happened to meet there. When it pulled up, the sun was out and the flowers were in bloom. "I'd never seen anything so beautiful in my life," he said decades later.`, "oral"),
    p(`He arrived planning to study physics, but physics required German, so he switched to engineering. Tuition was ==$1,600 a year==. He paid it with a National Defense college loan and a job, and the job is often told slightly wrong. Asked in 1999 about parking cars at Hopkins, he corrected the interviewer: "But I never parked cars."`, "tun ny oral"),
    photo("https://upload.wikimedia.org/wikipedia/commons/7/76/Gilman_Hall_and_the_Keyser_Quad.jpg", "https://commons.wikimedia.org/wiki/File:Gilman_Hall_and_the_Keyser_Quad.jpg", "Gilman Hall on the Homewood campus of Johns Hopkins, photographed in 2023. Mike remembered being stunned by the Georgian buildings and the trees when his cab arrived in 1960.", "chris.rycroft", "CC BY 2.0", 2023),
    p(`Here is what he really did. For three years, a job handed down inside his fraternity, he sat in a chair at the top of the Faculty Club driveway from four to seven o'clock. His only task was to keep night school students out of the lot. If they saw him, they did not try, so he had nothing to do. He sat under a streetlight working with his slide rule, holding an umbrella in one hand if it rained.`, "oral"),
    quote(`I was the 'Beware of the dog' sign and they didn't need a dog.`, "Michael Bloomberg, Johns Hopkins oral history, 1999", "oral"),
    p(`The pay was ==$35 in cash a week==, plus dinner in the club kitchen five nights a week. The cooks liked him and slipped him sirloin steak and roast beef, while the club's manager, a Mrs. Kelly, wanted him eating peanut butter and jelly. He remembered it as a running battle. "$35 took care of my social life," he said, and his room too.`, "oral"),
    note(`Paid to sit, study and eat steak. He called it a great job.`),
    p(`His grades were mostly Cs. What he loved was people, and he reportedly became the first Jewish member of the Phi Kappa Psi chapter at Hopkins. The friend who recruited him, Jack Galotto, remembered a freshman with a spotless, organized dorm room. Mike sat at the fraternity table in the cafeteria in his blue Hopkins jacket, with nickel Cokes and nickel bags of Utz potato chips, salting each chip.`, "ch2 tun ency oral"),
    p(`He went on to become president of the fraternity, the Inter-Fraternity Council and his senior class. He ran campaigns, organized dances and learned to get people to work together. As a sophomore he also built the costume for the school's blue jay mascot, and he wore it at a few lacrosse games. Galotto saw through the party image: "Mike was always working."`, "ch2 jhmi tun nyt13"),
    photo("https://upload.wikimedia.org/wikipedia/commons/1/1d/Michael_Bloomberg_in_1964_Hullabaloo.jpg", "https://commons.wikimedia.org/wiki/File:Michael_Bloomberg_in_1964_Hullabaloo.jpg", "Michael Bloomberg in the 1964 Hullabaloo, the Johns Hopkins University yearbook.", "Johns Hopkins University", "Public domain", 1964),
    p(`He was honest with himself about engineering. He could study, memorize and repeat what the professor said, but he did not believe he could have created that knowledge himself. "Nobody should ever confuse me with an electrical engineer," he said. His conclusion was simple: "My skills were much more with people." __Finding out what you are not good at, early and honestly, is one of the most useful things college can do.__`, "oral ch2"),
    quote(`In fact, the main reason to go to college is to learn how to deal in this world with others, learn that others have feelings and need help.`, "Michael Bloomberg, Johns Hopkins oral history, 1999", "oral"),
    example(`For example: in November 1963 he planned a huge fraternity dance in the gym and spent the whole budget hiring James Brown and the Flames. Then President Kennedy was shot. They canceled the dance, and they never got the deposit back.`, "oral"),
    note(`He booked James Brown at 21. Lost the deposit. Welcome to business.`),
    h(`April 1963`),
    p(`Seven months before that dance, his world had split. In ==April 1963==, his father died of heart failure at 57, when Mike was 21. A childhood case of rheumatic fever had left William with a weak heart, and Mike had no idea how fragile it was. Charlotte went back to work.`, "tun horatio billy cbio"),
    quote(`My father worked seven days a week until he checked himself into the hospital to die.`, "Michael Bloomberg, to Newsweek, 2007", "newsweek"),
    p(`Friends remember a new intensity in him after that. He wrote that his father, a working-class man from Chelsea, Massachusetts, saw Harvard as a "rarefied and almost unattainable waypoint" on the road to the American Dream. In his senior year, Mike took double the normal course load and earned almost all As. His memoir gives a plainer reason for applying to Harvard Business School: most Hopkins students went on to graduate school, and he felt the pressure. He says he went right back to Cs afterward.`, "tun newsweek ch2"),
    p(`The answer arrived while he was in the campus mail room with friends, and he saw a large brown envelope in his box. "Great. Got in. Let's go get a cup of coffee," he said. A friend asked if he wanted to open it. "What's the point?" he said, explaining that rejections come in very thin letters. When he told his mother, her reply was shorter still: "Don't let it go to your head."`, "ch2 newsweek"),
    note(`Thick-envelope logic. Already reading the data, not the headline.`),
    example(`For example: his first gift to Johns Hopkins, the year after he graduated, was $5. By January 2013, he had given the university $1.1 billion. Years later, Harvard Business School named the Bloomberg Center at its Baker Library in honor of the bookkeeper from Chelsea.`, "nyt13 hbs newsweek"),
    h(`Harvard, and a pair of flat feet`),
    photo("https://upload.wikimedia.org/wikipedia/commons/e/ef/Baker_Library_Bloomberg_Center_Harvard_Business_School.jpg", "https://commons.wikimedia.org/wiki/File:Baker_Library_Bloomberg_Center_Harvard_Business_School.jpg", "Baker Library at Harvard Business School. Its Bloomberg Center extension honors William Henry Bloomberg, the father who never saw his son get in.", "EgorovaSvetlana", "CC BY-SA 4.0", 2009),
    p(`At Harvard from 1964, he got average grades and learned the basics of accounting, marketing and finance. In the "case method," a hundred classmates would shout you down if you came unprepared. Once he was told to write ten pages solving a problem, and he wrote half a page saying there was no problem because one of the facts was wrong. After he did it a second time, he was called in and told to follow the rules if he wanted to graduate.`, "ch2 newsweek"),
    p(`He kept score on his classmates, and years later he noticed who had done well. "The bull-shitters faded away," he wrote, and street smarts and common sense predicted success better than grades. He also admitted he was starstruck by classmates whose fathers ran famous companies. Few of those connections ended up helping him. Meanwhile his mother, 20 minutes away in Medford, helped in a more practical way, because he said he "couldn't have typed my own papers."`, "ch2 newsweek"),
    p(`One summer, the interview does not say which, he took a job in Cambridge with a company that found temporary apartments for people doing business with local colleges. He got in at 6:30 or 7 a.m., when renters saw the newspaper ads and called. He booked the appointments himself, so when the full-time staff came in at nine, every visitor asked for him. Nobody could work out why.`, "wgbh"),
    quote(`All you gotta do is outwork the other person and you got a good shot.`, "Michael Bloomberg, on GBH, 1997", "wgbh"),
    note(`Read this twice. No talent required. He just picked up the phone first.`),
    p(`He assumed he was going to Vietnam, and he had a commitment from an army unit to make him a second lieutenant. Three months before graduation he went for a routine physical, and the doctor said, "You have flat feet. You're not going." His draft status still let the government call him later, so he wrote to his senators and congressmen asking to be sent right away and get it settled. He got form letters and never heard from his draft board again.`, "ch2"),
    p(`With 12 weeks to go, he had no job, no plan and no recruiting interviews. A classmate, Steve Fenster, told him to call Salomon Brothers and Goldman Sachs and say he was desperate to be a salesperson or trader. "Who are they?" Mike asked. "Don't worry about it," Fenster said. "Just do it."`, "ch2"),
    note(`A Harvard MBA who didn't know what Goldman Sachs did. In 1966.`),
    h(`Choosing the smaller paycheck`),
    p(`Trading and sales were seen as second-class work on Wall Street then, because you had to pick up the phone and actually sell. He got both offers anyway. By his memoir's account, as read aloud on the Founders podcast, Goldman offered ==$14,000== and Salomon ==$9,000==. He has said the job he took paid about 40 percent less, and he took it because he thought it was a better fit.`, "founders cnbc jhu"),
    p(`There was a problem: he could not live on it. According to that same reading, he told John Gutfreund, the Salomon partner who hired him, that he owned no second suit, had no apartment and no savings, only student loans. Asked how much he needed, he said $11,500. Gutfreund's answer was a $9,000 salary plus a $2,500 loan. On the day he interviewed, at 60 Wall Street, he had stopped to chat with a friendly man without knowing he was the boss, Billy Salomon.`, "founders billy ch1"),
    quote(`It was one of the best decisions I ever made, even though I got fired after 15 years.`, "Michael Bloomberg, to CNBC, 2017", "cnbc"),
    h(`The vault`),
    p(`His first post, at 24, was in "the Cage," a bank vault with no air conditioning. He counted real paper bond and stock certificates by hand. Each afternoon they went to banks as collateral for overnight loans, and each morning they came back to be logged again. It was, he wrote, "a pretty lowly start for a Harvard MBA."`, "ny obs cnbc ency"),
    quote(`We slaved in our underwear, in an un-air-conditioned bank vault, with an occasional six-pack of beer to make it more bearable.`, "Michael Bloomberg, Bloomberg by Bloomberg", "cnbc ency"),
    note(`Harvard MBA, in his underwear, counting paper. Age 24. Start anywhere.`),
    example(`For example: when friends asked what he did, he told them he was studying methods and procedures to simplify workflows. They were analysts and bankers with private offices, and he was a clerk. At one fancy New York dinner, the woman next to him asked where his family kept its yacht and its plane. His father had never earned more than $6,000 a year.`, "founders"),
    p(`His next job, in purchase and sales, meant flipping through stacks of old Wall Street Journals to find historical stock prices. Wall Street was drowning in paper. In the late 1960s the New York Stock Exchange even closed on Wednesdays to catch up on its paperwork, and more than a few firms went under. __He was seeing, from the very bottom, the exact problem that would one day make him rich.__`, "ny"),
    p(`About a year in, he moved up to the equities desk under a tall trader named Jay Perry, and the two helped build "block trading," letting big investors buy and sell stock in huge lots. It was one loud room across two floors, with 210 people yelling and a microphone that carried voices to every branch office. Mike started arriving at seven each morning, and only Billy Salomon got there before him. In the evening, the only people left after him were Billy and the number-two man, John Gutfreund.`, "obs ny"),
    quote(`When he needed to borrow a match or talk sports, I was the only other one in the trading room, so he talked to me.`, "Michael Bloomberg, on Billy Salomon, quoted in The New Yorker", "ny"),
    note(`Very important for first-time founders! Be in the room when nobody else is.`),
    p(`At 26 he was a buddy of the managing partner. Billy became a mentor who shaped him deeply, and Mike later called him "the most ethical person I ever met" and "almost like a second father." Billy had not gone to college, and he did not care where you had gone. He once fired a salesman for sending a customer a case of wine, because the rule was no gifts.`, "founders billy"),
    p(`The climb was quick. He made partner in ==1972, at 30==, headed equity trading by about 1974, and was a general partner by 1976, the year he married Susan Brown. He had never planned any of it. He said he never set a target of being partner by 30, and he took many small steps instead of one lucky leap.`, "jhu ny invest ency founders"),
    facts(
      ["$9,000", "starting salary at Salomon, 1966", "jhu ency"],
      ["30", "his age when he made partner, 1972", "jhu ny"],
      ["15 years", "of twelve-hour days and six-day weeks at one firm", "ch1"],
    ),
    h(`The other Mike`),
    p(`Now the side he does not put on a poster. Colleagues from those years describe him as brilliant, and also as abrasive and profane, and his temper led him to smash more than a few telephones. One subordinate, Richard Levy, says Mike asked him to move his grandfather's funeral because of a big client's trading day. Levy refused, and says Mike apologized two hours later. Years afterward, Levy says, Mike also admitted he had been wrong to criticize him for staying with his newborn son in intensive care.`, "obs ny"),
    quote(`He's the most brilliant guy I ever worked for, but he's the biggest bastard I ever worked for.`, "Richard Levy, former Salomon colleague, to the New York Observer, 2001", "obs"),
    p(`Levy also described a trading floor where people were insulted over their weight, religion or gender, and he said some women were left close to tears. He said everyone talked that way, Mike included. Bloomberg's spokesman in 2001 played down such stories as other people's memories of a hectic floor. Most of the same colleagues also spoke warmly of his loyalty and generosity. Levy still had his number and said he would take the call.`, "obs"),
    note(`Brilliant and hard to work for. Copy only the first half.`),
    h(`The demotion`),
    p(`In the 1970s the firm's politics turned on him. His boss, Perry, and another partner, Richard Rosenthal, had a feud that ended in a fistfight, and Perry was sent off to Dallas. Rosenthal moved onto the executive committee, and Mike wrote that he poisoned that committee against him. Colleagues add that Mike supplied some of the poison himself by banging heads with other partners. Gutfreund, who had almost nothing bad to say about him, put it gently: "Does everyone want their cage rattled? Obviously, no."`, "obs"),
    p(`In ==1979==, at 37, he was told to give up sales and trading and run the computer systems. "He was a trader and this was an office job, a real comedown," one partner said. He wrote that he would have done anything the firm asked, and he took the job. He had already pushed for computers on the traders' desks, linked to an IBM mainframe, because he saw that the best information led to the best trades.`, "ch1 obs ny"),
    p(`Now he had a real team. A young programmer, Tom Secunda, recalled that salesmen still looked up bond yields in a book or worked them out on a calculator. Mike's group built a system known as the Salomon B-pages, which gave traders live market information. "All the traders loved us," Secunda said. __The job meant to sideline him was teaching him exactly what the rest of Wall Street did not know how to do.__`, "ny obs"),
    quote(`He was a market professional on the right hand, and a computer person on the left hand. That was very unusual.`, "Morris Offit, former Salomon partner, 2001", "obs"),
    note(`Best idea of his life came from his worst job. He was 37.`),
    p(`He still could not keep quiet. "I was very vocal that we were going in the wrong direction," he said of those years. A former partner says he alienated senior people in operations too. His own memoir admits that fighting the firm's direction did not help him. By 1981, by his own account, his prospects in the company were declining.`, "ny obs ch1"),
    h(`Tarrytown`),
    p(`On a hot Friday night in the summer of 1981, Salomon's partners were called to a conference center in Tarrytown, New York, for a mandatory, top-secret meeting. Guards checked each man in, while a Fortune photographer who had been tipped off hid in a tree. At every seat lay a dark gray leather folder with a partner's name on it. Inside was the news: the 71-year-old partnership would merge with Phibro, a commodities trader, and the second section showed what each man would personally get.`, "ch1"),
    p(`The questions lasted an hour, and nobody voted no. Then came greasy steaks, hard liquor, pool, poker and Cuban cigars. They had been told to tell no one, but one partner phoned his wife at their country club, and she ran back into the dining room screaming, "We're rich, we're rich!" Luckily, Mike wrote, nobody paid attention to her.`, "ch1"),
    p(`Saturday morning, ==August 1, 1981==, came with hangovers. Each partner sat down with two members of the executive committee, and Mike's meeting was with Gutfreund and the economist Henry Kaufman. Most of the 63 partners were asked to stay, but he was one of about half a dozen who were not. "Time for you to leave," Gutfreund said. Mike's reply, as he tells it, was short: "Since you don't need me anymore, I'm going home."`, "ch1"),
    quote(`Nobody likes to be told you're history. It's rejection. It hurts your ego.`, "Michael Bloomberg, on GBH, 1997", "wgbh"),
    facts(
      ["$10 million", "his payout, in cash and convertible bonds, by his account", "ch1 jhu"],
      ["39", "his age when fired", "ch1"],
      ["1", "full-time employer he had ever had", "ch1"],
    ),
    p(`Why him? Gutfreund said in 1999 that Mike had done "a fabulous job" on the technology but would rather have been a trader. He was not going to run equity trading, so "it was time for him to move on." A week later Mike went to say goodbye to Billy Salomon, now retired and furious at the sale. "You screwed me," Billy said, and Mike answered that Billy himself had picked the committee and written the rules.`, "euro ch1"),
    p(`What he did next is the part worth remembering. That same week he went to a furrier on Third Avenue and ordered a sable jacket for his wife, Sue, because he worried she might be embarrassed and fear he could not support the family. The jacket was meant to say, in his words, "No sweat. We can still eat. We're still players." On his last day, September 30, 1981, he still put in his usual twelve hours. He picked up the jacket on the way home, they drank champagne, kissed their young daughter and went out to dinner.`, "ch1"),
    p(`He did not hunt for another job. "Nobody offered me a job," he said, "though it's also true that I didn't look for one." He knew what traders needed and what computers could do, and Offit believed nobody at Salomon had noticed the business growing right under them. Gutfreund said so too, later and with some admiration: "He was a smarter business man than we." On the first morning of the new company, Mike sat in a rented one-room office, and he went out and bought a small refrigerator and a coffee machine.`, "jhu ny obs ch1"),
    note(`Fired at 39. Worked his full last day anyway. Next morning: day one.`),
    timeline(
      ["1960–64", "Johns Hopkins: Cs, parking-lot job, fraternity and class president.", "oral ch2"],
      ["April 1963", "His father dies at 57.", "tun"],
      ["1964–66", "Harvard Business School. Flat feet end his army plan.", "ch2"],
      ["1966", "Joins Salomon Brothers at $9,000 and starts in the vault.", "jhu ny"],
      ["1972", "Made a partner at 30.", "jhu ny"],
      ["1979", "Moved off the trading desk to run computer systems.", "ch1"],
      ["Aug 1, 1981", "Told he is out after the Phibro deal, with about $10 million.", "ch1"],
      ["Oct 1, 1981", "The morning after his last day, he starts his own company.", "ch1"],
    ),
    lesson(`What to copy, and what not to`, `Copy the early mornings, the low-status first job and the habit of learning whatever the firm needs, even after a demotion. Choose the place where you will grow over the place that pays more today. Do not copy the temper. By his own colleagues' accounts it cost him allies, and it may have cost him his job at Salomon. In the end he got lucky that it did.`),
  ],
};

const disputed = [
  { claim: "His father never earned more than $6,000 a year.", note: "The New Yorker, Politico, his 2020 campaign site and readings from his memoir all give $6,000, so we use it. Quote sites attribute a figure of $11,000 to his 2006 Slate 60 speech and cite NYC.gov. We could not retrieve the speech text itself. It may reflect a different point in time or a later retelling." },
  { claim: "His father's NAACP check and what he said.", note: "The campaign site says \"$25 or $50\" and quotes \"a threat to everyone.\" The 2006 speech, as reproduced on quote sites, says $25 and \"discrimination against us all.\" Same story, different wording. We attribute the quote to the campaign site." },
  { claim: "The year the family moved to Medford.", note: "The Boston Globe and Charlotte's death notice say 1945. Newsweek's account dates the purchase to 1947. Other accounts say he was three or four. Written as 'about 1945'." },
  { claim: "Why they left Brookline, and who arranged the lawyer deal.", note: "In 1997 Bloomberg said his parents told him they moved because Medford was more diverse (GBH). Newsweek says a new owner ended their rental. On the deal, Politico says his mother persuaded the lawyer, while Newsweek and Bloomberg's own telling say the seller sold to the lawyer. We use the seller version and do not credit one parent." },
  { claim: "Birthplace.", note: "The Boston Globe says St. Elizabeth's Hospital in Brighton, Boston. A 2002 Tufts Daily article says Brookline, which appears to be an error. We use Boston." },
  { claim: "Grandparents' origin, and whether his father was an immigrant.", note: "An HBS page calls William 'a Jewish immigrant from Eastern Europe.' Bloomberg describes his father as a working-class man from Chelsea, Massachusetts, and press calls Michael the grandson of Russian and Lithuanian immigrants. Wikipedia names a Polish-born grandfather, which we did not confirm in a primary source. We only state that the grandparents were immigrants." },
  { claim: "How often he read Johnny Tremain.", note: "'At least 50 times' (Newsweek, Politico) versus 'a hundred times' (memoir, 2022 speech). Both are his own loose counts, so we give both." },
  { claim: "Size of Medford High's class of 1960.", note: "His memoir says 250 students in each grade. Class president Richard Black told the Globe the class had 690. We avoid stating a number in the text." },
  { claim: "President of the Slide Rule Club.", note: "Politico and the Tufts Daily say Bloomberg was president. The Boston Globe, which read the 1960 yearbook and interviewed Carmen Comite, says Comite was president and Bloomberg a member, and that Bloomberg was president of the Debating Society. We follow the Globe." },
  { claim: "How young an Eagle Scout he was.", note: "He calls himself 'one of the youngest' in the organization's history. A Tufts Daily article says the youngest in the city. His biographer says before he was old enough to qualify. No official Scouting record was found, so the claim is attributed to him. He also says he was ten and in his Boy Scout troop when he read the poem, which we attribute to him too." },
  { claim: "When his father died.", note: "Death notice: 1963. University Network: April 1963, age 57. Horatio Alger says junior year; Tufts Daily says senior year; Newsweek says the year before Harvard. Bloomberg's own column says he was 21. April 1963 fits all but Tufts." },
  { claim: "First Jewish member of Phi Kappa Psi at Hopkins.", note: "Stated by the University Network and, as 'reportedly', by the Encyclopedia of World Biography. Not confirmed by the fraternity or the university. Kept as 'reportedly'." },
  { claim: "Parked cars at Hopkins.", note: "Many biographies say parking lot attendant, which is fair, and some say he parked cars. In the 1999 Hopkins oral history he says he never parked cars, only kept people out of the lot. We follow his account." },
  { claim: "Goldman's $14,000 offer, the $11,500 request and the $2,500 loan.", note: "We could only read these through a podcast reading the memoir aloud (Founders #433). CNBC independently confirms he took a job paying about 40 percent less. Attributed in the text. A fact-checker with the print book should confirm pages in chapter 2." },
  { claim: "Military outcome.", note: "Memoir: a commitment from an army unit to make him a second lieutenant, rejected at a physical three months before graduation. Newsweek says accepted into Officer Candidate School. Encyclopedia says he applied and was rejected. University Network says drafted, which looks wrong. All agree on flat feet." },
  { claim: "Partner date and titles.", note: "1972 per The New Yorker, Johns Hopkins Magazine and others. Horatio Alger says 'by 1973.' General partner in 1976 per Investopedia and Encyclopedia of World Biography. Head of equity trading: 1974 per Johns Hopkins Magazine. Written with 'about' where soft." },
  { claim: "Morning arrival time at Salomon.", note: "New Yorker and memoir readings: 7 a.m. The Observer: 6:30 a.m. We use 7." },
  { claim: "Size of his Salomon payout and partner count.", note: "Memoir: $10 million in cash and convertible bonds, 63 partners. Johns Hopkins Magazine: $10–20 million depending on when the bonds converted. The Observer: one of 62 partners sharing $233 million. We use his $10 million figure and attribute it." },
  { claim: "Why he was let go.", note: "Gutfreund (Euromoney 1999): time to move on, not going to run equities. Bloomberg: rivalry and his outspokenness. Offit (New Yorker) thinks he may have wanted out. All are recollections, so none is stated as the sole cause." },
];

const method = "Built from primary and near-primary material first: the publisher's extract of Bloomberg by Bloomberg (chapters 1 and part of 2), the 1999 Johns Hopkins oral history transcript, and his own column on Billy Salomon, then checked against the New Yorker (1997), Boston Globe (2020), Newsweek (2007), New York Observer (2001), Johns Hopkins Magazine (1996) and others. Colleagues' recollections are attributed by name. Memoir passages after the publisher's extract ends (the Salomon job offer, the vault cover story, the yacht dinner, the 'age 26' line) could only be read through a Founders podcast reading and are marked as such, so they should be checked against the print book. New York Times and Politico pages were only partly readable; only sentences visible in the retrieved text are used. No home address is given. Commons photo data comes from the Commons API.";

const book = { chapters: [origins, growingUp, firstSteps], sources: [], factCheck: { method, disputed } };
book.sources = used.map((k) => ({ label: S[k][0], url: S[k][1] }));

// Checks
const wc = (t) => (t || "").replace(/[*_=]{2}/g, "").split(/\s+/).filter(Boolean).length;
let total = 0;
for (const c of book.chapters) {
  let w = 0, run = 0, maxRun = 0;
  for (const b of c.blocks) {
    if (b.t === "p") {
      run++; maxRun = Math.max(maxRun, run);
      w += wc(b.text);
      const n = (b.text.replace(/[“"][^”"]*[”"]/g, "Q").match(/[.!?](\s|$)/g) || []).length;
      if (n > 6 || n < 2) console.log("sentence count", n, b.text.slice(0, 70));
    } else if (b.t !== "h") run = 0;
    if (b.t === "note") { if (wc(b.text) > 14) console.log("LONG NOTE", b.text); w += wc(b.text); }
    if (b.t === "quote" || b.t === "example") w += wc(b.text);
    if (b.t === "lesson") w += wc(b.text);
    if (b.t === "facts") b.items.forEach((i) => (w += wc(i.value) + wc(i.label)));
    if (b.t === "timeline") b.items.forEach((i) => (w += wc(i.when) + wc(i.text)));
    if ((b.t === "p" || b.t === "quote" || b.t === "example") && !b.src.length) console.log("NO SRC", b);
  }
  console.log(c.id, "words", w, "blocks", c.blocks.length, "max p run", maxRun);
  total += w;
}
console.log("total words", total, "sources", book.sources.length, "unused", Object.keys(S).filter((k) => !used.includes(k)));
fs.mkdirSync(require("path").dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(book, null, 2) + "\n", "utf8");
