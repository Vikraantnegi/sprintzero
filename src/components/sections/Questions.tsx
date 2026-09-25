"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui";
import { useRevealTimeline } from "@/hooks/useRevealTimeline";
import { cn } from "@/lib/cn";
import { FAQ_ITEMS } from "@/lib/faq";

type QuestionsProps = {
  className?: string;
};

/**
 * 06 — Questions. Accordion FAQ.
 * Accent budget (2): italic No fine print. + active open question text-accent.
 * prefers-reduced-motion: all items open, no animation.
 */
export function Questions({ className }: QuestionsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const [reducedMotion, setReducedMotion] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useRevealTimeline({
    scope: rootRef,
    getTargets: () => {
      const label = labelRef.current;
      const headline = headlineRef.current;
      const list = listRef.current;
      if (!label || !headline || !list) return null;
      return [
        { elements: [label] },
        { elements: [headline] },
        { elements: [list] },
      ];
    },
  });

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid w-full min-w-0 items-start gap-space-8 md:grid-cols-[0.85fr_1.15fr]",
        className,
      )}
    >
      <SectionHeading
        number="06"
        name="Questions"
        labelRef={labelRef}
        headlineRef={headlineRef}
        lines={[
          { text: "Straight answers." },
          { text: "No fine print.", accent: true },
        ]}
      />

      <div ref={listRef} className="min-w-0 border-t border-hairline">
        {FAQ_ITEMS.map((item, index) => {
          const open = reducedMotion || openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <div key={item.question} className="border-b border-hairline">
              <h3 className="m-0">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className={cn(
                    "flex w-full cursor-pointer items-start justify-between gap-space-4 border-0 bg-transparent py-space-5 text-left font-display text-h3 font-medium transition-colors duration-base ease-sz focus-visible:outline-none focus-visible:shadow-focus-accent",
                    open ? "text-accent" : "text-text",
                    "motion-reduce:transition-none",
                    reducedMotion && "cursor-default",
                  )}
                  onClick={() => {
                    if (reducedMotion) return;
                    setOpenIndex((prev) => (prev === index ? -1 : index));
                  }}
                >
                  <span className="text-pretty">{item.question}</span>
                  <span
                    className="shrink-0 font-mono text-meta text-faint"
                    aria-hidden
                  >
                    {open ? "—" : "+"}
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-base ease-sz motion-reduce:transition-none",
                  open
                    ? "grid-rows-[1fr] opacity-100"
                    : "pointer-events-none grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-space-5 text-body text-muted">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
