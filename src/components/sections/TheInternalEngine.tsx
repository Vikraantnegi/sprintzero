"use client";

import { useRef } from "react";
import {
  SectionHeading,
  Timeline,
  type EngineStage,
} from "@/components/ui";
import { useRevealTimeline } from "@/hooks/useRevealTimeline";
import { cn } from "@/lib/cn";

const ENGINE_STAGES: readonly EngineStage[] = [
  { id: "idea", label: "Idea" },
  { id: "transcript", label: "Transcript" },
  { id: "research", label: "Research" },
  { id: "foundation", label: "Foundation" },
  { id: "brand", label: "Brand" },
  { id: "architecture", label: "Architecture" },
  { id: "task-board", label: "Task board" },
  { id: "build", label: "Build" },
  { id: "deploy", label: "Deploy" },
] as const;

type TheInternalEngineProps = {
  className?: string;
};

/**
 * Stage 4 · The Internal Engine.
 * Accent budget (2): italic Just the pipeline. + pipeline Timeline system.
 */
export function TheInternalEngine({ className }: TheInternalEngineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useRevealTimeline({
    scope: rootRef,
    start: "top 70%",
    getTargets: () => {
      const label = labelRef.current;
      const headline = headlineRef.current;
      const body = bodyRef.current;
      const strip = stripRef.current;
      if (!label || !headline || !body || !strip) return null;
      return [
        { elements: [label] },
        { elements: [headline] },
        { elements: [body] },
        { elements: [strip] },
      ];
    },
  });

  return (
    <div
      ref={rootRef}
      className={cn("flex w-full min-w-0 flex-col gap-space-8", className)}
    >
      <SectionHeading
        number="03"
        name="The internal engine"
        labelRef={labelRef}
        headlineRef={headlineRef}
        bodyRef={bodyRef}
        headlineClassName="max-w-[760px]"
        bodyClassName="max-w-[640px]"
        lines={[
          { text: "No black box." },
          { text: "Just the pipeline.", accent: true },
        ]}
        body={
          "Every sprint starts with our internal pipeline — it turns your idea into a complete product foundation (PRD, architecture, brand, task board) in about ten minutes. That's why discovery stops being a billable phase, and you go straight to a build."
        }
      />

      <div ref={stripRef}>
        <Timeline variant="engine" stages={ENGINE_STAGES} />
      </div>
    </div>
  );
}
