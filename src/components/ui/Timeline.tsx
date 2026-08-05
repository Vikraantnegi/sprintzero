"use client";

import { useRef } from "react";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

registerGsap();

export type TimelineStage = {
  id: string;
  label: string;
};

export type SprintStep = {
  id: string;
  day: string;
  range: string;
  title: string;
  bullets: readonly string[];
};

export type EngineStage = {
  id: string;
  label: string;
};

type TimelineOrientation = "horizontal" | "vertical" | "responsive";

type PipelineTimelineProps = {
  variant?: "pipeline";
  stages: TimelineStage[];
  activeIndex: number;
  orientation?: TimelineOrientation;
  steps?: undefined;
  className?: string;
};

type SprintTimelineProps = {
  variant: "sprint";
  steps: readonly SprintStep[];
  stages?: undefined;
  activeIndex?: undefined;
  orientation?: undefined;
  className?: string;
};

type EngineTimelineProps = {
  variant: "engine";
  stages: readonly EngineStage[];
  activeIndex?: undefined;
  orientation?: undefined;
  steps?: undefined;
  className?: string;
};

export type TimelineProps =
  | PipelineTimelineProps
  | SprintTimelineProps
  | EngineTimelineProps;

const SZ_EASE = "power3.out";
const DRAW_DUR = 1.8; // 3 × --dur-draw (600ms)
const SEG = 0.6;
const CONTENT_LAG = 0.12;
const CONTENT_DUR = 0.32;
const ENGINE_START = 0.56; // entrance ends at 240ms + 320ms

