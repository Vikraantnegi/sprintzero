import type { Metadata } from "next";
import { Figtree, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "SprintZero Studios — MVP in 72 Hours",
    template: "%s · SprintZero Studios",
  },
  description:
    "SprintZero Studios designs and ships investor-ready MVPs in 72 hours. Strategy, product, design, and engineering — compressed into one focused sprint.",
  metadataBase: new URL("https://sprintzero.studio"),
  openGraph: {
    title: "SprintZero Studios — MVP in 72 Hours",
    description:
      "From idea to live product in three days. We build the MVP founders need to validate, demo, and raise.",
    type: "website",
    siteName: "SprintZero Studios",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-chalk">{children}</body>
    </html>
  );
}
