import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-5 py-24 text-center">
        <div>
          <p className="mono-eyebrow">404</p>
          <h1 className="accent-display mt-3 text-3xl">Track not found.</h1>
          <p className="mt-4 text-[14px] text-fg2">This page doesn&apos;t exist (yet). Pick up the roadmap, or start with the first track.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/pillars" className="btn-primary is-sm">See the roadmap</Link>
            <Link href="/" className="btn-secondary !h-10 !px-4">Home</Link>
          </div>
        </div>
      </main>
    </>
  );
}
