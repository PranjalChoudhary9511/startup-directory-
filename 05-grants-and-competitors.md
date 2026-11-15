# Competitors, Market Signals & Grants Directory (seed data)

*Researched 26 Oct 2026. Many government portals didn't load during research, so several figures come from secondary sources and are marked **unverified**. **Verify every figure on the official URL before publishing it on the site.***

---

## Part A: Competitive landscape

### The most important signal: WebVeda shut down (May 2026)
Ankur Warikoo's course business (around 5 lakh students, reported ₹100 Cr+ revenue and ~₹25 Cr profit) was reportedly **shut down in May 2026**. Asked about AI's impact, he answered "huge". [indiatvnews](https://www.indiatvnews.com/trending/news/ankur-warikoo-shuts-down-profitable-rs-100-crore-courses-business-hints-at-huge-ai-impact-2026-05-16-1041375)

**What it means for us:** cheap, generic "information" video courses are being commoditised by AI. Anyone can ask Claude "how do I find a startup idea?" So **our moat cannot be information.** It has to be:
1. **Outcomes and accountability:** deliverables, a Founder Dossier, the first sale.
2. **Lived, India-specific operating knowledge** that AI gets wrong or vague: supplier visits, negotiation, GeM tenders, distributor margins.
3. **Story depth and taste:** curated, verified, emotionally gripping founder stories.
4. **Community and live events:** weekend challenges, demo days, peer groups. AI can't replace these.
5. **A trusted face:** you.

### Map of the market

| Segment | Players | Price | Why they don't own our space |
|---|---|---|---|
| ₹50L+ residential degrees | Masters' Union UG (~₹52L+ tuition), Tetr (~$25–32K/yr, unverified) | Very high | Elite, offline, tiny cohorts. Tetr's "launch 3 ventures" model is the closest idea to ours, but it isn't mass-market |
| Job-outcome cohorts | Kraftshala (₹1.49–1.64L), Outskill/Growth School (~₹95K–1.14L, unverified) | High | Built for jobs, not founding. Outskill reviews complain about pressure selling, which leaves room for a trust-first brand |
| Teen camps | Moonpreneur (US-focused), ThinkStartup, White Canvas, BITS/EDII summer camps, IIT-M E-Cell YES | Varies | Fragmented, seasonal, small |
| Free government | Delhi EMC + Business Blasters, CBSE Entrepreneurship elective (066), Atal Tinkering Labs (~10K, with 50K more announced) | Free | Theory- or hardware-heavy; very little AI, sales or branding. **These are potential partners, not competitors** |
| Creator/low-ticket | Warikoo/WebVeda (shut down), Josh Talks/Skills (₹99–399, ~₹18.7 Cr FY24 revenue, loss-making) | Low | Commoditised by AI; shallow |
| Big edtech | upGrad (absorbed Unacademy, Sept 2026); ran the free Startup India Learning Program | — | Entrepreneurship isn't their focus |
| Global | YC Startup School (free), MasterClass, Maven, Founder Institute ($1,099+) | — | US/SaaS-centric; no Indian operating reality; nothing for teens |

**Conclusion (inference):** no Indian player owns "an end-to-end, applied founder curriculum for 16–35" yet. The gap is real. But the Warikoo exit says the format has to be **outcome + community + depth**, not "a library of videos".

### Market climate
- Indian edtech raised **$214M across 36 rounds in Jan–Aug 2026** (vs $4.3B in 2021). Investors now fund business models, not hype, so plan to be capital-efficient and presale-funded. [Entrepreneur/Tracxn](https://india.entrepreneur.com/business-news/indias-edtech-sector-moves-from-funding-led-growth-to-model-led-consolidation-tracxn)
- Meta ad benchmarks for Indian education (agency blogs only, **low reliability**): ~₹150–800 per lead, ~₹1,200–1,450 per sale on low-ticket courses, ₹90–250 CPM. Measure your own numbers with small tests.

---

## Part B: Grants Directory, seed data

> **Superseded (27 Oct 2026):** the full, verified directory now lives in the website's Grants Vault (`/grants`), with 100 entries (central, 28 states/UTs, private and global) written to the SOP in [07-grants-sop.md](07-grants-sop.md). The data files are in `web/src/content/grants/data/`. The table below is the original quick list, kept for reference.

Use this as the first data set for the website's Grants section. Suggested fields per entry: `name, run_by, type (grant/loan/guarantee/equity/fellowship/credits), max_amount, eligibility, stage, sectors, states, deadline, status, official_url, last_verified`.

### Central government

| Scheme | Run by | What it gives | Eligibility (short) | Stage | Official URL | Status |
|---|---|---|---|---|---|---|
| Startup India Seed Fund (SISFS) | DPIIT, via incubators | Grant up to ₹20L (PoC); up to ₹50L debt/convertible | DPIIT-recognised; apply through an approved incubator | Idea → early revenue | https://seedfund.startupindia.gov.in | **Closed to new startup applications on 31 May 2026** (official portal notice); disbursals to selected startups continue |
| DPIIT Startup Recognition | DPIIT | Gateway to SISFS/FFS/CGSS; 80-IAC tax holiday for 3 of 10 years (needs separate approval) | Pvt Ltd/LLP/partnership under 10 yrs old, turnover under ₹100 Cr | Any | https://www.startupindia.gov.in | Current |
| NIDHI-PRAYAS | DST, via incubators | Up to ₹10L for a prototype | Individual/startup, physical product | Prototype | https://nidhi.dst.gov.in | Amount from incubator pages |
| NIDHI-EIR | DST, via incubators | Fellowship ~₹30K/month for 12–18 months | Aspiring full-time founders | Pre-incorporation | https://nidhi.dst.gov.in | **Unverified** amount |
| MeitY TIDE 2.0 | MeitY, via 51 incubators | Up to ₹7L prototype grant + EIR | ICT/emerging-tech startups | Prototype | https://msh.meity.gov.in | **Unverified** |
| MeitY SAMRIDH | MeitY | Accelerator + matching investment | Software product startups | Early traction | https://msh.meity.gov.in | **Unverified** |
| MeitY GENESIS | MeitY | ₹490 Cr scheme for Tier-2/3 tech startups | Tier-2/3 tech startups | Early | https://msh.meity.gov.in | **Unverified** |
| Atal Innovation Mission 2.0 / ANIC | NITI Aayog | Incubation; ANIC grant up to ₹1 Cr | Prototype-stage, sector challenges | Prototype → market | https://aim.gov.in | No current deadline found |
| MSME Idea Hackathon / Incubation | Ministry of MSME | Up to ₹15L per idea + incubation | Ages 18–60 | Idea | https://my.msme.gov.in | 5.0 closed Jul 2025; next edition **unverified** |
| BIRAC BIG | DBT/BIRAC | Grant up to ₹50L over 18 months | Biotech company under 5 years old | Idea → PoC | https://birac.nic.in | Twice-yearly calls |
| Stand-Up India | DFS, via banks | Bank loan ₹10L–₹1 Cr | SC/ST or women founders, greenfield | Launch | https://www.standupmitra.in | Post-FY25 status **unverified** |
| PMEGP | KVIC | 15–35% margin-money subsidy (projects up to ₹50L mfg / ₹20L service) | Over 18, new unit | Launch | https://www.kviconline.gov.in/pmegpeportal | Post-FY26 **unverified** |
| CGTMSE | SIDBI | Collateral-free loan guarantee up to ₹10 Cr | Micro & small enterprises | Any | https://www.cgtmse.in | Current |
| CGSS | DPIIT/NCGTC | Guarantee on venture debt up to ₹20 Cr | DPIIT startups | Post-revenue | https://www.startupindia.gov.in | Current |
| Fund of Funds 2.0 (indirect) | SIDBI | ₹10,000 Cr into VC funds | Accessed through VCs | Seed → growth | https://www.sidbivcf.in | Approved Feb 2026 |
| RDI Scheme | DST/ANRF | Low/nil-interest long-term loans + equity for deep tech (no grants) | TRL-4+ deep tech | Growth R&D | https://dst.gov.in/node/8255 | Rolled out Nov 2025 |

### State government

| State | Scheme | Gives | Official URL | Status |
|---|---|---|---|---|
| Karnataka | ELEVATE / ELEVATE NxT | Up to ₹50L grant; NxT up to ₹1 Cr for deep tech | https://startup.karnataka.gov.in | 2025 round: 146 winners |
| Kerala | KSUM Grants | Idea ₹3L · Productisation ₹7L (₹12L for women/transgender founders) · Scale-up ₹15L | https://grants.startupmission.in | Current |
| Tamil Nadu | TANSEED | ₹10L (₹15L green/rural/women-led) for ~3% equity | https://startuptn.in | 8.0 closed Dec 2025 |
| Gujarat | SSIP 2.0 | Up to ₹2.5L PoC grant for students/alumni up to 35 | https://ssipgujarat.in | Policy to Mar 2027 |
| Maharashtra | MSInS | Seed support; Startup Week pilot work orders up to ₹15L | https://msins.in | 2025 policy; details **unverified** |
| Uttar Pradesh | UP Startup Policy | ₹17,500/month sustenance for 1 yr; up to ₹7.5L seed/marketing; prototype grant up to ₹5L | https://startinup.up.gov.in | Current policy page |
| Odisha | Startup Odisha | ~₹20–22K/month allowance; up to ₹15L product/marketing support | https://startupodisha.gov.in | Amounts **unverified** |
| Rajasthan | iStart | Ideation sustenance allowance | https://istart.rajasthan.gov.in | **Unverified** |
| Telangana | T-Hub / T-Works | Incubation, hardware prototyping | https://t-hub.co | No cash grant found |

### Corporate & foundation programmes

| Programme | Gives | URL |
|---|---|---|
| Google for Startups Accelerator: India | 3-month equity-free accelerator (AI-first) | https://startup.google.com |
| AWS Activate | Cloud credits (~$1K self-serve, more via partners) | https://aws.amazon.com/activate |
| Microsoft for Startups | Up to $5K Azure without investor backing (changed Jul 2025) | https://www.microsoft.com/startups |
| Wadhwani Foundation (Liftoff etc.) | Free, zero-equity programmes | https://wadhwanifoundation.org |
| Villgro | Social-enterprise incubation | https://villgro.org |

### Directory features to build
- Filters: state · sector · stage · type · amount · "open now".
- "Am I eligible?" quiz → a matched list. Gate the full report behind email signup: this is your best lead magnet.
- Deadline alerts by WhatsApp/email.
- Every entry shows a **last verified** date. Assign someone to re-verify monthly.
- Link each scheme to the matching tracks (e.g. SISFS → P8 "Funding").
