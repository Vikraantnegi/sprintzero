import { cn } from "@/lib/cn";
import { Card } from "./Card";

type StatCardProps = {
  value: string;
  unit?: string;
  label: string;
  magnetic?: boolean;
  forceHover?: boolean;
  className?: string;
};

export function StatCard({
  value,
  unit,
  label,
  magnetic,
  forceHover,
  className,
}: StatCardProps) {
  return (
    <Card
      magnetic={magnetic}
      forceHover={forceHover}
      className={cn("flex flex-col gap-space-3", className)}
    >
      <p className="font-mono text-stat text-text">
        {value}
        {unit ? <span className="text-faint">{unit}</span> : null}
      </p>
      <p className="font-mono text-meta uppercase tracking-[0.1em] text-faint">
        {label}
      </p>
    </Card>
  );
}
