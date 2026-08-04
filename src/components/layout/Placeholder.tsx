import { cn } from "@/lib/cn";

type PlaceholderProps = {
  label: string;
  className?: string;
  /** Accent the label faintly; default muted mono. */
  accent?: boolean;
  children?: React.ReactNode;
};

/** Dashed wireframe box for Stage 3 section interiors only. */
export function Placeholder({
  label,
  className,
  accent = false,
  children,
}: PlaceholderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[4.5rem] flex-col items-stretch justify-center gap-space-3 border border-dashed border-hairline-strong p-space-4",
        className,
      )}
    >
      <span
        className={cn(
          "break-words font-mono text-meta uppercase leading-tight tracking-[0.1em]",
          accent ? "text-accent" : "text-faint",
        )}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
