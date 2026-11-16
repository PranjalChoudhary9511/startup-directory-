import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Instrument_Serif, Sora } from "next/font/google";
import localFont from "next/font/local";
import { SITE } from "@/content/site";
import "./globals.css";

// Overused Grotesk is an SIL OFL font, bundled in src/fonts with its licence.
const overused = localFont({
  src: "../fonts/OverusedGrotesk-VF.ttf",
  variable: "--font-overused",
  weight: "300 900",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Sora: the clean accent font (headline highlights, amounts, folder covers, closing banners).
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name}: ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${overused.variable} ${plexMono.variable} ${sora.variable} ${inter.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
