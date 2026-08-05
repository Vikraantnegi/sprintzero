"use client";

import { useRef } from "react";
import { SectionLabel, ToolCard } from "@/components/ui";
import { cn } from "@/lib/cn";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

const SZ_EASE = "power3.out";
const SZ_DUR = 0.32;

const TOOLS = [
  { index: "01", name: "Claude", role: "reasoning · code" },
  { index: "02", name: "Cursor", role: "editor · agents" },
  { index: "03", name: "Ollama", role: "local LLMs" },
  { index: "04", name: "Whisper", role: "voice → text" },
  { index: "05", name: "Next.js", role: "app shell" },
  { index: "06", name: "Supabase", role: "data · auth" },
  { index: "07", name: "n8n", role: "orchestration" },
  { index: "08", name: "Vercel", role: "deploy" },
  { index: "09", name: "Playwright", role: "browser AI" },
] as const;

type TheStackProps = {
  className?: string;
};

/**
 * Stage 4 · The Stack.
 * Accent budget (1): italic Loud output. Card hover glow is transient.
 */
export function TheStack({ className }: TheStackProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const label = labelRef.current;
      const headline = headlineRef.current;
      const body = bodyRef.current;
      const cards = root?.querySelectorAll<HTMLElement>("[data-stack-card]");
      if (!root || !label || !headline || !body || !cards?.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([label, headline, body, ...cards], { opacity: 0, y: 12 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.closest("section") ?? root,
              start: "top 75%",
              once: true,
            },
          })
          .to(
            label,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0,
          )
          .to(
            headline,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0.08,
          )
          .to(
            body,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0.16,
          )
          .to(
            cards,
            {
              opacity: 1,
              y: 0,
              duration: SZ_DUR,
              ease: SZ_EASE,
              stagger: 0.06,
            },
            0.24,
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([label, headline, body, ...cards], { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid w-full min-w-0 items-center gap-space-8 md:grid-cols-[0.8fr_1.2fr]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-space-5">
        <div ref={labelRef}>
          <SectionLabel number="04" name="The stack" />
        </div>

        <h2
          ref={headlineRef}
          className="font-display text-display-l font-normal text-text"
        >
          <span className="block">Quiet flex.</span>
          {/* The only static amber touch */}
          <span className="block italic text-accent">Loud output.</span>
        </h2>

        <div ref={bodyRef} className="flex flex-col gap-space-5">
          <p className="max-w-[360px] text-body text-muted">
            No tool worship. Each one earns its slot by killing a step in the
            pipeline.
          </p>
          <p className="border-t border-hairline pt-space-4 font-mono text-meta uppercase tracking-[0.08em] text-faint max-md:hidden">
            Nine tools · one operator
          </p>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-2 gap-space-3 min-[381px]:grid-cols-2 md:grid-cols-3 md:gap-space-4 max-[380px]:grid-cols-1">
        {TOOLS.map((tool) => (
          <div key={tool.index} data-stack-card className="min-w-0">
            <ToolCard
              index={tool.index}
              name={tool.name}
              role={tool.role}
              magnetic
              className="h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
