"use client";

import type { MouseEvent, RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { capture } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import {
  SZ_DUR,
  SZ_EASE_FRAMER,
  SZ_OVERLAY_DUR,
} from "@/lib/motion/constants";
import { Button } from "./Button";

export type NavLink = {
  href: string;
  label: string;
};

const focusRing =
  "focus-visible:outline-none focus-visible:shadow-focus-accent";

type NavMobileDrawerProps = {
  open: boolean;
  links: NavLink[];
  activeHref?: string;
  ctaHref: string;
  panelId: string;
  panelRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  onHashClick: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
  isLinkActive: (href: string) => boolean;
};

export function NavMobileDrawer({
  open,
  links,
  ctaHref,
  panelId,
  panelRef,
  onClose,
  onHashClick,
  isLinkActive,
}: NavMobileDrawerProps) {
  const reduced = useReducedMotion();

  const overlayMotion = reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: SZ_OVERLAY_DUR, ease: SZ_EASE_FRAMER },
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
        transition: { duration: SZ_DUR, ease: SZ_EASE_FRAMER },
      };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="nav-overlay"
            role="presentation"
            className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-[2px] md:hidden"
            {...overlayMotion}
            onClick={onClose}
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
                        "min-h-11 rounded-sm py-space-3 text-body text-muted no-underline transition-colors duration-fast ease-sz hover:text-text",
                        focusRing,
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
                  onClick={(e) => {
                    capture("cta_clicked", { location: "nav" });
                    onHashClick(e, ctaHref);
                  }}
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
