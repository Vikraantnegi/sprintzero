import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type PolymorphicHref =
  | { href: string }
  | { href?: undefined };

export type ButtonLikeProps<TExtras = object> =
  | (TExtras &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
        href?: undefined;
      })
  | (TExtras &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
        href: string;
      });

export function isLinkProps<T extends { href?: string }>(
  props: T,
): props is T & { href: string } {
  return typeof props.href === "string" && props.href.length > 0;
}
