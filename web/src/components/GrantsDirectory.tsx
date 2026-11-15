"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Grant } from "@/lib/content";

const STATUS_STYLE: Record<string, string> = {
  Open: "bg-emerald-100 text-emerald-800",
  Closed: "bg-stone-200 text-stone-600",
  Check: "bg-amber-100 text-amber-800",
};
const STATUS_LABEL: Record<string, string> = { Open: "Open", Closed: "Closed", Check: "Check status" };

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="eyebrow mr-1 w-14">{label}</span>
      {["All", ...options].map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full border px-3 py-1 text-xs transition ${value === o ? "border-ink bg-ink text-canvas" : "border-line bg-paper text-muted hover:text-ink"}`}
        >
          {o === "Check" ? "Check status" : o}
        </button>
      ))}
    </div>
  );
}

export function GrantsDirectory({ grants }: { grants: Grant[] }) {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("All");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");

  const types = useMemo(() => [...new Set(grants.map((g) => g.type))].sort(), [grants]);

  const shown = grants.filter((g) => {
    if (level !== "All" && g.level !== level) return false;
    if (type !== "All" && g.type !== type) return false;
    if (status !== "All" && g.status !== status) return false;
    if (q) {
      const hay = `${g.name} ${g.runBy} ${g.gives} ${g.eligibility ?? ""} ${g.state ?? ""}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="mt-8">
      <div className="space-y-3 rounded-2xl border border-line bg-paper p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, state, sector or what it gives…"
          className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-ink"
        />
        <Chips label="Level" options={["Central", "State", "Private"]} value={level} onChange={setLevel} />
        <Chips label="Type" options={types} value={type} onChange={setType} />
        <Chips label="Status" options={["Open", "Check", "Closed"]} value={status} onChange={setStatus} />
      </div>

      <p className="mt-6 font-mono text-xs text-muted">
        {shown.length} OF {grants.length} SCHEMES
      </p>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {shown.map((g) => (
          <Link
            key={g.slug}
            href={`/grants/${g.slug}`}
            className="flex flex-col rounded-xl border border-line bg-paper p-5 transition hover:shadow-md"
          >
            <div className="flex items-center gap-2 font-mono text-[0.68rem] text-muted">
              <span>{g.level === "State" ? g.state?.toUpperCase() : g.level.toUpperCase()}</span>
              <span>·</span>
              <span>{g.type.toUpperCase()}</span>
              <span className={`ml-auto rounded-full px-2 py-0.5 font-sans text-[0.7rem] ${STATUS_STYLE[g.status] ?? ""}`}>
                {STATUS_LABEL[g.status] ?? g.status}
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold">{g.name}</h3>
            <p className="text-xs text-muted">{g.runBy}</p>
            <p className="mt-3 text-sm">{g.gives}</p>
            {g.unverified && <p className="mt-3 text-xs text-amber-700">Some figures unverified</p>}
          </Link>
        ))}
      </div>
      {shown.length === 0 && <p className="mt-6 text-sm text-muted">No schemes match those filters.</p>}
    </div>
  );
}
