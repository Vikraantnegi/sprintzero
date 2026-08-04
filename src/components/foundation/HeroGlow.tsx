type HeroGlowProps = {
  className?: string;
};

export function HeroGlow({ className }: HeroGlowProps) {
  return (
    <div
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={{ background: "var(--hero-glow)" }}
      aria-hidden
    />
  );
}
