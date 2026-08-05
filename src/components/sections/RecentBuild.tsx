"use client";

import { useRef } from "react";
import { Button, Card, MonoLabel, SectionLabel } from "@/components/ui";
import { cn } from "@/lib/cn";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

/** Closest GSAP stand-in for specimen --ease cubic-bezier(0.2,0,0,1). */
const SZ_EASE = "power3.out";
const SZ_DUR = 0.32;

type RecentBuildProps = {
  className?: string;
};

/**
 * Stage 4 · Recent Build — one real receipt (Propel).
 * Accent budget (2): italic Real receipts. + Live at trypropel.ai text-link.
 * Honesty: labeled screenshot stand-in; reserved quote slot (dashed, no amber).
 */
export function RecentBuild({ className }: RecentBuildProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reservedRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const label = labelRef.current;
      const headline = headlineRef.current;
      const card = cardRef.current;
      const reserved = reservedRef.current;
      if (!root || !label || !headline || !card || !reserved) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([label, headline, card, reserved], { opacity: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.closest("section") ?? root,
            start: "top 75%",
            once: true,
          },
        });

        tl.to(label, { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE }, 0)
          .to(
            headline,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0.08,
          )
          .to(
            card,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0.16,
          )
          .to(
            reserved,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0.24,
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([label, headline, card, reserved], { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn("flex w-full min-w-0 flex-col gap-space-7", className)}
    >
      <div className="flex min-w-0 flex-col gap-space-5">
        <div ref={labelRef}>
          <SectionLabel number="05" name="Recent build" />
        </div>

        <h2
          ref={headlineRef}
          className="font-display text-display-l font-normal text-text"
        >
          <span className="block">Recent build.</span>
          {/* Accent touch 1 of 2 */}
          <span className="block italic text-accent">Real receipts.</span>
        </h2>
      </div>

      <div ref={cardRef} className="min-w-0">
        <Card className="!rounded-lg !p-space-6 max-md:!p-space-5">
          <div className="grid grid-cols-1 items-center gap-[clamp(var(--space-5),3vw,var(--space-7))] md:grid-cols-[1.1fr_1fr]">
            {/* real screenshot slot — swap stand-in for next/image when asset lands */}
            <div
              className="card-texture flex aspect-[16/10] min-w-0 items-end justify-start rounded-md border border-hairline bg-surface-2 p-space-4"
              aria-hidden
            >
              <MonoLabel size="meta" uppercase={false}>
                propel-dashboard.png
              </MonoLabel>
            </div>

            <div className="flex min-w-0 flex-col gap-space-5">
              <MonoLabel>Shipped solo</MonoLabel>

              <h3 className="font-display text-h3 font-medium text-pretty text-text">
                Propel — AI Marketing CRM
              </h3>

              <p className="text-body text-muted">
                Built solo, end-to-end. Product foundation, architecture, brand
                and build — one operator, one clock.
              </p>

              {/* Accent touch 2 of 2 */}
              <Button
                variant="text"
                href="https://trypropel.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start"
              >
                Live at trypropel.ai{" "}
                <span className="font-mono" aria-hidden>
                  ↗
                </span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* reserved until a real, approved client quote exists */}
      <div
        ref={reservedRef}
        className="flex flex-col gap-space-4 rounded-lg border border-dashed border-hairline p-space-6 max-md:p-space-5"
      >
        <MonoLabel>Client quote — reserved</MonoLabel>
        <p className="font-display text-h3 font-normal italic text-faint">
          Quote goes here once approved.
        </p>
        <span className="font-mono text-meta text-faint">
          Name · Role, Company
        </span>
      </div>
    </div>
  );
}
