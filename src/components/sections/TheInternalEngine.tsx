"use client";

import { useRef } from "react";
import {
  SectionLabel,
  Timeline,
  type EngineStage,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

const SZ_EASE = "power3.out";
const SZ_DUR = 0.32;

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

  useGSAP(
    () => {
      const root = rootRef.current;
      const targets = [
        labelRef.current,
        headlineRef.current,
        bodyRef.current,
        stripRef.current,
      ].filter(Boolean);
      if (!root || targets.length !== 4) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(targets, { opacity: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.closest("section") ?? root,
            start: "top 70%",
            once: true,
          },
        });

        targets.forEach((target, index) => {
          tl.to(
            target,
            {
              opacity: 1,
              y: 0,
              duration: SZ_DUR,
              ease: SZ_EASE,
            },
            index * 0.08,
          );
        });
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
      className={cn("flex w-full min-w-0 flex-col gap-space-8", className)}
    >
      <div className="flex flex-col gap-space-5">
        <div ref={labelRef}>
          <SectionLabel number="03" name="The internal engine" />
        </div>

        <h2
          ref={headlineRef}
          className="max-w-[760px] font-display text-display-l font-normal text-text"
        >
          <span className="block">No black box.</span>
          {/* Accent touch 1 of 2 */}
          <span className="block italic text-accent">Just the pipeline.</span>
        </h2>

        <p ref={bodyRef} className="max-w-[640px] text-body text-muted">
          Every sprint starts with our internal pipeline — it turns your idea
          into a complete product foundation (PRD, architecture, brand, task
          board) in about ten minutes. That&apos;s why discovery stops being a
          billable phase, and you go straight to a build.
        </p>
      </div>

      {/* Accent touch 2 of 2 — traveling pulse + completed line + nodes */}
      <div ref={stripRef}>
        <Timeline variant="engine" stages={ENGINE_STAGES} />
      </div>
    </div>
  );
}
