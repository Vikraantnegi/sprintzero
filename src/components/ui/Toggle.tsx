"use client";

import { cn } from "@/lib/cn";

export type ToggleOption<T extends string = string> = {
  value: T;
  label: string;
};

type ToggleProps<T extends string = string> = {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  "aria-label"?: string;
};

export function Toggle<T extends string = string>({
  options,
  value,
  onChange,
  className,
  "aria-label": ariaLabel = "Toggle",
}: ToggleProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex rounded-sm border border-hairline bg-surface-2 p-[3px]",
        className,
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const pressed = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(option.value)}
            className={cn(
              "cursor-pointer rounded-xs border-0 px-space-3 py-space-2 font-mono text-ui-sm transition-[color,background-color] duration-fast ease-sz",
              pressed
                ? "bg-accent-glow text-accent"
                : "bg-transparent text-muted",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
