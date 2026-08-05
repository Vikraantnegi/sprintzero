"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroGlow } from "@/components/foundation";
import { Button, SectionLabel, StatCard } from "@/components/ui";
import { cn } from "@/lib/cn";

/** Specimen load-in: 320ms, ease matches --ease. Not new design tokens. */
const SZ_EASE = [0.2, 0, 0, 1] as const;
const SZ_DUR = 0.32;

type HeroProps = {
  className?: string;
};

/**
 * Stage 4 Hero — production copy + Framer load-in.
 * Accent budget (3): italic 72-hour, primary CTA fill, active nav underline (Nav).
 */
export function Hero({ className }: HeroProps) {
  const reduced = useReducedMotion();

  const up = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: SZ_DUR, ease: SZ_EASE, delay },
        };

  const fadeIn = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: SZ_DUR, ease: SZ_EASE, delay },
        };

  return (
    <div className={cn("hero-grid", className)}>
      {/* Copy — DOM first: label → headline → sub → CTAs */}
      <div className="hero-grid__copy relative flex min-w-0 flex-col gap-space-6">
        <HeroGlow className="left-[-140px] top-1/2 z-0 h-[620px] w-[900px] -translate-y-1/2 max-md:left-1/2 max-md:top-[20%] max-md:h-[320px] max-md:w-[420px] max-md:-translate-x-1/2 max-md:translate-y-0" />

        <motion.div className="relative z-[1]" {...up(0)}>
          <SectionLabel
            number="00"
            name="MANIFESTO · a one-person software studio"
          />
        </motion.div>

        <h1 className="relative z-[1] font-display text-display-xl font-normal text-text">
          <motion.span className="block" {...up(0.07)}>
            The
          </motion.span>
          {/* Accent touch 1 of 3 */}
          <motion.span className="block italic text-accent" {...up(0.14)}>
            72-hour
          </motion.span>
          <motion.span className="block" {...up(0.21)}>
            software studio.
          </motion.span>
        </h1>

        <motion.p
          className="relative z-[1] max-w-[560px] text-body text-muted"
          {...up(0.29)}
        >
          You bring the idea. A real operator hands back a deployed, working MVP
          in 72 hours. One clock, no agency overhead, no scope games.
        </motion.p>

        <motion.div
          className="relative z-[1] flex flex-wrap items-center gap-space-4 max-md:flex-col max-md:items-stretch"
          {...up(0.36)}
        >
          {/* Accent touch 2 of 3 — primary CTA fill */}
          <Button
            href="#start"
            trailingArrow
            className="max-md:w-full max-md:justify-center max-md:py-space-4"
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
        </motion.div>
      </div>

      {/* Proof — mark → stats → footnote (sz-in: opacity only) */}
      <motion.div
        className="hero-grid__proof relative flex min-w-0 flex-col gap-space-5"
        {...fadeIn(0.43)}
      >
        <div className="card-texture flex flex-col gap-space-4 rounded-md border border-hairline bg-surface-1 p-space-6 max-md:gap-space-3 max-md:p-space-5">
          <span className="font-mono text-meta uppercase tracking-[0.1em] text-faint">
            Delivery ceiling
          </span>
          {/* static brand mark — never a countdown */}
          <p className="font-mono text-stat text-text">72:00:00</p>
        </div>

        <div className="hero-stats">
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
      </motion.div>
    </div>
  );
}
