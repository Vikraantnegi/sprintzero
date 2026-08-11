"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
import { tokens } from "@/lib/tokens";
import { useLenisRef } from "@/components/layout/LenisProvider";

type UseNavDrawerOptions = {
  forceScrolled?: boolean;
};

type UseNavDrawerResult = {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  close: () => void;
  isScrolled: boolean;
  panelId: string;
  panelRef: RefObject<HTMLElement | null>;
  toggleRef: RefObject<HTMLButtonElement | null>;
  onHashClick: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
};

/**
 * Mobile drawer state: scroll lock, focus trap, Escape, desktop breakpoint close.
 */
export function useNavDrawer({
  forceScrolled,
}: UseNavDrawerOptions = {}): UseNavDrawerResult {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenisRef = useLenisRef();
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

    const toggle = toggleRef.current;
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
      toggle?.focus();
    };
  }, [open, close, lenisRef]);

  useEffect(() => {
    if (!open) return;

    const onTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
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

  const onHashClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.includes("#") ? `#${href.split("#")[1]}` : href;
    if (!hash.startsWith("#") || hash.length < 2) {
      close();
      return;
    }

    const onHome = window.location.pathname === "/";
    const isRootHash = href.startsWith("/#") || href.startsWith("#");
    if (onHome && isRootHash && document.getElementById(hash.slice(1))) {
      event.preventDefault();
      close();
      return;
    }

    close();
  };

  return {
    open,
    setOpen,
    close,
    isScrolled: forceScrolled ?? scrolled,
    panelId,
    panelRef,
    toggleRef,
    onHashClick,
  };
}
