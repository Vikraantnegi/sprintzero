"use client";

import { cn } from "@/lib/cn";

const PHRASES = [
  "IDEA → DEPLOYED",
  "72H SHIP CYCLE",
  "ONE OPERATOR",
  "NEXT.JS · VERCEL · SUPABASE",
  "@ASUMACODES",
] as const;

function Track() {
  return (
    <div className="flex items-center gap-space-6 pr-space-6 font-mono text-meta uppercase tracking-[0.1em] text-muted">
      {PHRASES.map((phrase) => (
        <span key={phrase} className="flex items-center gap-space-6">
          <span>{phrase}</span>
          <span className="text-accent" aria-hidden>
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

type BrandStripProps = {
  className?: string;
};

export function BrandStrip({ className }: BrandStripProps) {
  return (
    <div
      className={cn(
        "group overflow-hidden border-y border-hairline py-space-4",
        className,
      )}
      aria-hidden
    >
      <div className="flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Track />
        <Track />
      </div>
    </div>
  );
}
