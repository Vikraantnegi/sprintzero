"use client";

import { useRef } from "react";
import { Button, Card, MonoLabel, SectionHeading } from "@/components/ui";
import { useRevealTimeline } from "@/hooks/useRevealTimeline";
import { cn } from "@/lib/cn";

/**
 * Two real builds — honest role labels.
 * Propel = client-facing, shipped solo. Murmur = our own product / studio engine.
 * Not a paying client case study.
 */
const BUILDS = [
  {
    id: "propel",
    screenshotLabel: "propel-dashboard.png",
    kicker: "Shipped solo",
    title: "Propel — AI Marketing CRM",
    body: "Built solo, end-to-end. Product foundation, architecture, brand and build — one operator, one clock.",
    linkLabel: "Live at trypropel.ai",
    linkHref: "https://trypropel.ai",
  },
  {
    id: "murmur",
    screenshotLabel: "murmur-app.png",
    kicker: "Built in-house",
    title: "Murmur — the studio's engine",
    body: "Our own product, built solo. Turns an idea into a full product foundation in ~10 minutes — it's the pipeline every sprint runs on. Next.js, Supabase (RLS + Auth), OAuth, Vercel, Resend.",
    linkLabel: "Live at app.trymurmur.studio",
    linkHref: "https://app.trymurmur.studio",
  },
] as const;

type RecentBuildProps = {
  className?: string;
};

/**
 * Stage 4 · Recent builds — two real receipts (Propel + Murmur).
 * Accent budget: italic Real receipts. (1) + two amber live links (2–3).
 * Reserved quote slot: 0 amber.
 */
export function RecentBuild({ className }: RecentBuildProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reservedRef = useRef<HTMLDivElement>(null);

  useRevealTimeline({
    scope: rootRef,
    getTargets: () => {
      const label = labelRef.current;
      const headline = headlineRef.current;
      const cards = cardsRef.current;
      const reserved = reservedRef.current;
      if (!label || !headline || !cards || !reserved) return null;
      const cardEls = cards.querySelectorAll<HTMLElement>("[data-build-card]");
      return [
        { elements: [label] },
        { elements: [headline] },
        { elements: [...cardEls], stagger: 0.08 },
        { elements: [reserved] },
      ];
    },
  });

  return (
    <div
      ref={rootRef}
      className={cn("flex w-full min-w-0 flex-col gap-space-7", className)}
    >
      <SectionHeading
        number="05"
        name="Recent builds"
        labelRef={labelRef}
        headlineRef={headlineRef}
        lines={[
          { text: "Ship log." },
          { text: "Real receipts.", accent: true },
        ]}
      />

      <div
        ref={cardsRef}
        className="grid min-w-0 grid-cols-1 gap-space-5 md:grid-cols-2 md:gap-space-6"
      >
        {BUILDS.map((build) => (
          <div key={build.id} data-build-card className="min-w-0">
            <Card
              magnetic
              className="flex h-full !rounded-lg flex-col gap-space-5 !p-space-6 max-md:!p-space-5"
            >
              {/*
                Screenshot slot — CSS stand-in only (no image bytes).
                When real assets land: next/image + BELOW_FOLD_SCREENSHOT_SIZES
                from @/lib/image-pattern (lazy below fold; never priority here).
              */}
              <div
                className="card-texture flex aspect-[16/10] min-w-0 items-end justify-start rounded-md border border-hairline bg-surface-2 p-space-4"
                aria-hidden
              >
                <MonoLabel size="meta" uppercase={false}>
                  {build.screenshotLabel}
                </MonoLabel>
              </div>

              <div className="flex min-w-0 flex-col gap-space-4">
                <MonoLabel>{build.kicker}</MonoLabel>

                <h3 className="font-display text-h3 font-medium text-pretty text-text">
                  {build.title}
                </h3>

                <p className="text-body text-muted">{build.body}</p>

                <Button
                  variant="text"
                  href={build.linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start"
                >
                  {build.linkLabel}{" "}
                  <span className="font-mono" aria-hidden>
                    ↗
                  </span>
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

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
