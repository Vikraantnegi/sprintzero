"use client";

import { useRef, useState } from "react";
import { Button, MonoLabel, SectionLabel, Toggle } from "@/components/ui";
import { capture } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

/** Closest GSAP stand-in for specimen --ease cubic-bezier(0.2,0,0,1). */
const SZ_EASE = "power3.out";
const SZ_DUR = 0.32;

const CURRENCY_OPTIONS = [
  { value: "INR", label: "₹ INR" },
  { value: "USD", label: "$ USD" },
] as const;

type Currency = (typeof CURRENCY_OPTIONS)[number]["value"];

/** Editable floor figures — toggle swaps this same tick. */
const PRICES: Record<Currency, string> = {
  INR: "₹1,20,000",
  USD: "$1,500",
};

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
 * Stage 4 · Pricing — one outcome price, two denominations.
 * Accent budget (3): italic No retainers. + primary CTA + active toggle segment.
 * Price figure stays --text. Card is destination — no hover-lift.
 */
export function Pricing({ className }: PricingProps) {
  const [currency, setCurrency] = useState<Currency>("INR");

  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const label = labelRef.current;
      const headline = headlineRef.current;
      const body = bodyRef.current;
      const card = cardRef.current;
      if (!root || !label || !headline || !body || !card) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([label, headline, body, card], { opacity: 0, y: 12 });

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
          .to(body, { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE }, 0.16)
          .to(card, { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE }, 0.24);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([label, headline, body, card], { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid w-full min-w-0 grid-cols-1 items-center gap-space-8 md:grid-cols-[0.85fr_1.15fr]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-space-5">
        <div ref={labelRef}>
          <SectionLabel number="07" name="Pricing & engagement" />
        </div>

        <h2
          ref={headlineRef}
          className="font-display text-display-l font-normal text-text"
        >
          <span className="block">Outcome-priced.</span>
          {/* Accent touch 1 of 3 */}
          <span className="block italic text-accent">No retainers.</span>
        </h2>

        <p ref={bodyRef} className="max-w-[400px] text-body text-muted">
          You pay for the artefact: a deployed product, a transferred repo, a
          working pipeline. No hourly billing, no scope cards, no PMs.
        </p>
      </div>

      {/* Destination card — no Card hover-lift */}
      <div
        ref={cardRef}
        className="card-texture flex min-w-0 flex-col gap-space-6 rounded-lg border border-hairline bg-surface-1 p-space-8 max-md:gap-space-5 max-md:p-space-5"
      >
        <div className="flex flex-col gap-space-5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-space-5">
          <MonoLabel>Agency sprint · 72 hours</MonoLabel>
          {/* Accent touch 3 of 3 — active segment via Stage 2 Toggle */}
          <Toggle
            options={[...CURRENCY_OPTIONS]}
            value={currency}
            onChange={(next) => {
              setCurrency(next);
              capture("pricing_currency_toggled", { currency: next });
            }}
            aria-label="Currency"
          />
        </div>

        <div className="flex flex-col gap-space-2">
          <MonoLabel size="meta">Starts at</MonoLabel>
          {/*
            Specimen clamp — not a named type token (text-price = 40px).
            nowrap is intentional: a price must never wrap/clip.
          */}
          <p
            className="whitespace-nowrap font-display font-normal text-text [font-size:clamp(38px,4.6vw,56px)] [letter-spacing:-0.02em] [line-height:1.05] max-md:[font-size:2.125rem]"
            aria-live="polite"
          >
            {PRICES[currency]}
          </p>
        </div>

        <ul className="flex list-none flex-col gap-space-3 border-t border-hairline p-0 pt-space-6 max-md:gap-space-3 max-md:pt-space-4">
          {BULLETS.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[16px_1fr] gap-space-2 text-body text-muted max-md:grid-cols-[14px_1fr]"
            >
              <span className="font-mono text-faint" aria-hidden>
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Accent touch 2 of 3 */}
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
