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
  RecentBuild,
  TheInternalEngine,
  TheStack,
  WhatWeBuild,
} from "@/components/sections";
import { BrandStrip, Footer } from "@/components/ui";

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

            {/* Content-height sections — own GSAP stagger via .section--stagger */}
            <Section id="what-we-build" className="section--stagger">
              <WhatWeBuild />
            </Section>

            <Section id="how-we-work" className="section--stagger">
              <HowWeWork />
            </Section>

            <Section id="the-internal-engine" className="section--stagger">
              <TheInternalEngine />
            </Section>

            <Section id="the-stack" className="section--stagger">
              <TheStack />
            </Section>

            <Section id="recent-build" className="section--stagger">
              <RecentBuild />
            </Section>

            <Section id="pricing" className="section--stagger">
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
