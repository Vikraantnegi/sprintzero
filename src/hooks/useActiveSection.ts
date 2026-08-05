"use client";

import { useEffect, useState } from "react";

const DEFAULT_IDS = [
  "what-we-build",
  "how-we-work",
  "the-internal-engine",
  "pricing",
] as const;

/**
 * Scroll-spy: returns `#id` of the section occupying the upper mid viewport.
 * One active nav link at a time — existing amber underline only.
 */
export function useActiveSection(
  sectionIds: readonly string[] = DEFAULT_IDS,
): string | undefined {
  const [activeHref, setActiveHref] = useState<string | undefined>(undefined);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        }

        let bestId: string | undefined;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (!bestId) {
          setActiveHref(undefined);
          return;
        }
        setActiveHref(`#${bestId}`);
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeHref;
}
