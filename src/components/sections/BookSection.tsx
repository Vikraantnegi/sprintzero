"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SchedulerPanel } from "@/components/ui/SchedulerPanel";
import { bookingCopy } from "@/lib/booking";
import { cn } from "@/lib/cn";

/** Specimen load-in: 320ms, ease matches --ease. Not new design tokens. */
const SZ_EASE = [0.2, 0, 0, 1] as const;
const SZ_DUR = 0.32;

type BookSectionProps = {
  className?: string;
};

/**
 * 07 — Book a sprint. Mount stagger (landing route), not ScrollTrigger.
 * Accent budget (2): italic headline line 2 + Cal embed / fallback link.
 */
export function BookSection({ className }: BookSectionProps) {
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
    <div
      className={cn(
        "grid w-full min-w-0 items-start gap-space-8 md:grid-cols-[0.85fr_1.15fr] md:items-center",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-space-6">
        <motion.div {...up(0)}>
          <SectionLabel
            number={bookingCopy.sectionNumber}
            name={bookingCopy.sectionName}
          />
        </motion.div>

        <h1 className="font-display text-display-l font-normal text-text">
          <motion.span className="block" {...up(0.07)}>
            {bookingCopy.headlineLine1}
          </motion.span>
          {/* Accent touch 1 of 2 */}
          <motion.span className="block italic text-accent" {...up(0.14)}>
            {bookingCopy.headlineLine2}
          </motion.span>
        </h1>

        <motion.p
          className="max-w-[440px] text-body text-muted"
          {...up(0.22)}
        >
          {bookingCopy.body}
        </motion.p>

        <motion.ul
          className="flex list-none flex-col gap-space-3 p-0"
          {...up(0.3)}
        >
          {bookingCopy.covers.map((item) => (
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
        </motion.ul>
      </div>

      {/* Opacity only — never transform an iframe */}
      <motion.div className="min-w-0" {...fadeIn(0.4)}>
        <SchedulerPanel />
      </motion.div>
    </div>
  );
}
