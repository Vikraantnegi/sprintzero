"use client";

import {
  createContext,
  useContext,
  useEffect,
  type MutableRefObject,
  type ReactNode,
} from "react";
import type Lenis from "lenis";
import { useLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollToHash } from "@/lib/scrollToHash";

type LenisContextValue = MutableRefObject<Lenis | null>;

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenisRef(): LenisContextValue | null {
  return useContext(LenisContext);
}

type LenisProviderProps = {
  children: ReactNode;
};

/**
 * Shell scroll: one Lenis + shared GSAP ticker. No page Y-snap —
 * content-height sections + per-section ScrollTrigger reveals.
 * Hash anchors route through Lenis.scrollTo.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useLenis({ enabled: true });

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      root.classList.toggle("sz-reduced-motion", mq.matches);
      // Never enable page snap — it fights short content-height sections.
      root.classList.remove("sz-snap");
      ScrollTrigger.refresh();
    };

    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      root.classList.remove("sz-snap", "sz-reduced-motion");
    };
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest?.(
        "a[href^='#'], a[href^='/#']",
      );
      if (!el || !(el instanceof HTMLAnchorElement)) return;

      const raw = el.getAttribute("href");
      if (!raw || raw.length < 2) return;

      // Normalize /#id → #id for scroll when the target exists on this page.
      const hash = raw.startsWith("/#")
        ? `#${raw.slice(2)}`
        : raw.startsWith("#")
          ? raw
          : null;
      if (!hash || hash.length < 2) return;
      if (!document.getElementById(hash.slice(1))) return;

      event.preventDefault();
      scrollToHash(hash, lenisRef.current);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenisRef]);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
