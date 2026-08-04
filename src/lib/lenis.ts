"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { tokens } from "@/lib/tokens";

// Stack note: `lenis` package (stable current; not @studio-freight/lenis).

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
 * `prefers-reduced-motion: reduce`. CSS proximity snap coexists with Lenis
 * (mandatory snap fights the virtual scroll).
 */
export function useLenis({ enabled = false }: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      // tokens.motion.ease is cubic-bezier(0.2, 0, 0, 1) — Lenis expects a function;
      // Stage 4 can parse or swap to a matching ease curve.
      autoRaf: true,
    });

    lenisRef.current = lenis;

    // Stage 4: sync ScrollTrigger on lenis scroll —
    // lenis.on("scroll", ScrollTrigger.update);
    void tokens.motion.ease;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
