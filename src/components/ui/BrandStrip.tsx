"use client";

const PHRASES = [
  "IDEA → DEPLOYED",
  "72H SHIP CYCLE",
  "ONE OPERATOR",
  "NEXT.JS · VERCEL · SUPABASE",
  "@ASUMACODES",
] as const;

function Track() {
  return (
    <div className="flex items-center gap-space-6 pr-space-6 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
      {PHRASES.map((phrase) => (
        <span key={phrase} className="flex items-center gap-space-6">
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

export function BrandStrip({ className }: BrandStripProps) {
  return (
    <div
      className={["brand-strip", className].filter(Boolean).join(" ")}
      aria-hidden
    >
      <div className="brand-strip__track">
        <Track />
        <Track />
      </div>
    </div>
  );
}
