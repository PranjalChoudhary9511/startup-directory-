import Link from "next/link";
import { getPillars } from "@/lib/curriculum";
import { Brand } from "./brand";

const USE = [
  { href: "/pillars", label: "Roadmap" },
  { href: "/stories", label: "Real Stories" },
  { href: "/grants", label: "Grants" },
  { href: "/graveyard", label: "Startup Graveyard" },
  { href: "/#beyond", label: "Books" },
  { href: "/#beyond", label: "Challenges" },
  { href: "/#together", label: "Build wall" },
  { href: "/#pricing", label: "Pricing" },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mono-eyebrow !text-[10px]">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[13px] text-fg2">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-divider bg-sidebar">
      <div className="mx-auto grid max-w-[var(--content-max)] gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.4fr]">
        <div className="max-w-xs">
          <Brand />
          <p className="mt-4 text-[13px] leading-relaxed text-fg2">
            Founder learning through sequenced tracks, real founder stories, weekend challenges and a grants directory for Indian builders.
          </p>
        </div>
        <Column title="Use firstrupee">
          {USE.map((l) => (
            <li key={l.label}><Link href={l.href} className="hover:text-fg1">{l.label}</Link></li>
          ))}
        </Column>
        <Column title="Pillars">
          {getPillars().map((p) => (
            <li key={p.slug}><Link href={`/p/${p.slug}`} className="hover:text-fg1">{p.title}</Link></li>
          ))}
        </Column>
        <Column title="Account">
          <li><Link href="/login" className="hover:text-fg1">Sign in</Link></li>
          <li><Link href="/#pricing" className="hover:text-fg1">Plans</Link></li>
        </Column>
        <div>
          <p className="mono-eyebrow !text-[10px]">Newsletter</p>
          <p className="mt-4 text-[13px] leading-relaxed text-fg2">One short email a week: a founder story, a new track and the grants worth applying for.</p>
          <div className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              disabled
              className="h-9 min-w-0 flex-1 rounded-[7px] border border-line bg-surface px-3 text-[13px] outline-none placeholder:text-fg3"
            />
            <button type="button" disabled className="btn-secondary !h-9 opacity-60" title="Opens with launch">
              Soon
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[var(--content-max)] flex-wrap items-center gap-x-6 gap-y-2 border-t border-divider px-5 py-5 text-[12px] text-fg3 sm:px-6">
        <span>© 2026 First Rupee</span>
        <span>Terms</span>
        <span>Privacy</span>
        <span>Refunds</span>
        <span className="ml-auto">Built in India</span>
      </div>
    </footer>
  );
}
