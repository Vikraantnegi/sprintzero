import { Grain } from "@/components/foundation";
import {
  LenisProvider,
  MarketingShell,
  Section,
} from "@/components/layout";
import { Button, Footer } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Grain />
      <LenisProvider>
        <MarketingShell>
          <main>
            <Section className="flex min-h-svh flex-col justify-center !pt-[calc(var(--space-9)+var(--space-8))]">
              <div className="mx-auto flex w-full max-w-[560px] flex-col gap-space-6">
                <h1 className="font-display text-display-l font-normal text-text">
                  <span className="block">404.</span>
                  {/* Accent touch 1 of 2 */}
                  <span className="block italic text-accent">
                    Nothing shipped here.
                  </span>
                </h1>

                <p className="font-mono text-meta text-faint">
                  The page you&apos;re after doesn&apos;t exist — or hasn&apos;t
                  been built yet.
                </p>

                <div className="flex flex-wrap items-center gap-space-4 max-md:flex-col max-md:items-stretch">
                  {/* Accent touch 2 of 2 — primary fill */}
                  <Button
                    href="/"
                    trailingArrow
                    className="max-md:w-full max-md:justify-center max-md:py-space-4"
                  >
                    Back to the studio
                  </Button>
                  <Button
                    href="/book"
                    variant="ghost"
                    trailingArrow
                    className="max-md:w-full max-md:justify-center max-md:py-space-4"
                  >
                    Start a sprint
                  </Button>
                </div>
              </div>
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
