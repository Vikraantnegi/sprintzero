"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

registerGsap();

export type TimelineStage = {
  id: string;
  label: string;
};

type TimelineOrientation = "horizontal" | "vertical" | "responsive";

type TimelineProps = {
  stages: TimelineStage[];
  activeIndex: number;
  /** Desktop horizontal / mobile vertical when `responsive` (default). */
  orientation?: TimelineOrientation;
  className?: string;
};

export function Timeline({
  stages,
  activeIndex,
  orientation = "responsive",
  className,
}: TimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const forceH = orientation === "horizontal";
  const forceV = orientation === "vertical";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const segsH = rootRef.current?.querySelectorAll("[data-seg-h]");
        const segsV = rootRef.current?.querySelectorAll("[data-seg-v]");

        if (segsH?.length) {
          gsap.fromTo(
            segsH,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top 80%",
              },
            },
          );
        }

        if (segsV?.length) {
          gsap.fromTo(
            segsV,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top 80%",
              },
            },
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-seg-h]", { scaleX: 1 });
        gsap.set("[data-seg-v]", { scaleY: 1 });
      });
    },
    { scope: rootRef },
  );

  // Use md:grid (not md:block) — block would override display:grid and stack nodes.
  const horizontalClass = forceV
    ? "hidden"
    : forceH
      ? "grid"
      : "hidden md:grid";
  const verticalClass = forceH
    ? "hidden"
    : forceV
      ? "flex"
      : "flex md:hidden";

  const n = stages.length;
  // Node centers sit at (i + 0.5) / n — track runs first→last center only.
  const nodeInset = `${50 / n}%`;

  return (
    <div
      ref={rootRef}
      className={cn(
        "rounded-lg border border-hairline bg-surface-1 p-space-7",
        className,
      )}
      role="list"
      aria-label="Pipeline progress"
    >
      {/* Horizontal (desktop) */}
      <div
        className={cn("relative items-start", horizontalClass)}
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        <div
          className="pointer-events-none absolute top-[6px] h-px bg-hairline"
          style={{ left: nodeInset, right: nodeInset }}
          aria-hidden
        />

        {stages.slice(0, -1).map((_, i) => {
          const done = i < activeIndex;
          // Segment spans center of node i → center of node i+1
          const left = `${((i + 0.5) / n) * 100}%`;
          const width = `${100 / n}%`;
          return (
            <div
              key={`seg-h-${stages[i].id}`}
              data-seg-h={done ? "" : undefined}
              className={cn(
                "absolute top-[6px] h-px origin-left",
                done ? "bg-accent" : "bg-transparent",
              )}
              style={{ left, width }}
              aria-hidden
            />
          );
        })}

        {stages.map((stage, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          const status = active ? "active" : done ? "done" : "pending";

          return (
            <div
              key={stage.id}
              role="listitem"
              className="relative z-[1] flex flex-col items-center gap-space-4"
            >
              <span
                className={cn(
                  "size-[13px] rounded-full border",
                  done || active
                    ? "border-transparent bg-accent"
                    : "border-hairline bg-surface-2",
                  active && "animate-[pulse-accent_2s_var(--ease)_infinite]",
                )}
                aria-hidden
              />
              <span
                className={cn(
                  "font-mono text-meta uppercase",
                  active ? "text-accent" : done ? "text-text" : "text-faint",
                )}
              >
                {stage.label}
              </span>
              <span
                className={cn(
                  "font-mono text-caption",
                  active ? "text-accent" : "text-faint",
                )}
              >
                {status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Vertical (mobile) — line on left, nodes beside copy */}
      <div className={cn("relative flex-col gap-space-6", verticalClass)}>
        <div
          className="pointer-events-none absolute top-1 bottom-1 left-[6px] w-px bg-hairline"
          aria-hidden
        />

        {stages.slice(0, -1).map((_, i) => {
          const done = i < activeIndex;
          const top = `${(i / (stages.length - 1)) * 100}%`;
          const height = `${100 / (stages.length - 1)}%`;
          return (
            <div
              key={`seg-v-${stages[i].id}`}
              data-seg-v={done ? "" : undefined}
              className={cn(
                "absolute left-[6px] w-px origin-top",
                done ? "bg-accent" : "bg-hairline",
              )}
              style={{ top, height }}
              aria-hidden
            />
          );
        })}

        {stages.map((stage, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          const status = active ? "active" : done ? "done" : "pending";

          return (
            <div
              key={`v-${stage.id}`}
              role="listitem"
              className="relative z-[1] flex items-start gap-space-4 pl-0"
            >
              <span
                className={cn(
                  "mt-[2px] size-[13px] shrink-0 rounded-full border",
                  done || active
                    ? "border-transparent bg-accent"
                    : "border-hairline bg-surface-2",
                  active && "animate-[pulse-accent_2s_var(--ease)_infinite]",
                )}
                aria-hidden
              />
              <div className="flex flex-col gap-space-1">
                <span
                  className={cn(
                    "font-mono text-meta uppercase",
                    active ? "text-accent" : done ? "text-text" : "text-faint",
                  )}
                >
                  {stage.label}
                </span>
                <span
                  className={cn(
                    "font-mono text-caption",
                    active ? "text-accent" : "text-faint",
                  )}
                >
                  {status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
