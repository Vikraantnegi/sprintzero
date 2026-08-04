"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type CardBase = {
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
  /** Static hover copy for specimen previews */
  forceHover?: boolean;
};

type CardAsDiv = CardBase &
  Omit<HTMLAttributes<HTMLDivElement>, "children" | "className"> & {
    href?: undefined;
  };

type CardAsLink = CardBase &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

export type CardProps = CardAsDiv | CardAsLink;

function useMagnetic(enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const hovering = useRef(false);

  const stop = useCallback(() => {
    if (raf.current != null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    current.current.x += (target.current.x - current.current.x) * 0.15;
    current.current.y += (target.current.y - current.current.y) * 0.15;

    el.style.setProperty("--mx", `${current.current.x}px`);
    el.style.setProperty("--my", `${current.current.y}px`);

    if (
      hovering.current ||
      Math.abs(current.current.x) > 0.1 ||
      Math.abs(current.current.y) > 0.1
    ) {
      raf.current = requestAnimationFrame(tick);
    } else {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
      raf.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const el = ref.current;
    if (!el) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      target.current.x = Math.max(-4, Math.min(4, dx / 20));
      target.current.y = Math.max(-4, Math.min(4, dy / 20));
      hovering.current = true;
      if (raf.current == null) raf.current = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      hovering.current = false;
      target.current.x = 0;
      target.current.y = 0;
      if (raf.current == null) raf.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      stop();
    };
  }, [enabled, stop, tick]);

  return ref;
}

export function Card({
  children,
  className,
  magnetic = false,
  forceHover = false,
  ...props
}: CardProps) {
  const magneticRef = useMagnetic(magnetic);
  const classNames = ["card", forceHover ? "card--force-hover" : "", className]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a
        ref={magneticRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classNames}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const divProps = props as CardAsDiv;
  return (
    <div
      ref={magneticRef as React.RefObject<HTMLDivElement>}
      className={classNames}
      {...divProps}
    >
      {children}
    </div>
  );
}
