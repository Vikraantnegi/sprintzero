"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BulletList } from "@/components/ui/BulletList";
import { Button } from "@/components/ui/Button";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { capture } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { contactCopy } from "@/lib/contact";
import { SZ_DUR, SZ_EASE_FRAMER } from "@/lib/motion/constants";

type ContactSectionProps = {
  className?: string;
};

/**
 * 10 — Contact (+ support). Mount stagger.
 * Accent budget (2): italic headline line 2 + primary CTA to /book.
 * No second Cal embed — booking stays on /book.
 */
export function ContactSection({ className }: ContactSectionProps) {
  const reduced = useReducedMotion();

  const up = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: SZ_DUR, ease: SZ_EASE_FRAMER, delay },
        };

  return (
    <div
      className={cn(
        "mx-auto flex w-full min-w-0 max-w-[760px] flex-col gap-space-8",
        className,
      )}
    >
      <div className="flex flex-col gap-space-5">
        <motion.div {...up(0)}>
          <SectionLabel
            number={contactCopy.sectionNumber}
            name={contactCopy.sectionName}
          />
        </motion.div>

        <h1 className="font-display text-display-l font-normal text-text">
          <motion.span className="block" {...up(0.07)}>
            {contactCopy.headlineLine1}
          </motion.span>
          <motion.span className="block italic text-accent" {...up(0.14)}>
            {contactCopy.headlineLine2}
          </motion.span>
        </h1>

        <motion.p className="text-body text-muted" {...up(0.22)}>
          {contactCopy.intro}
        </motion.p>
      </div>

      <motion.div
        className="flex flex-col gap-space-3 border-t border-hairline pt-space-7"
        {...up(0.3)}
      >
        <MonoLabel>{contactCopy.emailLabel}</MonoLabel>
        <a
          href={`mailto:${contactCopy.email}`}
          className="font-mono text-body text-text no-underline transition-colors duration-fast ease-sz hover:text-accent-hover focus-visible:outline-none focus-visible:shadow-focus-accent max-md:break-all"
        >
          {contactCopy.email}
        </a>
      </motion.div>

      <motion.div
        className="flex flex-col gap-space-5 border-t border-hairline pt-space-7"
        {...up(0.38)}
      >
        <h2 className="font-display text-h3 font-medium text-text">
          {contactCopy.supportTitle}
        </h2>
        <BulletList items={contactCopy.supportBullets} />
      </motion.div>

      <motion.div
        className="flex flex-col gap-space-5 border-t border-hairline pt-space-7"
        {...up(0.46)}
      >
        <h2 className="font-display text-h3 font-medium text-text">
          {contactCopy.bookTitle}
        </h2>
        <p className="text-body text-muted">{contactCopy.bookBody}</p>
        <Button
          href="/book"
          trailingArrow
          className="self-start max-md:w-full max-md:justify-center"
          onClick={() => capture("cta_clicked", { location: "contact" })}
        >
          {contactCopy.bookCta}
        </Button>
      </motion.div>
    </div>
  );
}
