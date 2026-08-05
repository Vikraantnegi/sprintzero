"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { MonoLabel } from "./MonoLabel";

registerGsap();

/** Closest GSAP stand-in for specimen --ease cubic-bezier(0.2,0,0,1). */
const SZ_EASE = "power3.out";
const SZ_DUR = 0.32;

/** Match real Section ids from page assembly. */
const STUDIO_LINKS = [
  { href: "#what-we-build", label: "What we build" },
  { href: "#how-we-work", label: "How we work" },
  { href: "#the-internal-engine", label: "Pipeline" },
  { href: "#pricing", label: "Pricing" },
] as const;

const CHANNELS = [
  { href: "https://youtube.com/@AsumaCodes", label: "YouTube" },
  { href: "https://x.com/AsumaCodes", label: "X" },
  { href: "https://github.com/AsumaCodes", label: "GitHub" },
] as const;

const linkClass =
  "text-body text-muted no-underline transition-colors duration-fast ease-sz hover:text-accent-hover motion-reduce:transition-none";

type FooterProps = {
  className?: string;
};

/**
 * Stage 4 · Footer — quiet terminal block.
 * Accent budget: 0 static. Link hover → --accent-hover only (transient).
 * Honesty: one @AsumaCodes handle set, real email/city, no CTA, no copyright row.
 */
export function Footer({ className }: FooterProps) {
  const rootRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const columns = columnsRef.current;
      if (!root || !columns) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(columns, { opacity: 0, y: 12 });

        gsap.to(columns, {
          opacity: 1,
          y: 0,
          duration: SZ_DUR,
          ease: SZ_EASE,
          scrollTrigger: {
            trigger: root.closest("section") ?? root,
            start: "top 90%",
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(columns, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <footer
      ref={rootRef}
      className={cn(
        // Hairline on top, then space-8 gap before columns (mockup padding: 64px)
        "w-full min-w-0 border-t border-hairline pt-space-8 pb-space-8",
        className,
      )}
    >
      <div
        ref={columnsRef}
        className="grid min-w-0 grid-cols-1 gap-[clamp(var(--space-5),2.5vw,var(--space-7))] md:grid-cols-[1.7fr_1fr_1.15fr_minmax(min-content,1.15fr)]"
      >
        {/* Brand — 0 amber; text-price = 40px token stand-in for specimen wordmark */}
        <div className="flex min-w-0 flex-col gap-space-3">
          {/* Mobile 32px has no named token — specimen size only */}
          <p className="font-display text-price font-normal leading-[1.05] tracking-[-0.02em] text-text max-md:text-[2rem]">
            SprintZero.
          </p>
          <p className="font-mono text-mono-label font-normal normal-case text-muted">
            Idea in. Product out.
          </p>
        </div>

        {/* Studio */}
        <div className="flex min-w-0 flex-col gap-space-4 max-md:gap-space-1">
          <MonoLabel className="max-md:pb-space-2">Studio</MonoLabel>
          <nav aria-label="Studio" className="flex flex-col max-md:gap-0 md:gap-space-3">
            {STUDIO_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  linkClass,
                  "max-md:border-divider max-md:py-space-3",
                  i > 0 && "max-md:border-t",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Channels — bare platforms + single handle */}
        <div className="flex min-w-0 flex-col gap-space-4 max-md:gap-space-1">
          <MonoLabel className="max-md:pb-space-2">Channels</MonoLabel>

          {/* Desktop: stacked platform names */}
          <div className="hidden flex-col gap-space-3 md:flex">
            {CHANNELS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(linkClass, "whitespace-nowrap")}
              >
                {link.label}
              </a>
            ))}
            <p className="mt-space-1 border-t border-divider pt-space-3 font-mono text-mono-label normal-case text-faint whitespace-nowrap">
              all @AsumaCodes
            </p>
          </div>

          {/* Mobile: inline row + single handle */}
          <div className="flex flex-col md:hidden">
            <div className="flex flex-wrap items-baseline gap-space-2 py-space-3">
              {CHANNELS.map((link, i) => (
                <span key={link.href} className="flex items-baseline gap-space-2">
                  {i > 0 ? (
                    <span className="text-faint" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </div>
            <p className="border-t border-divider pt-space-3 font-mono text-mono-label normal-case text-faint">
              all @AsumaCodes
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex min-w-0 flex-col gap-space-4 max-md:gap-space-1">
          <MonoLabel className="max-md:pb-space-2">Contact</MonoLabel>
          <a
            href="mailto:hey@trymurmur.studio"
            className={cn(
              linkClass,
              "font-mono text-mono-label normal-case max-md:break-all max-md:py-space-3 max-md:text-small md:whitespace-nowrap",
            )}
          >
            hey@trymurmur.studio
          </a>
          <p className="font-mono text-mono-label normal-case text-faint whitespace-nowrap max-md:border-t max-md:border-divider max-md:pt-space-3 max-md:text-small">
            Chandigarh, IN
          </p>
        </div>
      </div>
    </footer>
  );
}
