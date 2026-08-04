"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./Button";

export type NavLink = {
  href: string;
  label: string;
};

type NavProps = {
  links?: NavLink[];
  activeHref?: string;
  ctaHref?: string;
  /** Force scrolled appearance for specimen previews */
  forceScrolled?: boolean;
  className?: string;
};

const DEFAULT_LINKS: NavLink[] = [
  { href: "#build", label: "What we build" },
  { href: "#work", label: "How we work" },
  { href: "#pipeline", label: "Pipeline" },
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

    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  const isScrolled = forceScrolled ?? scrolled;

  return (
    <header
      className={[
        "nav flex items-center justify-between gap-space-6",
        isScrolled ? "nav--scrolled" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Link href="/" className="flex items-baseline gap-[10px] !border-0 !p-0">
        <span
          className="font-display text-text transition-[font-size] duration-[var(--dur-base)] ease-[var(--ease)]"
          style={{ fontSize: isScrolled ? 18 : 20, letterSpacing: "-0.01em" }}
        >
          SprintZero.
        </span>
        {!isScrolled ? (
          <span className="font-mono text-[11px] tracking-[0.1em] text-faint">
            /STUDIO
          </span>
        ) : null}
      </Link>

      <nav className="hidden items-center gap-space-6 md:flex" aria-label="Primary">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={activeHref === link.href ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Button href={ctaHref} size="small" trailingArrow>
        Start a sprint
      </Button>
    </header>
  );
}
