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
      className={["flex flex-col gap-space-3", className].filter(Boolean).join(" ")}
    >
      <p className="card__stat">
        {value}
        {unit ? <span className="text-faint">{unit}</span> : null}
      </p>
      <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-faint">
        {label}
      </p>
    </Card>
  );
}
