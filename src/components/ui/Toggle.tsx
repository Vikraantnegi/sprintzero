"use client";

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
      className={["toggle", className].filter(Boolean).join(" ")}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
