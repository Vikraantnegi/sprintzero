import { cn } from "@/lib/cn";
import { Card } from "./Card";

type ToolCardProps = {
  index: string;
  name: string;
  role: string;
  magnetic?: boolean;
  forceHover?: boolean;
  className?: string;
  href?: string;
};

export function ToolCard({
  index,
  name,
  role,
  magnetic,
  forceHover,
  className,
  href,
}: ToolCardProps) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "font-mono text-meta text-faint transition-colors duration-base ease-sz",
            "group-hover/card:text-accent",
            forceHover && "text-accent",
          )}
        >
          {index}
        </span>
        <span
          className={cn(
            "h-[10px] w-[10px] rotate-45 border border-hairline-strong transition-[border-color] duration-base ease-sz",
            "group-hover/card:border-accent-glyph-hover",
            forceHover && "border-accent-glyph-hover",
          )}
          aria-hidden
        />
      </div>
      <div className="mt-space-6 flex flex-col gap-[6px]">
        <p className="font-mono text-ui font-normal text-text">{name}</p>
        <p className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
          {role}
        </p>
      </div>
    </>
  );

  const shared = {
    magnetic,
    forceHover,
    className: cn("group/card flex flex-col", className),
  };

  if (href) {
    return (
      <Card href={href} {...shared}>
        {content}
      </Card>
    );
  }

  return <Card {...shared}>{content}</Card>;
}
