"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const PHRASES = [
  "IDEA → DEPLOYED",
  "72H SHIP CYCLE",
  "ONE OPERATOR",
  "NEXT.JS · VERCEL · SUPABASE",
  "@ASUMACODES",
] as const;

/** One phrase cycle — width used to decide how many copies fill the viewport. */
function PhraseUnit() {
  return (
    <div className="flex shrink-0 items-center gap-space-6 pr-space-6 font-mono text-meta uppercase tracking-[0.1em] text-muted">
      {PHRASES.map((phrase) => (
        <span
          key={phrase}
          className="flex items-center gap-space-6 whitespace-nowrap"
        >
          <span>{phrase}</span>
          <span className="text-accent" aria-hidden>
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

function Half({ copies, duplicate }: { copies: number; duplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={duplicate || undefined}
    >
      {Array.from({ length: copies }, (_, i) => (
        <PhraseUnit key={i} />
      ))}
    </div>
  );
}

type BrandStripProps = {
  className?: string;
};

/**
 * Same component as /components §06. Two identical halves + translateX(-50%)
 * only loop seamlessly when each half is ≥ the strip width. We duplicate the
 * phrase unit until that holds (full-bleed hero is wider than one unit).
 * Duration scales with copies so speed stays ~one unit / 40s.
 */
export function BrandStrip({ className }: BrandStripProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const root = rootRef.current;
    const unit = unitRef.current;
    if (!root || !unit) return;

    const update = () => {
      const unitW = unit.offsetWidth;
      const rootW = root.offsetWidth;
      if (unitW <= 0 || rootW <= 0) return;
      setCopies(Math.max(1, Math.ceil(rootW / unitW)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    ro.observe(unit);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("brand-strip group relative", className)}
      role="presentation"
      aria-hidden
    >
      <div
        className="brand-strip__track"
        style={{ animationDuration: `calc(var(--dur-marquee) * ${copies})` }}
      >
        <Half copies={copies} />
        <Half copies={copies} duplicate />
      </div>
      {/* Off-flow width probe for one phrase unit */}
      <div
        ref={unitRef}
        className="pointer-events-none absolute left-0 top-0 -z-10 w-max opacity-0"
        aria-hidden
      >
        <PhraseUnit />
      </div>
    </div>
  );
}
