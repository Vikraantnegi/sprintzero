"use client";

import { cn } from "@/lib/cn";

const PHRASES = [
  "IDEA → DEPLOYED",
  "72H SHIP CYCLE",
  "ONE OPERATOR",
  "NEXT.JS · VERCEL · SUPABASE",
  "@ASUMACODES",
] as const;

function Content({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="brand-strip__content" aria-hidden={duplicate || undefined}>
      {PHRASES.map((phrase) => (
        <span key={`${duplicate ? "b" : "a"}-${phrase}`} className="flex items-center gap-space-6">
          <span>{phrase}</span>
          <span className="brand-strip__dot" aria-hidden>
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

/**
 * Marquee ticker from Stage 2. Two identical tracks + translateX(-50%) =
 * seamless infinite loop. Pause on hover; static under reduced-motion.
 */
export function BrandStrip({ className }: BrandStripProps) {
  return (
    <div className={cn("brand-strip group", className)} role="presentation" aria-hidden>
      <div className="brand-strip__track">
        <Content />
        <Content duplicate />
      </div>
    </div>
  );
}
