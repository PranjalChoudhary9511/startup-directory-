"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Companies decoded inside the tracks. Plates are monograms, not the companies' logos.
const COMPANIES = [
  { name: "Zomato", article: "a", mono: "z", color: "#E23744" },
  { name: "Amul", article: "an", mono: "A", color: "#1F5FAD" },
  { name: "Zerodha", article: "a", mono: "Z", color: "#387ED1" },
  { name: "Tata", article: "a", mono: "T", color: "#2D4E8A" },
  { name: "Rolex", article: "a", mono: "R", color: "#0B6B3A" },
  { name: "Nykaa", article: "a", mono: "N", color: "#E8336D" },
  { name: "Zoho", article: "a", mono: "Z", color: "#D9302C" },
  { name: "Lenskart", article: "a", mono: "L", color: "#11A5B0" },
  { name: "Apple", article: "an", mono: "A", color: "#272727" },
  { name: "boAt", article: "a", mono: "b", color: "#C8102E" },
];

function Company({ c }: { c: (typeof COMPANIES)[number] }) {
  return (
    <span className="hero-company">
      <span className="hero-plate" style={{ background: c.color }} aria-hidden>
        {c.mono}
      </span>
      <span>{c.name}</span>
    </span>
  );
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function RotatingCompany() {
  const [i, setI] = useState(0);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const measureRef = useRef<HTMLSpanElement>(null);
  const c = COMPANIES[i];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % COMPANIES.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  useIsoLayoutEffect(() => {
    if (measureRef.current) setWidth(Math.ceil(measureRef.current.getBoundingClientRect().width));
  }, [i]);

  return (
    <>
      <span>{c.article}</span>
      <span className="hero-slot" style={{ width }} aria-live="polite" aria-atomic="true">
        <Company key={c.name} c={c} />
      </span>
      <span ref={measureRef} aria-hidden className="pointer-events-none invisible absolute">
        <Company c={c} />
      </span>
    </>
  );
}
