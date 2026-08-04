import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

// Fraunces variable + opsz axis (weight range 300–700 via variable font).
// next/font: axes require weight nonexistent or "variable" — not a fixed array.
export const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

export const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});
