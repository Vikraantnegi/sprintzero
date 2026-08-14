"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BulletList } from "@/components/ui/BulletList";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SchedulerPanel } from "@/components/ui/SchedulerPanel";
import { bookingCopy } from "@/lib/booking";
import { cn } from "@/lib/cn";
import { SZ_DUR, SZ_EASE_FRAMER } from "@/lib/motion/constants";

type BookSectionProps = {
  className?: string;
};

/**
 * 08 — Book a sprint. Mount stagger (landing route), not ScrollTrigger.
 * Accent budget (2): italic headline line 2 + Cal embed / fallback link.
 * Stacked layout — framing on top, full-width scheduler below so Cal has room.
 */
export function BookSection({ className }: BookSectionProps) {
  const reduced = useReducedMotion();

  /** Secondary chrome may fade; LCP framing (headline + body) stays visible. */
  const up = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: SZ_DUR, ease: SZ_EASE_FRAMER, delay },
        };

  const upLcp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { y: 12 },
          animate: { y: 0 },
          transition: { duration: SZ_DUR, ease: SZ_EASE_FRAMER, delay },
        };

  const fadeIn = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: SZ_DUR, ease: SZ_EASE_FRAMER, delay },
        };

  return (
    <div
      className={cn("flex w-full min-w-0 flex-col gap-space-8", className)}
    >
      <div className="flex w-full min-w-0 flex-col items-center gap-space-5 text-center">
        <motion.div {...up(0)}>
          <SectionLabel
            number={bookingCopy.sectionNumber}
            name={bookingCopy.sectionName}
          />
        </motion.div>

        <h1 className="font-display text-display-l font-normal text-text">
          <motion.span className="block" {...upLcp(0.07)}>
            {bookingCopy.headlineLine1}{" "}
            <span className="text-accent">{bookingCopy.headlineLine2}</span>
          </motion.span>
        </h1>

        <motion.p className="max-w-210 text-body text-muted" {...upLcp(0.22)}>
          {bookingCopy.body}
        </motion.p>

        <motion.div className="mx-auto w-full max-w-140 text-left" {...up(0.3)}>
          <BulletList items={bookingCopy.covers} />
        </motion.div>

        <motion.div
          className="flex w-full max-w-210 flex-col items-center gap-space-3 border-t border-hairline pt-space-5"
          {...up(0.38)}
        >
          {bookingCopy.metaLines.map((line) => (
            <p key={line} className="font-mono text-meta text-faint">
              {line}
            </p>
          ))}
          <p className="hidden text-body text-muted md:block">
            {bookingCopy.whatHappensNext}
          </p>
        </motion.div>
      </div>

      <motion.div className="min-w-0 w-full" {...fadeIn(0.46)}>
        <SchedulerPanel />
      </motion.div>
    </div>
  );
}
