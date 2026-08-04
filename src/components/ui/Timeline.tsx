"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

registerGsap();

export type TimelineStage = {
  id: string;
  label: string;
};

type TimelineProps = {
  stages: TimelineStage[];
  activeIndex: number;
  className?: string;
};

export function Timeline({ stages, activeIndex, className }: TimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const segs = rootRef.current?.querySelectorAll("[data-seg-done]");
        if (!segs?.length) return;

        gsap.fromTo(
          segs,
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
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-seg-done]", { scaleX: 1 });
      });
    },
    { scope: rootRef },
  );

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
      <div
        className="relative grid items-start"
        style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
      >
        <div
          className="pointer-events-none absolute top-[6px] right-[10%] left-[10%] h-px bg-hairline"
          aria-hidden
        />

        {stages.slice(0, -1).map((_, i) => {
          const done = i < activeIndex;
          const left = `${(i + 0.5) * (100 / stages.length)}%`;
          const width = `${100 / stages.length}%`;
          return (
            <div
              key={`seg-${stages[i].id}`}
              data-seg-done={done ? "" : undefined}
              className={cn(
                "absolute top-[6px] h-px origin-left",
                done ? "bg-accent" : "bg-hairline",
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
    </div>
  );
}
