import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MonoLabelProps = {
  children: ReactNode;
  className?: string;
  /** 11px caption vs 12px meta vs 13px section mono-label */
  size?: "caption" | "meta" | "label";
  uppercase?: boolean;
  muted?: "faint" | "muted" | "accent" | "text";
};

const sizeClass = {
  caption: "text-caption",
  meta: "text-meta",
  label: "text-mono-label",
} as const;

const toneClass = {
  faint: "text-faint",
  muted: "text-muted",
  accent: "text-accent",
  text: "text-text",
} as const;

export function MonoLabel({
  children,
  className,
  size = "label",
  uppercase = true,
  muted = "faint",
}: MonoLabelProps) {
  return (
    <span
      className={cn(
        "font-mono",
        sizeClass[size],
        toneClass[muted],
        uppercase && "uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
