import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "First Rupee: from problem to first ₹", template: "%s · First Rupee" },
  description:
    "The founder curriculum India never had: 8 pillars, 400+ tracks, real deliverables, plus a free grants directory and real founder stories.",
};

const NAV = [
  { href: "/pillars", label: "Pillars" },
  { href: "/stories", label: "Stories" },
  { href: "/grants", label: "Grants" },
  { href: "/#pricing", label: "Pricing" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-sm text-accent-ink">₹</span>
              First Rupee
            </Link>
            <div className="ml-auto hidden items-center gap-6 text-sm text-muted sm:flex">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </div>
            <Link
              href="/p/problem"
              className="ml-auto rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas hover:bg-ink/85 sm:ml-0"
            >
              Start free
            </Link>
          </nav>
          <div className="flex gap-5 overflow-x-auto px-4 pb-2 text-sm text-muted sm:hidden">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="shrink-0 hover:text-ink">
                {n.label}
              </Link>
            ))}
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
            <span>First Rupee (working name) · local preview build</span>
            <span className="font-mono text-xs">Content seeded from the repo&apos;s planning docs</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
