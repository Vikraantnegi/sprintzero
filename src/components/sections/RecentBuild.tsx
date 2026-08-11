"use client";

import { useRef } from "react";
import { Button, Card, MonoLabel, SectionLabel } from "@/components/ui";
import { cn } from "@/lib/cn";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

/** Closest GSAP stand-in for specimen --ease cubic-bezier(0.2,0,0,1). */
const SZ_EASE = "power3.out";
const SZ_DUR = 0.32;

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

  useGSAP(
    () => {
      const root = rootRef.current;
      const label = labelRef.current;
      const headline = headlineRef.current;
      const cards = cardsRef.current;
      const reserved = reservedRef.current;
      if (!root || !label || !headline || !cards || !reserved) return;

      const cardEls = cards.querySelectorAll<HTMLElement>("[data-build-card]");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([label, headline, ...cardEls, reserved], {
          opacity: 0,
          y: 12,
        });

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
            cardEls,
            {
              opacity: 1,
              y: 0,
              duration: SZ_DUR,
              ease: SZ_EASE,
              stagger: 0.08,
            },
            0.16,
          )
          .to(
            reserved,
            { opacity: 1, y: 0, duration: SZ_DUR, ease: SZ_EASE },
            0.32,
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([label, headline, ...cardEls, reserved], {
          opacity: 1,
          y: 0,
        });
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
          <SectionLabel number="05" name="Recent builds" />
        </div>

        <h2
          ref={headlineRef}
          className="font-display text-display-l font-normal text-text"
        >
          <span className="block">Recent builds.</span>
          {/* Accent touch 1 */}
          <span className="block italic text-accent">Real receipts.</span>
        </h2>
      </div>

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
                Screenshot stand-in — decorative until a real asset lands.
                Keep aria-hidden (do not invent dashboard alt for a filename label).
                When swapping to next/image: alt must describe the real product view
                e.g. "Propel — AI marketing CRM dashboard" / "Murmur — studio engine app".
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

                {/* Accent touches 2–3 — amber live links only */}
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

      {/* reserved until a real, approved client quote exists — 0 amber */}
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
