import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";

type SectionProps = {
  id?: string;
  number?: string;
  name?: string;
  trailingRule?: boolean;
  terminal?: boolean;
  hero?: boolean;
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
  className,
  innerClassName,
  children,
}: SectionProps) {
  const showLabel = Boolean(number && name);

  return (
    <section
      id={id}
      className={cn(
        "section",
        terminal && "section--terminal",
        hero && "section--hero",
        className,
      )}
    >
      <div className={cn("section__inner", innerClassName)}>
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
    </section>
  );
}
