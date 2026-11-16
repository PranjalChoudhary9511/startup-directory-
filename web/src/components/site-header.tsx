import { ArrowRight, CaretDown, CaretUpDown, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Brand } from "./brand";

const LINKS = [
  { href: "/stories", label: "Stories" },
  { href: "/grants", label: "Grants" },
  { href: "/billion-dollar-pdfs", label: "Billion Dollar PDFs" },
  { href: "/graveyard", label: "Graveyard" },
  // Placeholders (both land on the home page's "beyond" section): first to go on narrow screens.
  { href: "/#beyond", label: "Books", wide: true },
  { href: "/#beyond", label: "Challenges", wide: true },
];

export function SiteHeader() {
  return (
    <header className="topbar sticky top-0 z-40">
      <div className="mx-auto flex h-full max-w-[var(--content-max)] items-center gap-6 px-5 sm:px-6">
        <Brand />
        <nav className="hidden items-center gap-4 whitespace-nowrap lg:flex xl:gap-6" aria-label="Main">
          <Link href="/pillars" className="flex h-7 items-center gap-1.5 rounded-[7px] px-[7px] text-sm font-medium hover:bg-hover">
            Learning <CaretUpDown size={13} className="text-fg2" />
          </Link>
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className={`text-[12.25px] text-fg2 transition-colors hover:text-fg1 ${"wide" in l ? "hidden xl:inline" : ""}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/#beyond" className="flex items-center gap-1 text-[12.25px] text-fg2 hover:text-fg1">
            Explore <CaretDown size={11} />
          </Link>
          <Link href="/#together" className="flex items-center gap-1 text-[12.25px] text-fg2 hover:text-fg1">
            Community <CaretDown size={11} />
          </Link>
          <Link href="/#pricing" className="text-[12.25px] text-fg2 transition-colors hover:text-fg1">
            Pricing
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <span className="hidden xl:inline-flex">
            <Link href="/p/problem" className="new-pill">
              <span>
                New in October <ArrowRight size={14} />
              </span>
            </Link>
          </span>
          <Link href="/pillars" className="icon-btn" aria-label="Search the curriculum">
            <MagnifyingGlass size={15} />
          </Link>
          <Link href="/login" className="btn-secondary">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
