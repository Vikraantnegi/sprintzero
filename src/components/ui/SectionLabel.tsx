type SectionLabelProps = {
  number: string;
  name: string;
  trailingRule?: boolean;
  className?: string;
};

export function SectionLabel({
  number,
  name,
  trailingRule = false,
  className,
}: SectionLabelProps) {
  const label = (
    <p className={["section-label", className].filter(Boolean).join(" ")}>
      {number} — {name}
    </p>
  );

  if (!trailingRule) return label;

  return (
    <div className="flex items-center gap-space-4">
      {label}
      <div
        className="h-px flex-1 bg-[var(--divider)]"
        role="presentation"
        aria-hidden
      />
    </div>
  );
}
