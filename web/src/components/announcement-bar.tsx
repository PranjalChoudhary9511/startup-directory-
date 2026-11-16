"use client";

import { ArrowRight, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="announce">
      <div className="relative mx-auto flex min-h-11 max-w-[var(--content-max)] items-center justify-center px-12 py-2">
        <Link href="/p/problem" className="flex items-center gap-2 text-[13px] font-semibold sm:text-sm">
          <span className="live-pill">Live</span>
          <span>Pillar 1: Problem is live</span>
          <span className="hidden items-center gap-1 text-[12px] font-medium text-fg1 sm:inline-flex">
            Start the pillar <ArrowRight size={12} />
          </span>
        </Link>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setOpen(false)}
          className="absolute right-4 grid h-7 w-7 place-items-center rounded-md text-fg2 hover:bg-hover hover:text-fg1"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
