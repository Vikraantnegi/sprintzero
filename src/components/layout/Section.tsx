import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";

type SectionProps = {
  id?: string;
  number?: string;
  name?: string;
  trailingRule?: boolean;
  terminal?: boolean;
  hero?: boolean;
  /** Full-bleed slot pinned to the section edge (e.g. BrandStrip). */
  bleed?: React.ReactNode;
  variant?: "default";
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  number,
  name,
  trailingRule,
  terminal = false,
  hero = false,
  bleed,
  className,
  innerClassName,
  children,
}: SectionProps) {
  const showLabel = Boolean(number && name);

  return (
    <section
      id={id}
      className={cn(
        "w-full max-w-full overflow-x-clip px-[var(--gutter)] py-space-9 max-md:py-space-8",
        terminal && "min-h-0",
        hero &&
          "flex min-h-svh flex-col items-stretch justify-start px-0 pb-0 pt-[calc(var(--space-9)+var(--space-8))] max-md:pt-[calc(var(--space-8)+var(--space-8))]",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full min-w-0 max-w-[var(--content-max)]",
          hero &&
            "grid w-full flex-1 place-items-center px-[var(--gutter)] pb-space-6",
          innerClassName,
        )}
      >
        {showLabel ? (
          <div className="mb-space-5">
            <SectionLabel
              number={number!}
              name={name!}
              trailingRule={trailingRule}
            />
          </div>
        ) : null}
        {children}
      </div>
      {bleed ? (
        <div className={cn("w-full shrink-0", hero && "mt-auto")}>{bleed}</div>
      ) : null}
    </section>
  );
}
