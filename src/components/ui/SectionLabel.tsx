import { cn } from "@/lib/cn";
import { MonoLabel } from "./MonoLabel";

type SectionLabelProps = {
  number: string;
  name: string;
  trailingRule?: boolean;
  className?: string;
};

export function SectionLabel({
  number,
  name,
  trailingRule = false,
  className,
}: SectionLabelProps) {
  const label = (
    <MonoLabel className={cn("block", className)}>
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
