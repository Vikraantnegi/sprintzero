"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { capture } from "@/lib/analytics";
import { useNavDrawer } from "@/hooks/useNavDrawer";
import { Button } from "./Button";
import { BrandMark } from "./BrandMark";
import { NavMobileDrawer, type NavLink } from "./NavMobileDrawer";

export type { NavLink };

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

const focusRing =
  "focus-visible:outline-none focus-visible:shadow-focus-accent";

export function Nav({
  links = DEFAULT_LINKS,
  activeHref,
  ctaHref = "/book",
  forceScrolled,
  className,
}: NavProps) {
  const {
    open,
    setOpen,
    close,
    isScrolled,
    panelId,
    panelRef,
    toggleRef,
    onHashClick,
  } = useNavDrawer({ forceScrolled });

  const isLinkActive = (href: string) => {
    if (!activeHref) return false;
    return href === activeHref || href.endsWith(activeHref);
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
          className={cn(
            "flex min-w-0 shrink items-center rounded-sm no-underline",
            focusRing,
          )}
          onClick={close}
        >
          <BrandMark
            wordmarkClassName={cn(
              "transition-[font-size] duration-base ease-sz",
              isScrolled || open ? "text-wordmark-sm" : "text-wordmark",
              "max-md:text-wordmark-sm",
            )}
          />
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
                  "whitespace-nowrap rounded-sm text-small text-muted no-underline transition-colors duration-fast ease-sz hover:text-text",
                  focusRing,
                  current && "border-b border-accent pb-[2px] text-text",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden shrink-0 md:block">
          <Button
            href={ctaHref}
            size="small"
            trailingArrow
            onClick={() => capture("cta_clicked", { location: "nav" })}
          >
            Start a sprint
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={cn(
            "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-sm md:hidden",
            focusRing,
          )}
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

      <NavMobileDrawer
        open={open}
        links={links}
        activeHref={activeHref}
        ctaHref={ctaHref}
        panelId={panelId}
        panelRef={panelRef}
        onClose={close}
        onHashClick={onHashClick}
        isLinkActive={isLinkActive}
      />
    </>
  );
}
