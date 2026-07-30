"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

const steps = [
  {
    day: "01",
    title: "Scope & system",
    copy: "We lock the core user journey, information architecture, and technical stack before a single pixel drifts.",
  },
  {
    day: "02",
    title: "Design & build",
    copy: "UI, flows, and production code move in parallel. Decisions stay tight so momentum never stalls.",
  },
  {
    day: "03",
    title: "Ship & handoff",
    copy: "Deployed product, polished demo path, and a clean handoff so you can keep iterating after the sprint.",
  },
];

export function ProcessSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".process-item", {
          opacity: 0,
          y: 36,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="process"
      ref={rootRef}
      className="relative border-t border-line bg-ink-elevated"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-signal">
            The 72-hour sprint
          </p>
          <h2
            id="process-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl"
          >
            Three days. One outcome: a product in the wild.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fog sm:text-lg">
            We compress discovery, design, and engineering into a single focused
            sprint — so founders stop planning and start proving.
          </p>
        </div>

        <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <li key={step.day} className="process-item">
              <p className="font-mono text-sm text-signal">{step.day}</p>
              <h3 className="mt-4 font-display text-xl font-bold text-chalk">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fog sm:text-base">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
