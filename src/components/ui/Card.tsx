"use client";

import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/cn";
import { isLinkProps } from "@/lib/polymorphic";

type CardBase = {
  children: ReactNode;
  className?: string;
  magnetic?: boolean;
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

const cardBase = cn(
  "card-texture bg-surface-1 border border-hairline rounded-md p-space-6",
  "transition-[transform,border-color,box-shadow] duration-base ease-sz",
  "[--mx:0px] [--my:0px]",
  "hover:border-accent-border-hover hover:shadow-accent-card",
  "hover:[transform:translate3d(var(--mx),calc(var(--my)-4px),0)]",
  "motion-reduce:hover:shadow-none motion-reduce:hover:[transform:none]",
);

const cardForceHover = cn(
  "border-accent-border-hover shadow-accent-card",
  "[transform:translate3d(0,-4px,0)]",
);

export function Card({
  children,
  className,
  magnetic = false,
  forceHover = false,
  ...props
}: CardProps) {
  const magneticRef = useMagnetic(magnetic);
  const classNames = cn(cardBase, forceHover && cardForceHover, className);

  if (isLinkProps(props)) {
    const { href, ...rest } = props;
    return (
      <a
        ref={(node) => {
          magneticRef.current = node;
        }}
        href={href}
        className={classNames}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      ref={(node) => {
        magneticRef.current = node;
      }}
      className={classNames}
      {...props}
    >
      {children}
    </div>
  );
}
