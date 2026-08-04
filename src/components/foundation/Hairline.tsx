type HairlineProps = {
  variant?: "edge" | "inner";
  className?: string;
};

export function Hairline({ variant = "edge", className }: HairlineProps) {
  const bg =
    variant === "inner" ? "var(--divider)" : "var(--hairline)";

  return (
    <div
      role="separator"
      className={`h-px w-full ${className ?? ""}`}
      style={{ backgroundColor: bg }}
    />
  );
}
