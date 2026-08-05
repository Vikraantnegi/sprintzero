"use client";

import type Lenis from "lenis";
import { tokens } from "@/lib/tokens";

/** Condensed nav height + small breathing room so headings clear the bar. */
export const NAV_SCROLL_OFFSET = -(tokens.interaction.navScrollAt + 16);

/**
 * Hash navigation through Lenis when available (keeps smooth-scroll intact).
 * Falls back to native scroll when Lenis is off (reduced-motion / SSR).
 */
export function scrollToHash(
  href: string,
  lenis: Lenis | null | undefined,
): void {
  if (!href.startsWith("#") || typeof window === "undefined") return;

  const id = href.slice(1);
  const target = document.getElementById(id);
  if (!target) return;

  const offset = NAV_SCROLL_OFFSET;

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 0.9 });
  } else {
    const top =
      target.getBoundingClientRect().top + window.scrollY + offset;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }

  history.replaceState(null, "", href);
}
