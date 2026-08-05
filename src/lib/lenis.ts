"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

registerGsap();

type UseLenisOptions = {
  /** When false, Lenis does not instantiate. Default false. */
  enabled?: boolean;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Smooth-scroll via Lenis. Skips init when `enabled` is false or
 * `prefers-reduced-motion: reduce`.
 *
 * Shared clock: Lenis RAF is driven by gsap.ticker (autoRaf off) and
 * ScrollTrigger.update runs on Lenis scroll — one loop, no dual RAF fight.
 */
export function useLenis({ enabled = false }: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      // Higher lerp = less sticky lag on content-height sections.
      lerp: 0.12,
      duration: 0.9,
      smoothWheel: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Layout + fonts may settle after first paint — refresh ST once.
    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshId);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
