"use client";

import { useEffect } from "react";
import { useLenis } from "@/lib/lenis";

type LenisProviderProps = {
  children: React.ReactNode;
};

/**
 * Enables Lenis smooth scroll when motion is OK, and applies CSS
 * `scroll-snap-type: y proximity` on `html` (disabled under reduced-motion).
 */
export function LenisProvider({ children }: LenisProviderProps) {
  useLenis({ enabled: true });

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (mq.matches) {
        root.classList.remove("sz-snap");
      } else {
        root.classList.add("sz-snap");
      }
    };

    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      root.classList.remove("sz-snap");
    };
  }, []);

  return <>{children}</>;
}
