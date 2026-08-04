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
        <span className="card__index">{index}</span>
        <span className="card__glyph" aria-hidden />
      </div>
      <div className="mt-space-6 flex flex-col gap-[6px]">
        <p className="font-mono text-[15px] text-text">{name}</p>
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-faint">
          {role}
        </p>
      </div>
    </>
  );

  const classNames = ["flex flex-col", className].filter(Boolean).join(" ");

  if (href) {
    return (
      <Card
        href={href}
        magnetic={magnetic}
        forceHover={forceHover}
        className={classNames}
      >
        {content}
      </Card>
    );
  }

  return (
    <Card magnetic={magnetic} forceHover={forceHover} className={classNames}>
      {content}
    </Card>
  );
}
