import { cn } from "@/lib/cn";
import { MonoLabel } from "./MonoLabel";

type SectionLabelProps = {
  number: string;
  name: string;
  trailingRule?: boolean;
  className?: string;
  muted?: "faint" | "muted" | "accent" | "text";
};

export function SectionLabel({
  number,
  name,
  trailingRule = false,
  className,
  muted = "faint",
}: SectionLabelProps) {
  const label = (
    <MonoLabel muted={muted} className={cn("block", className)}>
      {number} — {name}
    </MonoLabel>
  );

  if (!trailingRule) return label;

  return (
    <div className="flex items-center gap-space-4">
      {label}
      <div className="h-px flex-1 bg-divider" role="presentation" aria-hidden />
    </div>
  );
}
