"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { capture } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { SZ_EASE_FRAMER } from "@/lib/motion/constants";

/** 200ms = tokens durBase / duration-base. */
const FADE_DUR = 0.2;

/**
 * Mobile-only sticky booking CTA.
 * Hidden on desktop, /book, at top of page, and when footer is in view.
 * Shadow: no dedicated token — Nav scrolled blur + hairline instead.
 */
export function StickyMobileCTA({ className }: { className?: string }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.95);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) {
      setFooterInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { root: null, threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  const visible =
    pathname !== "/book" && pastHero && !footerInView;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden",
        className,
      )}
      aria-hidden={!visible}
    >
      <AnimatePresence>
        {visible ? (
          <motion.div
            key="sticky-mobile-cta"
            className="pointer-events-auto border-t border-hairline bg-nav-scrolled px-[var(--gutter)] pt-space-4 backdrop-blur-[12px]"
            style={{
              paddingBottom:
                "max(var(--space-4), env(safe-area-inset-bottom))",
            }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: FADE_DUR, ease: SZ_EASE_FRAMER }
            }
          >
            <Button
              href="/book"
              trailingArrow
              className="w-full justify-center py-space-4"
              onClick={() =>
                capture("cta_clicked", { location: "sticky_mobile" })
              }
            >
              Start a sprint · from $1,500
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
