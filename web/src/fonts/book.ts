import { Caveat, EB_Garamond, Kalam } from "next/font/google";

// Billion Dollar PDFs book fonts, loaded only on the directory and reader pages.
// EB Garamond: the book's body text. Kalam: handwritten headings in marker.
// Caveat: margin notes in pen.
const garamond = EB_Garamond({
  variable: "--font-book-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const kalam = Kalam({
  variable: "--font-book-hand",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const caveat = Caveat({
  variable: "--font-book-pen",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const BOOK_FONTS = `${garamond.variable} ${kalam.variable} ${caveat.variable}`;
