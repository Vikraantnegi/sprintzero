import type { ReactNode, Ref } from "react";
import { cn } from "@/lib/cn";
import { SectionLabel } from "./SectionLabel";

export type SectionHeadingLine =
  | { text: string; accent?: false }
  | { text: string; accent: true };

type SectionHeadingProps = {
  number: string;
  name: string;
  lines: readonly SectionHeadingLine[];
  /** Optional supporting body under the headline. */
  body?: ReactNode;
  labelRef?: Ref<HTMLDivElement>;
  headlineRef?: Ref<HTMLHeadingElement>;
  /** Applied when `body` is a string (renders a `<p>`). */
  bodyRef?: Ref<HTMLParagraphElement>;
  trailingRule?: boolean;
  as?: "h1" | "h2";
  headlineClassName?: string;
  bodyClassName?: string;
  className?: string;
};

/**
 * Shared section intro: SectionLabel + display headline (+ optional body).
 */
export function SectionHeading({
  number,
  name,
  lines,
  body,
  labelRef,
  headlineRef,
  bodyRef,
  trailingRule,
  as: Tag = "h2",
  headlineClassName,
  bodyClassName,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-space-5", className)}>
      <div ref={labelRef}>
        <SectionLabel
          number={number}
          name={name}
          trailingRule={trailingRule}
        />
      </div>

      <Tag
        ref={headlineRef}
        className={cn(
          "font-display text-display-l font-normal text-text",
          headlineClassName,
        )}
      >
        {lines.map((line) => (
          <span
            key={line.text}
            className={cn("block", line.accent && "italic text-accent")}
          >
            {line.text}
          </span>
        ))}
      </Tag>

      {typeof body === "string" ? (
        <p ref={bodyRef} className={cn("text-body text-muted", bodyClassName)}>
          {body}
        </p>
      ) : body != null ? (
        body
      ) : null}
    </div>
  );
}
