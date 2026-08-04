import { cn } from "@/lib/cn";

type HairlineProps = {
  variant?: "edge" | "inner";
  className?: string;
};

export function Hairline({ variant = "edge", className }: HairlineProps) {
  return (
    <div
      role="separator"
      className={cn(
        "h-px w-full",
        variant === "inner" ? "bg-divider" : "bg-hairline",
        className,
      )}
    />
  );
}
