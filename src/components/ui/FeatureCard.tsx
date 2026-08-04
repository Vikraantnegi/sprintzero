import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Card } from "./Card";

type FeatureCardProps = {
  title: string;
  body: string;
  linkLabel: string;
  linkHref?: string;
  magnetic?: boolean;
  forceHover?: boolean;
  className?: string;
};

export function FeatureCard({
  title,
  body,
  linkLabel,
  linkHref = "#",
  magnetic,
  forceHover,
  className,
}: FeatureCardProps) {
  return (
    <Card
      magnetic={magnetic}
      forceHover={forceHover}
      className={cn("flex flex-col gap-space-4", className)}
    >
      <h3 className="font-display text-h3 text-text">{title}</h3>
      <p className="text-body text-muted">{body}</p>
      <Button
        variant="text"
        href={linkHref}
        className="self-start"
        forceHover={forceHover}
      >
        {linkLabel}
      </Button>
    </Card>
  );
}
