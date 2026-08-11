"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui";
import { cn } from "@/lib/cn";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

const SZ_EASE = "power3.out";
const SZ_DUR = 0.32;

/**
 * Real founder objections — honest solo-studio answers.
 * No volume claims, no fabricated testimonials.
 */
const FAQ_ITEMS = [
  {
    question: "What exactly do I get in 72 hours?",
    answer:
      "A real, deployed, working MVP — code, infrastructure, and handoff — not a prototype or a slide deck. What's in scope is locked on the discovery call before the clock starts.",
  },
  {
    question: "What if it's not done in 72 hours?",
    answer:
      "Fixed scope is what protects the timeline. If something threatens the clock, we cut or renegotiate before inventing hours — not after. There is no fake SLA that pretends overruns never happen; the discipline is deciding early, not overselling late.",
  },
  {
    question: 'What does "MVP" include — and not include?',
    answer:
      "Include: product foundation, a shippable core path, production deploy, and handoff (repo, keys, brand kit). Not include: multi-market expansion, long-tail polish, or every edge case a year-two roadmap would cover. The discovery call draws that line before you pay.",
  },
  {
    question: "Do I own the code?",
    answer:
      "Yes. Full repo, keys, and brand kit transfer to you. No lock-in, no studio-hosted hostage product — you own what shipped.",
  },
  {
    question: "One operator — what about revisions / support after?",
    answer:
      "Thirty days of post-launch support is included — bug fixes and clarifying questions on what shipped. It's a solo shop: capacity is real and finite, so out-of-scope features become a new conversation, not an open-ended retainer.",
  },
] as const;

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

  useGSAP(
    () => {
      const root = rootRef.current;
      const label = labelRef.current;
      const headline = headlineRef.current;
      const list = listRef.current;
      if (!root || !label || !headline || !list) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([label, headline, list], { opacity: 0, y: 12 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.closest("section") ?? root,
              start: "top 75%",
              once: true,
            },
          })
          .to(label, { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE }, 0)
          .to(
            headline,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0.08,
          )
          .to(list, { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE }, 0.16);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([label, headline, list], { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid w-full min-w-0 items-start gap-space-8 md:grid-cols-[0.85fr_1.15fr]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-space-5">
        <div ref={labelRef}>
          <SectionLabel number="06" name="Questions" />
        </div>

        <h2
          ref={headlineRef}
          className="font-display text-display-l font-normal text-text"
        >
          <span className="block">Straight answers.</span>
          {/* Accent touch 1 of 2 */}
          <span className="block italic text-accent">No fine print.</span>
        </h2>
      </div>

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
                    "flex w-full cursor-pointer items-start justify-between gap-space-4 border-0 bg-transparent py-space-5 text-left font-display text-h3 font-medium transition-colors duration-base ease-sz",
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
