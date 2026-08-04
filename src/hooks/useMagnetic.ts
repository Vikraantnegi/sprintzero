"use client";

import { useCallback, useEffect, useRef } from "react";
import { tokens } from "@/lib/tokens";

/**
 * Cursor-tracked magnetic offset via --mx/--my CSS vars.
 * Specimen: clamp ≤4px/axis, lerp ~0.15, reset on leave; off on touch + reduced-motion.
 */
export function useMagnetic(enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const hovering = useRef(false);

  const clamp = tokens.interaction.magneticClamp;
  const lerp = tokens.interaction.magneticLerp;

  const stop = useCallback(() => {
    if (raf.current != null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    current.current.x += (target.current.x - current.current.x) * lerp;
    current.current.y += (target.current.y - current.current.y) * lerp;

    el.style.setProperty("--mx", `${current.current.x}px`);
    el.style.setProperty("--my", `${current.current.y}px`);

    if (
      hovering.current ||
      Math.abs(current.current.x) > 0.1 ||
      Math.abs(current.current.y) > 0.1
    ) {
      raf.current = requestAnimationFrame(tick);
    } else {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
      raf.current = null;
    }
  }, [lerp]);

  useEffect(() => {
    if (!enabled) return;

    const el = ref.current;
    if (!el) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      target.current.x = Math.max(-clamp, Math.min(clamp, dx / 20));
      target.current.y = Math.max(-clamp, Math.min(clamp, dy / 20));
      hovering.current = true;
      if (raf.current == null) raf.current = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      hovering.current = false;
      target.current.x = 0;
      target.current.y = 0;
      if (raf.current == null) raf.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      stop();
    };
  }, [enabled, clamp, stop, tick]);

  return ref;
}
