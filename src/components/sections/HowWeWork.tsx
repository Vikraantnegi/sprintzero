"use client";

import { useRef } from "react";
import { SectionHeading, Timeline, type SprintStep } from "@/components/ui";
import { useRevealTimeline } from "@/hooks/useRevealTimeline";
import { cn } from "@/lib/cn";

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

  useRevealTimeline({
    scope: rootRef,
    start: "top 70%",
    getTargets: () => {
      const label = labelRef.current;
      const headline = headlineRef.current;
      if (!label || !headline) return null;
      return [{ elements: [label] }, { elements: [headline] }];
    },
  });

  return (
    <div
      ref={rootRef}
      className={cn("flex w-full min-w-0 flex-col gap-space-8", className)}
    >
      <SectionHeading
        number="02"
        name="How a sprint works"
        labelRef={labelRef}
        headlineRef={headlineRef}
        lines={[
          { text: "Three days." },
          { text: "No mystery.", accent: true },
        ]}
      />

      <Timeline variant="sprint" steps={SPRINT_STEPS} />
    </div>
  );
}
