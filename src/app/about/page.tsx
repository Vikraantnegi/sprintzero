import type { Metadata } from "next";
import { Grain } from "@/components/foundation";
import {
  LenisProvider,
  MarketingShell,
  Section,
} from "@/components/layout";
import { AboutSection } from "@/components/sections";
import { Footer } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "One-operator software studio: real builds, a fixed-scope 72-hour model, reachable and accountable — no agency theater.",
};

export default function AboutPage() {
  return (
    <>
      <Grain />
      <LenisProvider>
        <MarketingShell>
          <main>
            <Section
              id="about"
              className="flex min-h-svh flex-col justify-start !pt-[calc(var(--space-9)+var(--space-8))]"
            >
              <AboutSection />
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
