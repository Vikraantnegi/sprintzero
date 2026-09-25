import type { Metadata } from "next";
import { Grain } from "@/components/foundation";
import {
  LenisProvider,
  MarketingShell,
  Section,
} from "@/components/layout";
import {
  Hero,
  HowWeWork,
  Pricing,
  Questions,
  RecentBuild,
  TheInternalEngine,
  TheStack,
  WhatWeBuild,
} from "@/components/sections";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { BrandStrip, Footer } from "@/components/ui";
import { SITE_BRAND } from "@/lib/site";

const TITLE = `${SITE_BRAND} · MVP development in 72 hours`;
const DESCRIPTION =
  "MVP development in 72 hours from a one-operator software studio in India. You bring the idea; you get a deployed, working MVP. Fixed scope, from $1,500, and you own the code.";

// Nested openGraph/twitter objects replace (not merge with) the layout's,
// so type/siteName/card must be restated here.
export const metadata: Metadata = {
  title: {
    absolute: TITLE,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_BRAND,
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Home() {
  return (
    <>
      <FaqJsonLd />
      {/* ONE global grain — shell level only */}
      <Grain />
      <LenisProvider>
        <MarketingShell>
          <main>
            {/* 00 — Hero + BrandStrip */}
            <Section id="hero" hero bleed={<BrandStrip />}>
              <Hero />
            </Section>

            <Section id="what-we-build">
              <WhatWeBuild />
            </Section>

            <Section id="how-we-work">
              <HowWeWork />
            </Section>

            <Section id="the-internal-engine">
              <TheInternalEngine />
            </Section>

            <Section id="the-stack">
              <TheStack />
            </Section>

            <Section id="recent-build">
              <RecentBuild />
            </Section>

            <Section id="questions">
              <Questions />
            </Section>

            <Section id="pricing">
              <Pricing />
            </Section>

            <Section terminal className="!pt-0 !pb-0">
              <Footer />
            </Section>
          </main>
        </MarketingShell>
      </LenisProvider>
    </>
  );
}
