"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

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
        const segs = rootRef.current?.querySelectorAll(".timeline-seg--done");
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
        gsap.set(".timeline-seg--done", { scaleX: 1 });
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={["panel", className].filter(Boolean).join(" ")}
      role="list"
      aria-label="Pipeline progress"
    >
      <div
        className="relative grid items-start"
        style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
      >
        <div
          className="pointer-events-none absolute top-[6px] right-[10%] left-[10%] h-px bg-[var(--hairline)]"
          aria-hidden
        />

        {stages.slice(0, -1).map((_, i) => {
          const done = i < activeIndex;
          const left = `${(i + 0.5) * (100 / stages.length)}%`;
          const width = `${100 / stages.length}%`;
          return (
            <div
              key={`seg-${stages[i].id}`}
              className={done ? "timeline-seg--done" : "timeline-seg--pending"}
              style={{
                position: "absolute",
                top: 6,
                left,
                width,
                transformOrigin: "left center",
              }}
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
                className={[
                  "timeline-node",
                  done ? "timeline-node--done" : "",
                  active ? "timeline-node--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden
              />
              <span
                className={[
                  "font-mono text-[12px] uppercase",
                  active ? "text-accent" : done ? "text-text" : "text-faint",
                ].join(" ")}
              >
                {stage.label}
              </span>
              <span
                className={[
                  "font-mono text-[11px]",
                  active ? "text-accent" : "text-faint",
                ].join(" ")}
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
