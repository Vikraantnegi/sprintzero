"use client";

import { useRef } from "react";
import {
  BulletList,
  Button,
  MonoLabel,
  SectionHeading,
} from "@/components/ui";
import { useRevealTimeline } from "@/hooks/useRevealTimeline";
import { capture } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const PRICE = "$1,500";

const BULLETS = [
  "Full product foundation: PRD, architecture, brand",
  "Working MVP deployed to production in 72 hours",
  "Repo, keys & brand kit handed to you",
  "30-day post-launch support",
  "Fixed scope, fixed price, no retainer",
] as const;

type PricingProps = {
  className?: string;
};

/**
 * Stage 4 · Pricing — one outcome price (USD).
 * Accent budget (2): italic No retainers. + primary CTA.
 * Price figure stays --text. Card is destination — no hover-lift.
 */
export function Pricing({ className }: PricingProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useRevealTimeline({
    scope: rootRef,
    getTargets: () => {
      const label = labelRef.current;
      const headline = headlineRef.current;
      const body = bodyRef.current;
      const card = cardRef.current;
      if (!label || !headline || !body || !card) return null;
      return [
        { elements: [label] },
        { elements: [headline] },
        { elements: [body] },
        { elements: [card] },
      ];
    },
  });

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid w-full min-w-0 grid-cols-1 items-center gap-space-8 md:grid-cols-[0.85fr_1.15fr]",
        className,
      )}
    >
      <SectionHeading
        number="07"
        name="Pricing & engagement"
        labelRef={labelRef}
        headlineRef={headlineRef}
        bodyRef={bodyRef}
        bodyClassName="max-w-[400px]"
        lines={[
          { text: "Outcome-priced." },
          { text: "No retainers.", accent: true },
        ]}
        body="You pay for the artefact: a deployed product, a transferred repo, a working pipeline. No hourly billing, no scope cards, no PMs."
      />

      <div
        ref={cardRef}
        className="card-texture flex min-w-0 flex-col gap-space-6 rounded-lg border border-hairline bg-surface-1 p-space-8 max-md:gap-space-5 max-md:p-space-5"
      >
        <MonoLabel>Agency sprint · 72 hours</MonoLabel>

        <div className="flex flex-col gap-space-2">
          <MonoLabel size="meta">Starts at</MonoLabel>
          <p className="whitespace-nowrap font-display font-normal text-text [font-size:clamp(38px,4.6vw,56px)] [letter-spacing:-0.02em] [line-height:1.05] max-md:[font-size:2.125rem]">
            {PRICE}
          </p>
        </div>

        <BulletList
          items={BULLETS}
          className="border-t border-hairline pt-space-6 max-md:pt-space-4"
        />

        <Button
          href="/book"
          trailingArrow
          className="self-start max-md:w-full max-md:justify-center max-md:py-space-4"
          onClick={() => capture("cta_clicked", { location: "pricing" })}
        >
          Book a discovery call
        </Button>
      </div>
    </div>
  );
}
