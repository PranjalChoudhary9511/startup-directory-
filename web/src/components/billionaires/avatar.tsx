"use client";

import { useState } from "react";

/**
 * Circular profile photo. Uses a free Wikimedia Commons photo when we have one; otherwise (or if
 * it fails to load) the plain "no profile photo" silhouette, like a social profile without a picture.
 */
export function Avatar({ src, name, size, credit, ring }: { src: string | null; name: string; size: number; credit?: string | null; ring?: boolean }) {
  const [failed, setFailed] = useState(false);
  const show = src && !failed;
  return (
    <span className={`bdp-avatar ${ring ? "has-ring" : ""}`} style={{ width: size, height: size }}>
      {show ? (
        // eslint-disable-next-line @next/next/no-img-element -- Wikimedia Commons file, credited in the title
        <img src={src} alt={name} title={credit ? `Photo: ${credit}, Wikimedia Commons` : undefined} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} />
      ) : (
        <Silhouette />
      )}
    </span>
  );
}

export function Silhouette() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <rect width="100" height="100" fill="#e6e6e9" />
      <circle cx="50" cy="40" r="17" fill="#c4c4ca" />
      <path d="M17 92c3-19 17-29 33-29s30 10 33 29" fill="#c4c4ca" />
    </svg>
  );
}
