"use client";

import { type RefObject } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { SZ_DUR, SZ_EASE_GSAP } from "@/lib/motion/constants";

registerGsap();

export type RevealGroup = {
  /** One or more elements to animate as a group. */
  elements: HTMLElement[];
  /** Stagger between elements inside this group (default 0). */
  stagger?: number;
};

type UseRevealTimelineOptions = {
  scope: RefObject<HTMLElement | null>;
  /**
   * Resolve animation targets. Return null to skip setup
   * (e.g. when required refs are not mounted yet).
   */
  getTargets: () => RevealGroup[] | null;
  /** ScrollTrigger start. Default "top 75%". */
  start?: string;
  /** Delay step between successive groups. Default 0.08. */
  step?: number;
  /** Initial Y offset. Default 12. */
  y?: number;
  duration?: number;
  ease?: string;
};

/**
 * Shared section entrance: fade/rise with reduced-motion fallback.
 * Uses gsap.matchMedia + ScrollTrigger once.
 */
export function useRevealTimeline({
  scope,
  getTargets,
  start = "top 75%",
  step = 0.08,
  y = 12,
  duration = SZ_DUR,
  ease = SZ_EASE_GSAP,
}: UseRevealTimelineOptions) {
  useGSAP(
    () => {
      const root = scope.current;
      const groups = getTargets();
      if (!root || !groups?.length) return;

      const flat = groups.flatMap((g) => g.elements).filter(Boolean);
      if (!flat.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(flat, { opacity: 0, y });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.closest("section") ?? root,
            start,
            once: true,
          },
        });

        let at = 0;
        for (const group of groups) {
          if (!group.elements.length) continue;
          tl.to(
            group.elements,
            {
              opacity: 1,
              y: 0,
              duration,
              ease,
              stagger: group.stagger ?? 0,
            },
            at,
          );
          at += step;
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(flat, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope },
  );
}
