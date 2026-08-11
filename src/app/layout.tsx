import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { fontBody, fontDisplay, fontMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "A 72-hour software studio. You bring the idea; one operator hands back a deployed, working MVP.",
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
