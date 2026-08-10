"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { tokens } from "@/lib/tokens";
import { useLenisRef } from "@/components/layout/LenisProvider";
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
  { href: "/#what-we-build", label: "What we build" },
  { href: "/#how-we-work", label: "How we work" },
  { href: "/#the-internal-engine", label: "Pipeline" },
  { href: "/#pricing", label: "Pricing" },
];

/** Specimen --ease; drawer uses 320ms for a readable slide. */
const SZ_EASE = [0.2, 0, 0, 1] as const;
const DRAWER_DUR = 0.32;
const OVERLAY_DUR = 0.24;

export function Nav({
  links = DEFAULT_LINKS,
  activeHref,
  ctaHref = "/book",
  forceScrolled,
  className,
}: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenisRef = useLenisRef();
  const reduced = useReducedMotion();
  const panelId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (forceScrolled != null) return;

    const onScroll = () =>
      setScrolled(window.scrollY > tokens.interaction.navScrollAt);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  const close = useCallback(() => setOpen(false), []);

  // Close when crossing up to desktop; lock scroll while open.
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${tokens.layout.bpMobile}px)`);
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const lenis = lenisRef?.current;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    // Focus first interactive control in the panel.
    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      first?.focus();
    }, 0);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      toggleRef.current?.focus();
    };
  }, [open, close, lenisRef]);

  // Simple focus trap inside the drawer.
  useEffect(() => {
    if (!open) return;

    const onTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ].filter((el) => !el.hasAttribute("disabled"));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onTab);
    return () => window.removeEventListener("keydown", onTab);
  }, [open]);

  const isScrolled = forceScrolled ?? scrolled;

  const onHashClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.includes("#") ? `#${href.split("#")[1]}` : href;
    if (!hash.startsWith("#") || hash.length < 2) {
      close();
      return;
    }

    // Same-page hash (or /#id while already on /): Lenis owns scroll.
    // Cross-route /#id from /book: let the browser navigate; just close drawer.
    const onHome = window.location.pathname === "/";
    const isRootHash = href.startsWith("/#") || href.startsWith("#");
    if (onHome && isRootHash && document.getElementById(hash.slice(1))) {
      event.preventDefault();
      close();
      return;
    }

    close();
  };

  const isLinkActive = (href: string) => {
    if (!activeHref) return false;
    return href === activeHref || href.endsWith(activeHref);
  };

  const overlayMotion = reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: OVERLAY_DUR, ease: SZ_EASE },
      };

  const drawerMotion = reduced
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.01 },
      }
    : {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { duration: DRAWER_DUR, ease: SZ_EASE },
      };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 box-border flex w-full max-w-[100vw] items-center justify-between gap-space-4 px-[var(--gutter)] transition-[padding,background-color] duration-base ease-sz",
          isScrolled
            ? "border-b border-hairline bg-nav-scrolled py-space-3 backdrop-blur-[12px]"
            : "bg-transparent py-space-5",
          className,
        )}
      >
        <Link
          href="/"
          className="flex min-w-0 shrink items-baseline gap-gap-btn no-underline"
          onClick={close}
        >
          <span
            className={cn(
              "truncate font-display text-text transition-[font-size] duration-base ease-sz",
              // Specimen mobile: wordmark 18px; desktop top: 20px → scrolled 18px.
              isScrolled || open ? "text-wordmark-sm" : "text-wordmark",
              "max-md:text-wordmark-sm",
            )}
          >
            SprintZero.
          </span>
          {!isScrolled && !open ? (
            <MonoLabel
              size="caption"
              className="hidden tracking-[0.1em] md:inline"
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
            const current = isLinkActive(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                onClick={(e) => onHashClick(e, link.href)}
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

        <div className="hidden shrink-0 md:block">
          <Button href={ctaHref} size="small" trailingArrow>
            Start a sprint
          </Button>
        </div>

        {/* Specimen: two-line hamburger · 44px hit · ≤768 */}
        <button
          ref={toggleRef}
          type="button"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative flex h-[11px] w-5 items-center justify-center">
            <span
              className={cn(
                "absolute left-0 h-px w-5 bg-text transition-transform duration-base ease-sz",
                open ? "translate-y-0 rotate-45" : "-translate-y-[3px]",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-5 bg-text transition-transform duration-base ease-sz",
                open ? "translate-y-0 -rotate-45" : "translate-y-[3px]",
              )}
            />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="nav-overlay"
            role="presentation"
            className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-[2px] md:hidden"
            {...overlayMotion}
            onClick={close}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.aside
            key="nav-drawer"
            id={panelId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="fixed top-0 right-0 z-40 flex h-svh w-[60%] flex-col border-l border-hairline bg-surface-1 md:hidden"
            {...drawerMotion}
          >
            <div className="flex flex-1 flex-col gap-space-8 px-[var(--gutter)] pt-[calc(var(--space-9)+var(--space-4))] pb-space-7">
              <nav aria-label="Mobile" className="flex flex-col gap-space-1">
                {links.map((link) => {
                  const current = isLinkActive(link.href);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      onClick={(e) => onHashClick(e, link.href)}
                      className={cn(
                        "min-h-11 py-space-3 text-body text-muted no-underline transition-colors duration-fast ease-sz hover:text-text",
                        current && "text-text",
                      )}
                    >
                      <span
                        className={cn(
                          current && "border-b border-accent pb-[2px]",
                        )}
                      >
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-auto">
                <Button
                  href={ctaHref}
                  trailingArrow
                  className="w-full justify-center"
                  onClick={(e) => onHashClick(e, ctaHref)}
                >
                  Start a sprint
                </Button>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
