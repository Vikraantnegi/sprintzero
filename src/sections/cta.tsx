"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

export function CtaSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-block", {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="start"
      ref={rootRef}
      className="relative border-t border-line overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,255,63,0.14),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="cta-block max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-signal">
            Next sprint
          </p>
          <h2
            id="cta-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-chalk sm:text-5xl"
          >
            Have an idea. Need it real by Monday.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
            Tell us what you&apos;re building and who it&apos;s for. If it fits a
            72-hour sprint, we lock dates and start.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="mailto:hello@sprintzero.studio?subject=72h%20Sprint%20Inquiry"
              className="inline-flex items-center justify-center rounded-sm bg-signal px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-signal-deep"
            >
              Email the studio
            </a>
            <p className="font-mono text-xs text-fog">
              hello@sprintzero.studio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
