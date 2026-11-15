# Website Spec: MVP to v2

## 1. Design direction ("clean like fanout, but ours")

**Take from fanout (principles, not pixels):**
- A calm off-white canvas, near-black text, generous whitespace.
- Strong display type for headlines, a mono font for numbers and labels (`01.03`, `13 TRACKS`, `FREE`).
- The curriculum is the hero: pillar → module grid → numbered track list, with a list/grid toggle.
- A left sidebar inside a course, with a progress tick per track.
- Small uppercase labels ("PICK YOUR PATH", "INSIDE THE BOX") as section eyebrows.
- A logo strip for social proof (colleges and companies where learners come from).
- Pricing: 3 clear cards, with regional pricing applied automatically.

**Make it ours:**
- One warm accent colour (e.g. saffron/marigold or deep green) with a distinct colour per pillar (8 pillar colours, used consistently in videos, notes and the site).
- Founder-energy copy: "From problem to first ₹", not academic language.
- Your face on the homepage: a 60-second trailer video.
- Hindi/Hinglish toggle later.
- Write all copy from scratch. Don't reuse fanout's text or exact layouts.

## 2. Sitemap

```
/                         Home: trailer, the 8 pillars, how it works, outcomes, pricing, FAQ
/pillars                  All pillars (roadmap view)
/p/problem                Pillar overview: modules grid + full track list (like fanout /system/overview)
/p/problem/01-01          Track page: video, notes, task, quiz, sources, next track
/dossier                  My Founder Dossier (private edit view)
/@username                Public Dossier (shareable)
/grants                   Grants & schemes directory (filters, eligibility quiz)
/grants/[slug]            Scheme detail page (SEO)
/books                    Books by pillar ("if you read only 1/3/10")
/books/[slug]             Book page with your take + affiliate link
/stories                  Real Stories index (filter by sector, model: D2C/B2B/B2G…)
/stories/[slug]           Long-form founder story (SEO + social)
/challenges               This weekend's challenge, past winners, leaderboard
/challenges/[slug]        Brief, rubric, submissions, results
/community                Study wall / learning logs (v2)
/pricing                  Plans
/schools                  B2B page for schools & colleges (v2)
/blog                     Build-in-public updates
/login, /account, /terms, /privacy, /refunds
```

## 3. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript + Tailwind** | SEO for stories/grants/books, fast, huge ecosystem, works well with Claude Code |
| Auth + DB + storage | **Supabase** (Postgres, Auth with Google + phone OTP, Storage) | Quick to build; row-level security; generous free tier |
| Content (notes, stories, books) | **MDX in the repo** to start → **Sanity** CMS once a non-dev writes content | Versioned, fast, cheap |
| Video | **VdoCipher** (DRM + dynamic watermark, India-based) or **Bunny Stream** (cheaper, token auth) | Course piracy on Telegram is a real threat in India |
| Payments | **Razorpay** (UPI, cards, UPI AutoPay subscriptions, payment links) | India-first; Stripe as a fallback for international buyers |
| Hosting | **Vercel** | Zero-ops |
| Analytics | **PostHog** (funnels, retention, feature flags) + GA4 | Product + marketing views |
| Email / WhatsApp | **Resend** (email) + **WhatsApp Cloud API** via Interakt/AiSensy/Gupshup | Indian users answer WhatsApp, not email |
| AI coach | **Claude API** with your rubrics as system prompts | Reviews learner deliverables |
| Search | Postgres full-text first → Algolia/Typesense later | Search across tracks, stories, grants |

## 4. Data model (core tables)

