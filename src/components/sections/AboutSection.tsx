"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { aboutCopy } from "@/lib/about";
import { capture } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { SZ_DUR, SZ_EASE_FRAMER } from "@/lib/motion/constants";

type AboutSectionProps = {
  className?: string;
};

/**
 * 09 — About. Mount stagger. Honest one-operator story — no name, no face.
 * Accent budget (2): italic headline line 2 + primary CTA fill.
 */
export function AboutSection({ className }: AboutSectionProps) {
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
            number={aboutCopy.sectionNumber}
            name={aboutCopy.sectionName}
          />
        </motion.div>

        <h1 className="font-display text-display-l font-normal text-text">
          <motion.span className="block" {...up(0.07)}>
            {aboutCopy.headlineLine1}
          </motion.span>
          <motion.span className="block italic text-accent" {...up(0.14)}>
            {aboutCopy.headlineLine2}
          </motion.span>
        </h1>

        <motion.p className="text-body text-muted" {...up(0.22)}>
          {aboutCopy.intro}
        </motion.p>
      </div>

      <motion.div
        className="flex flex-col gap-space-4 border-t border-hairline pt-space-7"
        {...up(0.3)}
      >
        <h2 className="font-display text-h3 font-medium text-text">
          {aboutCopy.whyTitle}
        </h2>
        <p className="text-body text-muted">{aboutCopy.whyBody}</p>
      </motion.div>

      <motion.div
        className="flex flex-col gap-space-5 border-t border-hairline pt-space-7"
        {...up(0.38)}
      >
        <h2 className="font-display text-h3 font-medium text-text">
          {aboutCopy.buildsTitle}
        </h2>
        <ul className="flex list-none flex-col gap-space-5 p-0">
          {aboutCopy.builds.map((build) => (
            <li key={build.name} className="flex flex-col gap-space-2">
              <a
                href={build.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-h3 font-medium text-text no-underline transition-colors duration-fast ease-sz hover:text-accent-hover focus-visible:outline-none focus-visible:shadow-focus-accent"
              >
                {build.name}{" "}
                <span className="font-mono text-meta text-faint" aria-hidden>
                  ↗
                </span>
              </a>
              <p className="text-body text-muted">{build.body}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className="flex flex-col gap-space-4 border-t border-hairline pt-space-7"
        {...up(0.46)}
      >
        <h2 className="font-display text-h3 font-medium text-text">
          {aboutCopy.publicTitle}
        </h2>
        <p className="text-body text-muted">{aboutCopy.publicBody}</p>
        <div className="flex flex-wrap gap-space-4">
          {aboutCopy.channels.map((channel) => (
            <a
              key={channel.href}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-mono-label text-muted no-underline transition-colors duration-fast ease-sz hover:text-accent-hover focus-visible:outline-none focus-visible:shadow-focus-accent"
            >
              {channel.label}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center gap-space-4 border-t border-hairline pt-space-7 max-md:flex-col max-md:items-stretch"
        {...up(0.54)}
      >
        <Button
          href="/book"
          trailingArrow
          className="max-md:w-full max-md:justify-center"
          onClick={() => capture("cta_clicked", { location: "about" })}
        >
          Start a sprint
        </Button>
        <Button
          href="/contact"
          variant="ghost"
          className="max-md:w-full max-md:justify-center"
        >
          Contact
        </Button>
      </motion.div>
    </div>
  );
}
