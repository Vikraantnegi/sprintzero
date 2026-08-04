import type { InputHTMLAttributes } from "react";

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
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-space-2">
      {label ? (
        <label
          htmlFor={inputId}
          className="font-mono text-[12px] uppercase tracking-[0.08em] text-faint"
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={[
          "input",
          forceFocus ? "input--force-focus" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </div>
  );
}