```
users            id, name, phone, email, username, persona (student/professional/school), plan, created_at
pillars          id, slug, number, title, color, description, is_published
modules          id, pillar_id, number, title, is_free, deliverable_title
tracks           id, module_id, number, slug, title, video_id, duration_min, notes_mdx, task_md, kind (cinematic/screen), is_published, refresh_due_at
quiz_questions   id, track_id, question, options[], answer_index, explanation
progress         user_id, track_id, status (started/completed), completed_at
deliverables     id, user_id, module_id, content (json/rich text), files[], ai_feedback, is_public, submitted_at
subscriptions    id, user_id, plan, razorpay_sub_id, status, current_period_end
grants           id, slug, name, run_by, type, max_amount_inr, eligibility, stages[], sectors[], states[], deadline, status, official_url, last_verified_at
books            id, slug, title, author, pillar_ids[], our_take, affiliate_url, rank_in_pillar
stories          id, slug, founder, company, sector, model (D2C/B2B/B2G/…), country, body_mdx, sources[], related_track_ids[]
challenges       id, slug, title, brief, rubric, sponsor, prize_pool, opens_at, closes_at, status
submissions      id, challenge_id, user_id, content, score, rank
```

## 5. MVP scope (build in 6–8 weeks)

**Must have (launch):**
- [ ] Home page with trailer + waitlist / Founding Member checkout
- [ ] Auth (Google + phone OTP)
- [ ] Pillar overview pages + track pages (video, notes, task, quiz)
- [ ] Free/paid gating per module
- [ ] Progress tracking + "continue where you left off"
- [ ] Razorpay: one-time (Founding Member) + subscription (Pro)
- [ ] Grants directory with filters (seed data from 05-grants-and-competitors.md)
- [ ] Books page (30 books)
- [ ] Real Stories (10 stories at launch)
- [ ] Basic Founder Dossier (submit a deliverable per module; public profile toggle)
- [ ] Legal pages (terms, privacy compliant with the DPDP Act, refunds)

**v1.5 (months 2–4):**
- [ ] AI coach feedback on deliverables
- [ ] Weekend challenges: brief, submit, judge, leaderboard
- [ ] WhatsApp lifecycle nudges ("You're 2 tracks from finishing Module 1")
- [ ] Streaks & completion certificates (shareable on LinkedIn)
- [ ] Grant eligibility quiz + deadline alerts

**v2 (months 5–9):**
- [ ] Community / study wall
- [ ] School & college dashboard (teacher view, cohort progress, seat licences)
- [ ] Hindi / Hinglish versions
- [ ] Mobile app (or a PWA first)
- [ ] Live cohort ("Launchpad") support: calendar, sessions, demo day

## 6. Home page wireframe (top to bottom)

1. **Nav:** Logo · Pillars · Stories · Grants · Books · Challenges · Pricing · [Start free]
2. **Hero:** "From problem to first ₹." + subline ("The founder curriculum India never had: 8 pillars, 400 tracks, real deliverables.") + [Start free] [Watch the trailer] + floating cards (a track card, a grant card, a story card), the same idea as fanout's floating paper cards.
3. **Logo strip:** colleges and companies learners come from.
4. **The 8 pillars:** cards with their colour, track counts and "FREE" badges.
5. **How it works:** Learn → Do → Build your Dossier → Launch.
6. **Inside the box:** Tracks · Notes · AI Coach · Challenges · Stories · Grants · Books.
7. **Outcomes:** Dossiers published, first sales made (once you have the numbers).
8. **A sample track:** play P1.01.01 free, right on the page.
9. **Pricing:** Monthly / Annual / Founding Member.
10. **FAQ:** "I'm 16, is this for me?", "I have a job, how much time does it take?", "Is this only for tech startups?"
11. **Footer CTA:** "Your first track takes 18 minutes. Start now."

## 7. Building it

You've built a fanout-style site before with Claude Code. Do the same here:
1. Scaffold Next.js + Tailwind + Supabase.
2. Build the content structure first (pillars → modules → tracks from 02-curriculum-map.md as seed JSON).
3. Then the track page, then payments, then grants/books/stories.
4. Deploy to Vercel on a preview URL from week 1, and show it to 10 target users every week.
