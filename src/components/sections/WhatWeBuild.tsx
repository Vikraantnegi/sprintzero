"use client";

import { useRef } from "react";
import { Button, Card, MonoLabel, SectionLabel } from "@/components/ui";
import { cn } from "@/lib/cn";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

/** Closest GSAP stand-in for specimen --ease cubic-bezier(0.2,0,0,1). */
const SZ_EASE = "power3.out";
const SZ_DUR = 0.32;

const STATS = [
  { label: "Cycle", value: "72h" },
  { label: "Floor", value: "₹1,20,000" },
  { label: "Format", value: "fixed-scope" },
] as const;

type WhatWeBuildProps = {
  className?: string;
};

/**
 * Stage 4 · What We Build — one engine card.
 * Accent budget (2): italic Zero retainers. + in-card primary CTA.
 */
export function WhatWeBuild({ className }: WhatWeBuildProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const label = labelRef.current;
      const headline = headlineRef.current;
      const card = cardRef.current;
      if (!root || !label || !headline || !card) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([label, headline, card], { opacity: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.closest("section") ?? root,
            start: "top 75%",
            once: true,
          },
        });

        tl.to(label, { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE }, 0)
          .to(
            headline,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0.08,
          )
          .to(
            card,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0.16,
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([label, headline, card], { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid w-full min-w-0 items-center gap-space-8 md:grid-cols-[0.8fr_1.2fr]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-space-5">
        <div ref={labelRef}>
          <SectionLabel number="01" name="What we build" />
        </div>

        <h2
          ref={headlineRef}
          className="font-display text-display-l font-normal text-text"
        >
          <span className="block">One engine.</span>
          {/* Accent touch 1 of 2 */}
          <span className="block italic text-accent">Zero retainers.</span>
        </h2>

        <p className="max-w-[360px] text-body text-muted max-md:hidden">
          One thing to buy. Everything below is what it includes — there is no
          tier above it and no add-on beside it.
        </p>
      </div>

      <div ref={cardRef} className="min-w-0">
        <Card
          magnetic
          className="flex flex-col gap-space-6 !rounded-lg !p-space-5 max-md:gap-space-5 md:!px-space-7 md:!py-space-8"
        >
          <MonoLabel>THE ENGINE</MonoLabel>

          <div className="flex flex-col gap-space-4">
            <h3 className="font-display text-h3 font-medium text-text">
              Agency Sprints
            </h3>
            <p className="max-w-[520px] text-body text-muted">
              72-hour MVPs for founders who already know what they want shipped.
              Discovery → build → handoff. No retainers, no scope creep, no
              monthly lock-in.
            </p>
          </div>

          {/* Desktop: 3-col stacks */}
          <div className="hidden flex-wrap gap-x-space-7 gap-y-space-5 border-t border-hairline pt-space-6 md:flex">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-0 flex-col gap-space-2"
              >
                <span className="font-mono text-meta uppercase tracking-[0.1em] text-faint">
                  {stat.label}
                </span>
                <span className="whitespace-nowrap font-mono text-body text-text">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile: label / value rows */}
          <div className="flex flex-col border-t border-hairline pt-space-4 md:hidden">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex items-baseline justify-between gap-space-4 py-space-2",
                  i > 0 && "border-t border-divider",
                )}
              >
                <span className="font-mono text-meta uppercase tracking-[0.1em] text-faint">
                  {stat.label}
                </span>
                <span className="whitespace-nowrap font-mono text-body text-text">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Accent touch 2 of 2 */}
          <Button
            href="/book"
            trailingArrow
            className="self-start max-md:w-full max-md:justify-center max-md:py-space-4"
          >
            Book a discovery call
          </Button>
        </Card>
      </div>
    </div>
  );
}
