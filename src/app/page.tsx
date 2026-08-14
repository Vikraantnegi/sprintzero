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
import { BrandStrip, Footer } from "@/components/ui";
import { SITE_BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_BRAND} · The 72-hour software studio`,
  },
  description:
    "A 72-hour software studio. You bring the idea; one operator hands back a deployed, working MVP. Fixed scope, transparent pricing, you own everything.",
  openGraph: {
    title: `${SITE_BRAND} · The 72-hour software studio`,
    description:
      "A 72-hour software studio. You bring the idea; one operator hands back a deployed, working MVP. Fixed scope, transparent pricing, you own everything.",
  },
};

export default function Home() {
  return (
    <>
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
