"use client";

import { useRef } from "react";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { ENGINE_START, SZ_EASE } from "./constants";
import type { EngineStage } from "./types";

registerGsap();

export function EngineTimeline({
  stages,
  className,
}: {
  stages: readonly EngineStage[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const replayRef = useRef<(() => void) | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      const lines = [
        ...root.querySelectorAll<HTMLElement>("[data-engine-line]"),
      ];
      const nodes = [
        ...root.querySelectorAll<HTMLElement>("[data-engine-node]"),
      ];
      const labels = [
        ...root.querySelectorAll<HTMLElement>("[data-engine-label]"),
      ];

      const setPending = () => {
        gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(nodes, {
          backgroundColor: "var(--surface-2)",
          borderColor: "var(--hairline)",
          boxShadow: "none",
          scale: 1,
        });
        gsap.set(labels, { color: "var(--text-faint)" });
      };

      const setSettled = () => {
        gsap.set(lines, { scaleX: 1 });
        gsap.set(nodes, {
          backgroundColor: "var(--accent)",
          borderColor: "transparent",
          boxShadow: "none",
          scale: 1,
        });
        gsap.set(labels, { color: "var(--text-muted)" });
      };

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const buildTimeline = () => {
          setPending();

          const tl = gsap.timeline({
            defaults: { overwrite: "auto" },
          });

          // Idea is the starting head; each 120ms segment advances line + pulse.
          tl.to(
            nodes[0],
            {
              backgroundColor: "var(--accent)",
              borderColor: "transparent",
              boxShadow: "0 0 0 6px var(--accent-glow)",
              scale: 1.35,
              duration: 0.12,
              ease: SZ_EASE,
            },
            ENGINE_START,
          ).to(
            labels[0],
            { color: "var(--text)", duration: 0.12, ease: SZ_EASE },
            ENGINE_START,
          );

          for (let i = 1; i < stages.length; i += 1) {
            const segmentStart = ENGINE_START + (i - 1) * 0.12;
            const reachedAt = ENGINE_START + i * 0.12;

            tl.to(
              lines,
              {
                scaleX: i / (stages.length - 1),
                duration: 0.12,
                ease: "none",
              },
              segmentStart,
            )
              .to(
                nodes[i - 1],
                {
                  boxShadow: "none",
                  scale: 1,
                  duration: 0.12,
                  ease: SZ_EASE,
                },
                reachedAt,
              )
              .to(
                labels[i - 1],
                {
                  color: "var(--text-muted)",
                  duration: 0.12,
                  ease: SZ_EASE,
                },
                reachedAt,
              )
              .to(
                nodes[i],
                {
                  backgroundColor: "var(--accent)",
                  borderColor: "transparent",
                  boxShadow: "0 0 0 6px var(--accent-glow)",
                  scale: 1.35,
                  duration: 0.12,
                  ease: SZ_EASE,
                },
                reachedAt,
              )
              .to(
                labels[i],
                {
                  color: "var(--text)",
                  duration: 0.12,
                  ease: SZ_EASE,
                },
                reachedAt,
              );
          }

          const settleAt = ENGINE_START + stages.length * 0.12;
          tl.to(
            nodes[stages.length - 1],
            {
              boxShadow: "none",
              scale: 1,
              duration: 0.12,
              ease: SZ_EASE,
            },
            settleAt,
          ).to(
            labels[stages.length - 1],
            {
              color: "var(--text-muted)",
              duration: 0.12,
              ease: SZ_EASE,
            },
            settleAt,
          );

          return tl;
        };

        let timeline = buildTimeline();
        timeline.pause(0);

        // Match sprint / section entrance: fire when the section enters,
        // not when the strip alone crosses the line (strip sits below the
        // headline block, so section-in-view left the bar idle).
        const trigger = ScrollTrigger.create({
          trigger: root.closest("section") ?? root,
          start: "top 70%",
          once: true,
          onEnter: () => timeline.play(0),
        });

        replayRef.current = () => {
          timeline.kill();
          timeline = buildTimeline();
          timeline.play(0);
        };

        return () => {
          replayRef.current = null;
          trigger.kill();
          timeline.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setSettled();
        replayRef.current = null;
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [stages] },
  );

  return (
    <div
      ref={rootRef}
      className={cn("flex w-full min-w-0 flex-col gap-space-5", className)}
    >
      <div
        className="engine-strip"
        role="list"
        aria-label="Internal engine stages"
      >
        <div className="engine-strip__track">
          <div
            className="engine-strip__base-line pointer-events-none absolute"
            aria-hidden
          />
          <div
            data-engine-line
            className="engine-strip__draw-line pointer-events-none absolute"
            aria-hidden
          />

          {stages.map((stage) => (
            <div
              key={stage.id}
              role="listitem"
              className="engine-strip__cell relative z-[1] flex min-w-0 flex-col items-center gap-space-4"
            >
              <span
                data-engine-node
                className="size-[9px] shrink-0 rounded-full border border-hairline bg-surface-2"
                aria-hidden
              />
              <span
                data-engine-label
                className="whitespace-nowrap text-center font-mono text-caption uppercase tracking-[0.06em] text-faint"
              >
                {stage.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-space-4 border-t border-hairline pt-space-4">
        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint max-md:text-caption">
          Idea in · foundation out<span className="max-md:hidden"> · ~10 min</span>
        </span>
        <button
          type="button"
          onClick={() => replayRef.current?.()}
          className="shrink-0 cursor-pointer border-0 bg-transparent p-space-1 font-mono text-meta text-faint transition-colors duration-fast ease-sz hover:text-text motion-reduce:hidden max-md:hidden"
        >
          replay ↻
        </button>
        <span className="hidden shrink-0 font-mono text-caption uppercase tracking-[0.08em] text-faint max-md:block">
          swipe →
        </span>
      </div>
    </div>
  );
}
