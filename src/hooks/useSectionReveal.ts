"use client";

import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

/**
 * Subtle fade/rise for marketing sections (skips hero).
 * Respects prefers-reduced-motion via matchMedia.
 */
export function useSectionReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const sections = gsap.utils.toArray<HTMLElement>(
        "main .section:not(.section--hero):not(.section--terminal):not(.section--stagger)",
      );

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        "main .section:not(.section--hero):not(.section--terminal):not(.section--stagger)",
        {
          opacity: 1,
          y: 0,
        },
      );
    });

    return () => mm.revert();
  }, []);
}
