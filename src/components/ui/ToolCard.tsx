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
        <span className="font-mono text-meta text-faint">
          {index}
        </span>
        <span
          className="h-[10px] w-[10px] rotate-45 border border-hairline-strong max-md:h-[8px] max-md:w-[8px]"
          aria-hidden
        />
      </div>
      <div className="mt-space-6 flex min-w-0 flex-col gap-[6px] max-md:mt-space-4 max-md:gap-space-1">
        <p className="truncate whitespace-nowrap font-mono text-ui font-normal text-text max-md:text-small">
          {name}
        </p>
        <p className="font-mono text-meta uppercase tracking-[0.06em] text-faint max-md:text-caption">
          {role}
        </p>
      </div>
    </>
  );

  const shared = {
    magnetic,
    forceHover,
    className: cn(
      "group/card flex min-w-0 flex-col max-md:!p-space-4",
      className,
    ),
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
