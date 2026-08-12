import type { Metadata } from "next";
import { Grain } from "@/components/foundation";
import {
  LenisProvider,
  MarketingShell,
  Section,
} from "@/components/layout";
import { ContactSection } from "@/components/sections";
import { Footer } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "How to reach SprintZero: email the operator, what 30-day post-launch support covers, and how to book a discovery call.",
};

export default function ContactPage() {
  return (
    <>
      <Grain />
      <LenisProvider>
        <MarketingShell>
          <main>
            <Section
              id="contact"
              className="flex min-h-svh flex-col justify-start !pt-[calc(var(--space-9)+var(--space-8))]"
            >
              <ContactSection />
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
