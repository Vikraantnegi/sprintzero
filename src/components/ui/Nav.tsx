"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { tokens } from "@/lib/tokens";
import { Button } from "./Button";
import { MonoLabel } from "./MonoLabel";

export type NavLink = {
  href: string;
  label: string;
};

type NavProps = {
  links?: NavLink[];
  activeHref?: string;
  ctaHref?: string;
  forceScrolled?: boolean;
  className?: string;
};

const DEFAULT_LINKS: NavLink[] = [
  { href: "#build", label: "What we build" },
  { href: "#work", label: "How we work" },
  { href: "#engine", label: "Pipeline" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav({
  links = DEFAULT_LINKS,
  activeHref,
  ctaHref = "#start",
  forceScrolled,
  className,
}: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (forceScrolled != null) return;

    const onScroll = () =>
      setScrolled(window.scrollY > tokens.interaction.navScrollAt);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  const isScrolled = forceScrolled ?? scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 box-border flex w-full max-w-[100vw] items-center justify-between gap-space-4 px-[var(--gutter)] transition-[padding,background-color] duration-base ease-sz",
        isScrolled
          ? "border-b border-hairline bg-nav-scrolled py-space-3 backdrop-blur-[12px]"
          : "bg-transparent py-space-5",
        className,
      )}
    >
      <Link
        href="/"
        className="flex min-w-0 shrink items-baseline gap-gap-btn no-underline"
      >
        <span
          className={cn(
            "truncate font-display text-text transition-[font-size] duration-base ease-sz",
            isScrolled ? "text-wordmark-sm" : "text-wordmark",
          )}
        >
          SprintZero.
        </span>
        {!isScrolled ? (
          <MonoLabel
            size="caption"
            className="hidden tracking-[0.1em] sm:inline"
          >
            /STUDIO
          </MonoLabel>
        ) : null}
      </Link>

      <nav
        className="hidden min-w-0 items-center gap-space-5 md:flex"
        aria-label="Primary"
      >
        {links.map((link) => {
          const current = activeHref === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "whitespace-nowrap text-small text-muted no-underline transition-colors duration-fast ease-sz hover:text-text",
                current && "border-b border-accent pb-[2px] text-text",
              )}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <Button
        href={ctaHref}
        size="small"
        trailingArrow
        className="shrink-0"
      >
        Start a sprint
      </Button>
    </header>
  );
}
