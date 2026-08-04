import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = {
  label?: string;
  forceFocus?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export function Input({
  label,
  forceFocus = false,
  className,
  id,
  ...props
}: InputProps) {
  const inputId =
    id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-space-2">
      {label ? (
        <label
          htmlFor={inputId}
          className="font-mono text-meta uppercase tracking-[0.08em] text-faint"
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-sm border border-hairline bg-surface-2 px-space-4 py-space-3 font-body text-ui text-text outline-none",
          "placeholder:text-faint",
          "transition-[border-color,box-shadow] duration-fast ease-sz",
          "focus:border-accent focus:shadow-focus-accent",
          forceFocus && "border-accent shadow-focus-accent",
          className,
        )}
        {...props}
      />
    </div>
  );
}
