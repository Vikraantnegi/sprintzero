"use client";

import { useRef } from "react";
import { Button, Card, MonoLabel, SectionHeading } from "@/components/ui";
import { useRevealTimeline } from "@/hooks/useRevealTimeline";
import { capture } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const STATS = [
  { label: "Cycle", value: "72h" },
  { label: "Floor", value: "$1,500" },
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

  useRevealTimeline({
    scope: rootRef,
    getTargets: () => {
      const label = labelRef.current;
      const headline = headlineRef.current;
      const card = cardRef.current;
      if (!label || !headline || !card) return null;
      return [
        { elements: [label] },
        { elements: [headline] },
        { elements: [card] },
      ];
    },
  });

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid w-full min-w-0 items-center gap-space-8 md:grid-cols-[0.8fr_1.2fr]",
        className,
      )}
    >
      <SectionHeading
        number="01"
        name="What we build"
        labelRef={labelRef}
        headlineRef={headlineRef}
        lines={[
          { text: "One engine." },
          { text: "Zero retainers.", accent: true },
        ]}
        body={
          <p className="max-w-[360px] text-body text-muted md:block">
            <span className="md:hidden">
              One thing to buy — no tier above it, no add-on beside it.
            </span>
            <span className="hidden md:inline">
              One thing to buy. Everything below is what it includes — there is
              no tier above it and no add-on beside it.
            </span>
          </p>
        }
      />

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

          <div className="flex flex-col gap-space-4 max-md:w-full">
            <Button
              href="/book"
              trailingArrow
              className="self-start max-md:w-full max-md:justify-center max-md:py-space-4"
              onClick={() =>
                capture("cta_clicked", { location: "what-we-build" })
              }
            >
              Book a discovery call
            </Button>
            <Button
              href="#recent-build"
              variant="text"
              className="self-start"
            >
              See real builds
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
