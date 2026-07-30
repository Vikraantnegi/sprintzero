"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          motionOk: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};

          if (reduceMotion) {
            gsap.set(
              [".hero-brand", ".hero-copy", ".hero-cta", ".hero-visual"],
              { opacity: 1, y: 0 },
            );
            return;
          }

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.from(".hero-brand", { opacity: 0, y: 24, duration: 0.7 })
            .from(".hero-copy", { opacity: 0, y: 28, duration: 0.75 }, "-=0.4")
            .from(
              ".hero-cta > *",
              { opacity: 0, y: 18, duration: 0.55, stagger: 0.08 },
              "-=0.45",
            )
            .from(
              ".hero-visual",
              { opacity: 0, scale: 1.04, duration: 1.1, ease: "power2.out" },
              "-=0.85",
            );

          gsap.to(".hero-progress", {
            scaleX: 1,
            duration: 2.4,
            ease: "power1.inOut",
            delay: 0.6,
          });

          gsap.to(".hero-tick", {
            opacity: 0.35,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: { each: 0.12, from: "start" },
          });
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_18%,rgba(212,255,63,0.14),transparent_42%),radial-gradient(ellipse_at_8%_88%,rgba(212,255,63,0.05),transparent_38%),linear-gradient(180deg,#07080a_0%,#0c0e12_55%,#07080a_100%)]" />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-end px-6 pb-16 pt-28 md:grid-cols-12 md:items-center md:px-8 md:pb-20 md:pt-24">
        <div className="z-10 md:col-span-5 lg:col-span-5">
          <p className="hero-brand font-display text-4xl font-extrabold tracking-tight text-chalk sm:text-5xl lg:text-6xl">
            SprintZero
            <span className="mt-1 block text-signal">Studios</span>
          </p>

          <div className="hero-copy mt-8 max-w-md">
            <h1
              id="hero-heading"
              className="text-balance text-2xl font-semibold leading-snug text-chalk sm:text-3xl"
            >
              Your MVP. Live in 72 hours.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-fog sm:text-lg">
              We design, build, and ship a focused product you can demo, validate,
              and raise with — before the week ends.
            </p>
          </div>

          <div className="hero-cta mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#start"
              className="inline-flex items-center justify-center rounded-sm bg-signal px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-signal-deep"
            >
              Start a 72h sprint
            </a>
            <a
              href="#process"
              className="inline-flex items-center justify-center rounded-sm border border-line px-5 py-3 text-sm font-medium text-chalk transition-colors hover:border-fog/40 hover:bg-white/5"
            >
              See the process
            </a>
          </div>
        </div>

        <div
          className="hero-visual relative mt-14 md:col-span-7 md:mt-0 lg:col-span-7"
          aria-hidden
        >
          <div className="relative min-h-[42vh] w-full md:min-h-[70vh]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,18,24,0.2),rgba(7,8,10,0.85))]" />
            <div className="absolute inset-y-0 right-0 flex w-full items-center justify-center md:justify-end">
              <div className="relative w-full max-w-none select-none md:translate-x-6 lg:translate-x-10">
                <p className="font-display text-[min(42vw,22rem)] font-extrabold leading-none tracking-tighter text-chalk/95">
                  72
                </p>
                <div className="mt-2 flex items-end justify-between gap-6 pr-2 md:pr-8">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-signal">
                      hours to ship
                    </p>
                    <p className="mt-2 max-w-xs text-sm text-fog">
                      Strategy → design → build → launch. One sprint. No theater.
                    </p>
                  </div>
                  <div className="hidden flex-col gap-1.5 sm:flex">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span
                        key={i}
                        className="hero-tick h-1.5 w-10 rounded-full bg-signal/70"
                        style={{ opacity: 0.15 + i * 0.08 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-8 h-px w-full overflow-hidden bg-line">
                  <div className="hero-progress h-full w-full origin-left scale-x-0 bg-signal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
