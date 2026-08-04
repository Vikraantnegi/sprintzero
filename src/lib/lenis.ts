"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { tokens } from "@/lib/tokens";

// Stack note: `lenis` package (stable current; not @studio-freight/lenis).

type UseLenisOptions = {
  /** When false, the stub does not instantiate Lenis. Default false until Stage 2+. */
  enabled?: boolean;
};

/**
 * Smooth-scroll stub. Easing from tokens.motion.ease.
 * Stage 2+: mount from a provider and sync ScrollTrigger / section hooks here.
 */
export function useLenis({ enabled = false }: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const lenis = new Lenis({
      // tokens.motion.ease is cubic-bezier(0.2, 0, 0, 1) — Lenis expects a function;
      // Stage 2+ can parse or swap to a matching ease curve.
      autoRaf: true,
    });

    lenisRef.current = lenis;

    // Stage 2+: wire ScrollTrigger.update on lenis scroll; section animations hook in here.
    void tokens.motion.ease;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
