"use client";

import { useRef } from "react";
import { BulletList } from "@/components/ui/BulletList";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import {
  CONTENT_DUR,
  CONTENT_LAG,
  DRAW_DUR,
  SEG,
  SZ_EASE,
} from "./constants";
import type { SprintStep } from "./types";

registerGsap();

export function SprintTimeline({
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
              <BulletList items={step.bullets} />
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
              <BulletList items={step.bullets} className="gap-space-2" itemClassName="!grid-cols-[14px_1fr]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