function SprintTimeline({
  steps,
  className,
}: {
  steps: readonly SprintStep[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const n = steps.length;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      const trigger = root.closest("section") ?? root;

      const fitTracks = () => {
        // Vertical: first→last node centers
        const hostV = root.querySelector<HTMLElement>("[data-sprint-v]");
        if (hostV) {
          const nodes = hostV.querySelectorAll<HTMLElement>("[data-sprint-node]");
          if (nodes.length >= 2) {
            const hostBox = hostV.getBoundingClientRect();
            const firstBox = nodes[0].getBoundingClientRect();
            const lastBox = nodes[nodes.length - 1].getBoundingClientRect();
            const top = firstBox.top + firstBox.height / 2 - hostBox.top;
            const bottom =
              hostBox.bottom - (lastBox.top + lastBox.height / 2);
            hostV
              .querySelectorAll<HTMLElement>("[data-sprint-v-track]")
              .forEach((el) => {
                el.style.top = `${top}px`;
                el.style.bottom = `${bottom}px`;
              });
          }
        }

        // Horizontal: first→last node centers (accounts for column gap)
        const hostH = root.querySelector<HTMLElement>("[data-sprint-h]");
        if (hostH && hostH.getBoundingClientRect().width > 0) {
          const nodes = hostH.querySelectorAll<HTMLElement>("[data-sprint-node]");
          if (nodes.length >= 2) {
            const hostBox = hostH.getBoundingClientRect();
            const firstBox = nodes[0].getBoundingClientRect();
            const lastBox = nodes[nodes.length - 1].getBoundingClientRect();
            const left =
              firstBox.left + firstBox.width / 2 - hostBox.left;
            const right =
              hostBox.right - (lastBox.left + lastBox.width / 2);
            hostH
              .querySelectorAll<HTMLElement>("[data-sprint-h-track]")
              .forEach((el) => {
                el.style.left = `${left}px`;
                el.style.right = `${right}px`;
              });
          }
        }
      };

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        fitTracks();

        const lineH = root.querySelector<HTMLElement>("[data-sprint-line-h]");
        const lineV = root.querySelector<HTMLElement>("[data-sprint-line-v]");
        const allNodes = [
          ...root.querySelectorAll<HTMLElement>("[data-sprint-node]"),
        ];
        const allContents = [
          ...root.querySelectorAll<HTMLElement>("[data-sprint-content]"),
        ];
        // Document order: n desktop, then n mobile — group by step index.
        const nodePairs = Array.from({ length: n }, (_, i) =>
          [allNodes[i], allNodes[i + n]].filter(Boolean),
        );
        const contentPairs = Array.from({ length: n }, (_, i) =>
          [allContents[i], allContents[i + n]].filter(Boolean),
        );

        if (lineH) gsap.set(lineH, { scaleX: 0, transformOrigin: "left center" });
        if (lineV) gsap.set(lineV, { scaleY: 0, transformOrigin: "top center" });
        gsap.set(allNodes, {
          backgroundColor: "var(--surface-2)",
          borderColor: "var(--hairline)",
          boxShadow: "none",
        });
        gsap.set(allContents, { opacity: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top 70%",
            once: true,
          },
        });

        // Draw both orientations in parallel (one is display:none; both stay in sync).
        if (lineH) {
          tl.to(lineH, { scaleX: 1, duration: DRAW_DUR, ease: SZ_EASE }, 0);
        }
        if (lineV) {
          tl.to(lineV, { scaleY: 1, duration: DRAW_DUR, ease: SZ_EASE }, 0);
        }

        nodePairs.forEach((pair, i) => {
          const t = i * SEG;
          tl.to(
            pair,
            {
              backgroundColor: "var(--accent)",
              borderColor: "transparent",
              boxShadow: "0 0 0 6px var(--accent-glow)",
              duration: 0.2,
              ease: SZ_EASE,
              onStart: () => {
                allNodes.forEach((nEl) => {
                  nEl.classList.remove(
                    "animate-[pulse-accent_2s_var(--ease)_infinite]",
                  );
                });
                pair.forEach((nEl) => {
                  nEl.classList.add(
                    "animate-[pulse-accent_2s_var(--ease)_infinite]",
                  );
                });
              },
            },
            t,
          );

          const content = contentPairs[i];
          if (content.length) {
            tl.to(
              content,
              {
                opacity: 1,
                y: 0,
                duration: CONTENT_DUR,
                ease: SZ_EASE,
              },
              t + CONTENT_LAG,
            );
          }
        });

        tl.add(() => {
          allNodes.forEach((nEl) => {
            nEl.classList.remove(
              "animate-[pulse-accent_2s_var(--ease)_infinite]",
            );
          });
        }, DRAW_DUR);

        const onResize = () => fitTracks();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        fitTracks();
        gsap.set("[data-sprint-line-h]", { scaleX: 1 });
        gsap.set("[data-sprint-line-v]", { scaleY: 1 });
        gsap.set("[data-sprint-node]", {
          backgroundColor: "var(--accent)",
          borderColor: "transparent",
          boxShadow: "0 0 0 6px var(--accent-glow)",
        });
        gsap.set("[data-sprint-content]", { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [steps] },
  );

  return (
    <div
      ref={rootRef}
      className={cn("w-full min-w-0", className)}
      role="list"
      aria-label="How a sprint works"
    >
      {/* Desktop — horizontal, content below nodes */}
      <div
        data-sprint-h
        className="relative hidden grid-cols-3 gap-space-6 pt-2 md:grid md:gap-space-7"
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        <div
          data-sprint-h-track
          className="pointer-events-none absolute top-[14px] z-0 h-px bg-hairline"
          aria-hidden
        />
        <div
          data-sprint-h-track
          data-sprint-line-h
          className="pointer-events-none absolute top-[14px] z-0 h-px origin-left bg-accent"
          aria-hidden
        />

        {steps.map((step) => (
          <div
            key={step.id}
            role="listitem"
            className="relative z-[1] flex min-w-0 flex-col gap-space-5 pt-11"
          >
            <span
              data-sprint-node
              className="absolute top-0 left-0 size-[13px] rounded-full border border-hairline bg-surface-2"
              aria-hidden
            />
            <div data-sprint-content className="flex flex-col gap-space-4">
              <div className="flex items-baseline justify-between gap-space-3 border-b border-hairline pb-space-4">
                <span className="whitespace-nowrap font-mono text-mono-label uppercase tracking-[0.1em] text-text">
                  {step.day}
                </span>
                <span className="whitespace-nowrap font-mono text-mono-label tracking-[0.06em] text-faint">
                  {step.range}
                </span>
              </div>
              <h3 className="font-display text-h3 font-medium text-text">
                {step.title}
              </h3>
              <ul className="flex list-none flex-col gap-space-3 p-0">
                {step.bullets.map((b) => (
                  <li
                    key={b}
                    className="grid grid-cols-[16px_1fr] gap-space-2 text-body text-muted"
                  >
                    <span className="font-mono text-faint" aria-hidden>
                      —
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile — vertical, content beside nodes */}
      <div
        data-sprint-v
        className="relative flex flex-col gap-space-8 pl-space-6 md:hidden"
      >
        <div
          data-sprint-v-track
          className="pointer-events-none absolute left-[6px] z-0 w-px bg-hairline"
          aria-hidden
        />
        <div
          data-sprint-v-track
          data-sprint-line-v
          className="pointer-events-none absolute left-[6px] z-0 w-px origin-top bg-accent"
          aria-hidden
        />

        {steps.map((step) => (
          <div
            key={`v-${step.id}`}
            role="listitem"
            className="relative z-[1] flex min-w-0 flex-col gap-space-3"
          >
            <span
              data-sprint-node
              className="absolute top-[2px] left-[-32px] size-[13px] rounded-full border border-hairline bg-surface-2"
              aria-hidden
            />
            <div data-sprint-content className="flex flex-col gap-space-3">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-meta uppercase tracking-[0.1em] text-text">
                  {step.day}
                </span>
                <span className="font-mono text-meta tracking-[0.06em] text-faint">
                  {step.range}
                </span>
              </div>
              <h3 className="font-display text-h3 font-medium text-text">
                {step.title}
              </h3>
              <ul className="flex list-none flex-col gap-space-2 p-0">
                {step.bullets.map((b) => (
                  <li
                    key={b}
                    className="grid grid-cols-[14px_1fr] gap-space-2 text-body text-muted"
                  >
                    <span className="font-mono text-faint" aria-hidden>
                      —
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EngineTimeline({
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

function PipelineTimeline({
  stages,
  activeIndex,
  orientation = "responsive",
  className,
}: PipelineTimelineProps) {
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

export function Timeline(props: TimelineProps) {
  if (props.variant === "sprint") {
    return (
      <SprintTimeline steps={props.steps} className={props.className} />
    );
  }

  if (props.variant === "engine") {
    return (
      <EngineTimeline stages={props.stages} className={props.className} />
    );
  }

  return (
    <PipelineTimeline
      stages={props.stages}
      activeIndex={props.activeIndex}
      orientation={props.orientation}
      className={props.className}
    />
  );
}
