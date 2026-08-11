import type { Metadata } from "next";
import { Grain } from "@/components/foundation";
import {
  LenisProvider,
  MarketingShell,
  Section,
} from "@/components/layout";
import { BookSection } from "@/components/sections";
import { Footer } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description:
    "Book a 30-minute discovery call. Scope your sprint and confirm the 72-hour window.",
};

export default function BookPage() {
  return (
    <>
      <Grain />
      <LenisProvider>
        <MarketingShell>
          <main>
            <Section
              id="book"
              className="flex min-h-svh flex-col justify-center !pt-[calc(var(--space-9)+var(--space-8))]"
            >
              <BookSection />
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
