import type { Metadata } from "next";
import { fontBody, fontDisplay, fontMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SprintZero Studios",
    template: "%s · SprintZero Studios",
  },
  description: "MVPs shipped in 72 hours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-body text-text">
        {children}
      </body>
    </html>
  );
}
