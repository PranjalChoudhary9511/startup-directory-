import { ArrowRight, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { RotatingCompany } from "./rotating-company";

function BookStack() {
  return (
    <div className="book-stack">
      <div className="book book-back" style={{ background: "#2f5a3c", color: "#f4d35e" }}>
        <p className="accent-display text-[15px] leading-[1.05]">Field<br />Notes</p>
        <p className="mt-3 font-mono text-[7px] tracking-[0.12em] uppercase opacity-80">Pillar 03 · Research</p>
      </div>
      <div className="book book-middle" style={{ background: "#f3efe6", color: "#8a1c1c" }}>
        <p className="font-mono text-[8px] tracking-[0.14em] uppercase">Build a</p>
        <p className="mt-1 text-[19px] leading-[0.95] font-bold tracking-[-0.03em]">Brands people remember</p>
        <span className="absolute top-4 right-3 h-8 w-8 rounded-full border-[4px] border-[#8a1c1c]" />
      </div>
      <div className="book book-front" style={{ background: "#fbfbfb", color: "#272727", padding: 12 }}>
        <div className="grid grid-cols-2 gap-1.5">
          <span className="rounded-sm bg-[#f4d35e] px-1.5 py-1 text-[9px] font-semibold">Why?</span>
          <span className="row-span-2 rounded-sm bg-[#e4402c] px-1.5 py-1 text-[9px] font-semibold text-white">Who pays?</span>
          <span className="rounded-sm bg-[#8fc1ff] px-1.5 py-1 text-[9px] font-semibold">Who?</span>
        </div>
        <div className="mt-2 grid grid-cols-6 gap-1">
          {["#2ab673", "#2ab673", "#e9b949", "#2f7cf6", "#e4402c", "#6e56cf", "#2ab673", "#e9b949", "#2ab673", "#2f7cf6", "#2ab673", "#e8822a"].map((c, i) => (
            <span key={i} className="h-3 w-3 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <p className="mt-3 font-serif text-[13px] leading-tight">The Problem Notebook</p>
        <p className="mt-1 font-mono text-[7px] text-fg2">firstrupee · pillar 01</p>
      </div>
    </div>
  );
}

function Artifacts() {
  return (
    <div className="artifacts" aria-hidden>
      <BookStack />

      <div className="art-card research-note">
        <div className="art-kicker">Founder note · 012</div>
        <div className="art-title">Zomato started with a menu card</div>
        <p>Colleagues kept hunting for nearby menus at lunch. The first product was scanned menu cards, put online.</p>
        <div className="art-rule" />
        <p>Ask: who is suffering today, and what do they already pay to cope?</p>
      </div>

      <div className="session-strip">
        <span className="session-status">Track checkpoint</span>
        <span className="session-progress">
          <i /><i /><i /><i /><i /><i />
        </span>
        <span className="session-time">18 / 25 min</span>
      </div>

      <div className="art-card paper-sheet">
        <div className="paper-stamp">Case</div>
        <div className="paper-heading">How Amul cut out the milk middleman</div>
        <div className="paper-authors">Real Stories · Anand, 1946</div>
        <div className="paper-columns"><span /><span /></div>
        <div className="paper-figure">
          {[14, 22, 27, 35, 40].map((h) => <i key={h} style={{ height: h }} />)}
        </div>
      </div>

      <div className="art-card decision-note">
        <div className="art-kicker">Market review · decision 03</div>
        <div className="art-title">Find the real landed cost</div>
        <p>
          At ₹180 a unit from Tiruppur, freight and GST push you past the ₹299 price point. Re-open the <mark>supplier</mark> before you print packaging.
        </p>
        <div className="decision-meta">5 quotes · costing sheet attached</div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="home-title">
      <div className="hero-glow" />
      <Artifacts />
      <div className="hero-content">
        <Link href="/p/problem" className="launch-chip">
          <span className="live-pill">Live</span>
          <strong>Problem pillar is live</strong>
          <small>New pillar</small>
          <ArrowRight size={14} />
        </Link>
        <h1 id="home-title" className="hero-title">
          <span className="hero-line">
            <span>Everything</span>
            <RotatingCompany />
          </span>
          <span className="hero-line">
            founder knows. <span className="hero-decoded">Decoded.</span>
          </span>
        </h1>
        <div className="hero-copy">
          <p>
            Learn what it takes to build from zero: sequenced tracks in problem solving, market research, AI, branding, marketing and sales, for students, builders and first-time founders.
          </p>
        </div>
        <div className="hero-actions">
          <Link href="/pillars" className="btn-primary">
            Start learning free <ArrowRight size={16} />
          </Link>
          <Link href="/p/problem/01-01" className="hero-secondary">
            <PlayCircle size={18} /> <span>See demo</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
