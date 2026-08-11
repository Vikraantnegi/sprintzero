"use client";

import { useRef } from "react";
import { HeroGlow } from "@/components/foundation";
import { BrandMark, Button, SectionLabel, StatCard } from "@/components/ui";
import { capture } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { SZ_DUR, SZ_EASE_GSAP } from "@/lib/motion/constants";

registerGsap();

type HeroProps = {
  className?: string;
};

/**
 * Stage 4 Hero — production copy + GSAP load-in.
 * Accent budget (3): italic 72-hour, primary CTA fill, active nav underline (Nav).
 */
export function Hero({ className }: HeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const targets = [
        brandRef.current,
        labelRef.current,
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        bodyRef.current,
        ctasRef.current,
        proofRef.current,
      ].filter(Boolean) as HTMLElement[];

      if (targets.length !== 8) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(targets.slice(0, 7), { opacity: 0, y: 12 });
        gsap.set(proofRef.current, { opacity: 0 });

        const tl = gsap.timeline();
        const delays = [0, 0.07, 0.14, 0.21, 0.29, 0.36, 0.43];
        targets.slice(0, 7).forEach((el, i) => {
          tl.to(
            el,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE_GSAP },
            delays[i] ?? i * 0.07,
          );
        });
        tl.to(
          proofRef.current,
          { opacity: 1, duration: SZ_DUR, ease: SZ_EASE_GSAP },
          0.43,
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid w-full min-w-0 grid-cols-1 items-center gap-space-6 md:grid-cols-[1.15fr_1fr] md:gap-space-8",
        className,
      )}
    >
      <div className="relative flex min-w-0 flex-col gap-space-6">
        <HeroGlow className="left-[-140px] top-1/2 z-0 h-[620px] w-[900px] -translate-y-1/2 max-md:left-1/2 max-md:top-[20%] max-md:h-[320px] max-md:w-[420px] max-md:-translate-x-1/2 max-md:translate-y-0" />

        {/* <div ref={brandRef} className="relative z-[1]">
          <BrandMark wordmarkClassName="text-wordmark" />
        </div> */}

        <div ref={labelRef} className="relative z-[1]">
          <SectionLabel
            number="00"
            name="MANIFESTO · a one-person software studio"
          />
        </div>

        <h1 className="relative z-[1] font-display text-display-xl font-normal text-text">
          <span ref={line1Ref} className="block">
            The
          </span>
          <span ref={line2Ref} className="block italic text-accent">
            72-hour
          </span>
          <span ref={line3Ref} className="block">
            software studio.
          </span>
        </h1>

        <p
          ref={bodyRef}
          className="relative z-[1] max-w-[560px] text-body text-muted"
        >
          You bring the idea. A real operator hands back a deployed, working MVP
          in 72 hours. One clock, no agency overhead, no scope games.
        </p>

        <div
          ref={ctasRef}
          className="relative z-[1] flex flex-wrap items-center gap-space-4 max-md:flex-col max-md:items-stretch"
        >
          <Button
            href="/book"
            trailingArrow
            className="max-md:w-full max-md:justify-center max-md:py-space-4"
            onClick={() => capture("cta_clicked", { location: "hero" })}
          >
            Start a sprint
          </Button>
          <Button
            href="#how-we-work"
            variant="ghost"
            className="max-md:w-full max-md:justify-center max-md:py-space-4"
          >
            See how it works
          </Button>
        </div>
      </div>

      <div
        ref={proofRef}
        className="relative flex min-w-0 flex-col gap-space-5"
      >
        <div className="card-texture flex flex-col gap-space-4 rounded-md border border-hairline bg-surface-1 p-space-6 max-md:gap-space-3 max-md:p-space-5">
          <span className="font-mono text-meta uppercase tracking-[0.1em] text-faint">
            Delivery ceiling
          </span>
          <p className="font-mono text-stat text-text">72:00:00</p>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-space-3 min-[381px]:grid-cols-2 md:grid-cols-3 [&_:last-child]:max-md:col-span-full max-[380px]:[&_:last-child]:col-span-1">
          <StatCard value="72h" label="ship cycle" />
          <StatCard value="1" label="operator, end-to-end" />
          <StatCard
            value="10 min"
            label="idea to foundation"
            className="max-md:flex-row max-md:items-baseline"
          />
        </div>

        <p className="font-mono text-caption text-faint">
          72:00:00 is a static ceiling mark, not a running timer — nothing counts
          down, nothing is fabricated.
        </p>
      </div>
    </div>
  );
}
