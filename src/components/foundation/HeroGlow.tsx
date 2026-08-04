import { cn } from "@/lib/cn";

type HeroGlowProps = {
  className?: string;
};

export function HeroGlow({ className }: HeroGlowProps) {
  return (
    <div
      className={cn("hero-glow pointer-events-none absolute", className)}
      aria-hidden
    />
  );
}
