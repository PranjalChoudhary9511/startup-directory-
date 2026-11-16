// Line illustrations for the "Beyond the tracks" cards. Drawn in currentColor.

const common = { width: 160, height: 160, viewBox: "0 0 160 160", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const SURFACE_ART: Record<string, React.ReactNode> = {
  grants: (
    <svg {...common}>
      <rect x="34" y="22" width="78" height="104" rx="6" />
      <path d="M48 46h50M48 60h50M48 74h30" />
      <circle cx="104" cy="108" r="26" fill="currentColor" fillOpacity="0.12" />
      <circle cx="104" cy="108" r="26" />
      <path d="M95 97h18M95 104h18M101 97c10 0 10 14 0 14h-4l14 12" />
    </svg>
  ),
  stories: (
    <svg {...common}>
      <path d="M80 44c-14-10-34-12-52-8v80c18-4 38-2 52 8 14-10 34-12 52-8V36c-18-4-38-2-52 8z" />
      <path d="M80 44v80" />
      <path d="M42 56c10-1 20 0 28 4M42 72c10-1 20 0 28 4M90 60c8-4 18-5 28-4M90 76c8-4 18-5 28-4" />
    </svg>
  ),
  books: (
    <svg {...common}>
      <rect x="28" y="40" width="22" height="88" rx="3" />
      <rect x="54" y="28" width="22" height="100" rx="3" fill="currentColor" fillOpacity="0.12" />
      <rect x="80" y="48" width="22" height="80" rx="3" />
      <path d="M108 52l20-6 22 76-20 6z" />
      <path d="M22 132h116" />
    </svg>
  ),
  challenges: (
    <svg {...common}>
      <path d="M52 30h56v26a28 28 0 0 1-56 0z" fill="currentColor" fillOpacity="0.12" />
      <path d="M52 30h56v26a28 28 0 0 1-56 0z" />
      <path d="M52 40H36a16 16 0 0 0 18 22M108 40h16a16 16 0 0 1-18 22" />
      <path d="M80 84v18M62 128h36M68 128l4-26h16l4 26" />
    </svg>
  ),
  roadmap: (
    <svg {...common}>
      <path d="M30 128c30 0 20-40 50-40s20-44 50-44" strokeDasharray="5 7" />
      <circle cx="30" cy="128" r="8" fill="currentColor" fillOpacity="0.12" />
      <circle cx="80" cy="88" r="8" />
      <circle cx="130" cy="44" r="10" fill="currentColor" fillOpacity="0.12" />
      <path d="M130 34V18l14 6-14 6" />
    </svg>
  ),
  dossier: (
    <svg {...common}>
      <path d="M24 46h40l10 12h62v70H24z" fill="currentColor" fillOpacity="0.12" />
      <path d="M24 46h40l10 12h62v70H24z" />
      <path d="M60 94l14 14 28-30" strokeWidth="3" />
    </svg>
  ),
  coach: (
    <svg {...common}>
      <path d="M28 40h86a10 10 0 0 1 10 10v44a10 10 0 0 1-10 10H70l-24 20v-20H28a10 10 0 0 1-10-10V50a10 10 0 0 1 10-10z" />
      <path d="M40 62h56M40 80h36" />
      <path d="M128 18l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="currentColor" />
    </svg>
  ),
  wall: (
    <svg {...common}>
      <rect x="22" y="26" width="50" height="44" rx="4" fill="currentColor" fillOpacity="0.12" />
      <rect x="82" y="22" width="56" height="54" rx="4" />
      <rect x="26" y="80" width="54" height="52" rx="4" />
      <rect x="88" y="86" width="48" height="44" rx="4" fill="currentColor" fillOpacity="0.12" />
      <path d="M32 40h28M94 38h32M94 50h24M38 96h30M38 108h20" />
    </svg>
  ),
};
