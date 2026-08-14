import type { Metadata } from "next";
import { PostHogProvider } from "./providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BRAND, SITE_URL } from "@/lib/site";
import { fontBody, fontDisplay, fontMono } from "./fonts";
import "./globals.css";

const DESCRIPTION =
  "A 72-hour software studio. You bring the idea; one operator hands back a deployed, working MVP.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_BRAND,
    template: `%s · ${SITE_BRAND}`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_BRAND,
    title: SITE_BRAND,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_BRAND,
    description: DESCRIPTION,
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
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-body text-text">
        <JsonLd />
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
