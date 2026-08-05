"use client";

import { useRef } from "react";
import { SectionLabel, Timeline, type SprintStep } from "@/components/ui";
import { cn } from "@/lib/cn";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

const SZ_EASE = "power3.out";
const SZ_DUR = 0.32;

export const SPRINT_STEPS: readonly SprintStep[] = [
  {
    id: "capture",
    day: "Day 0",
    range: "0–24h",
    title: "Capture.",
    bullets: [
      "60-min discovery call — recorded",
      "Idea → foundation via the pipeline",
      "AI-drafted PRD in your inbox",
      "Scope locked, clock starts",
    ],
  },
  {
    id: "build",
    day: "Day 1–2",
    range: "24–72h",
    title: "Build.",
    bullets: [
      "Architecture · brand · UI",
      "Real build, not mocked",
      "Daily build link, no status calls",
      "Tested against real paths",
    ],
  },
  {
    id: "handoff",
    day: "Day 3",
    range: "72h",
    title: "Handoff.",
    bullets: [
      "Deployed to production",
      "Repo + keys transferred",
      "Walkthrough recording",
      "You own everything",
    ],
  },
] as const;

type HowWeWorkProps = {
  className?: string;
};

/**
 * Stage 4 · How We Work — three-day sprint process.
 * Accent budget (2): italic No mystery. + Timeline system.
 */
export function HowWeWork({ className }: HowWeWorkProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const label = labelRef.current;
      const headline = headlineRef.current;
      if (!root || !label || !headline) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([label, headline], { opacity: 0, y: 12 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.closest("section") ?? root,
              start: "top 70%",
              once: true,
            },
          })
          .to(label, { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE }, 0)
          .to(
            headline,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0.08,
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([label, headline], { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn("flex w-full min-w-0 flex-col gap-space-8", className)}
    >
      <div className="flex flex-col gap-space-5">
        <div ref={labelRef}>
          <SectionLabel number="02" name="How a sprint works" />
        </div>
        <h2
          ref={headlineRef}
          className="font-display text-display-l font-normal text-text"
        >
          <span className="block">Three days.</span>
          {/* Accent touch 1 of 2 */}
          <span className="block italic text-accent">No mystery.</span>
        </h2>
      </div>

      {/* Accent touch 2 of 2 — timeline line + nodes */}
      <Timeline variant="sprint" steps={SPRINT_STEPS} />
    </div>
  );
}
