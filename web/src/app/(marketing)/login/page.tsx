import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-5 py-20">
      <div className="grid-card w-full p-8 text-center">
        <div className="flex justify-center"><BrandMark size={44} /></div>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Accounts open with launch</h1>
        <p className="mt-3 text-[13px] leading-relaxed text-fg2">
          Google and phone sign-in arrive with the founding-member launch. Until then, every free track works without an account and your progress is saved in this browser.
        </p>
        <div className="mt-6 flex justify-center gap-2.5">
          <Link href="/pillars" className="btn-primary is-sm">Choose a pillar</Link>
          <Link href="/pillars" className="btn-secondary !h-10">See the roadmap</Link>
        </div>
      </div>
    </section>
  );
}
