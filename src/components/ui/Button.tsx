import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isLinkProps, type ButtonLikeProps } from "@/lib/polymorphic";

type ButtonVariant = "primary" | "ghost" | "text";
type ButtonSize = "default" | "small";

type ButtonExtras = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  trailingArrow?: boolean;
  children: ReactNode;
  className?: string;
  /** Specimen preview: show focus ring without focus */
  forceFocus?: boolean;
  /** Specimen preview: show hover styles without hover */
  forceHover?: boolean;
};

export type ButtonProps = ButtonLikeProps<ButtonExtras>;

const baseBtn =
  "inline-flex items-center font-body font-medium rounded-sm border border-transparent cursor-pointer no-underline transition-[background,border-color,color] duration-fast ease-sz disabled:opacity-40 disabled:cursor-not-allowed group";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-bg hover:bg-accent-hover focus-visible:outline-none focus-visible:shadow-focus-accent disabled:hover:bg-accent",
  ghost:
    "bg-transparent text-text border-hairline hover:bg-surface-1 hover:border-hairline-strong focus-visible:outline-none disabled:hover:bg-transparent disabled:hover:border-hairline",
  text: "bg-transparent text-accent font-medium border-0 border-b border-accent-underline rounded-none pb-[2px] px-0 py-0 hover:text-accent-hover hover:border-accent-hover focus-visible:outline-none",
};

const sizeClass: Record<ButtonSize, string> = {
  default: "text-ui gap-gap-btn px-space-5 py-space-3",
  small: "text-ui-sm gap-space-2 px-space-4 py-space-2",
};

export function Button({
  variant = "primary",
  size = "default",
  trailingArrow = false,
  children,
  className,
  forceFocus = false,
  forceHover = false,
  ...props
}: ButtonProps) {
  const classNames = cn(
    variant === "text" ? variantClass.text : baseBtn,
    variant !== "text" && variantClass[variant],
    variant !== "text" && sizeClass[size],
    variant === "text" && "text-ui",
    forceFocus && variant === "primary" && "shadow-focus-accent",
    forceHover &&
      variant === "primary" &&
      "bg-accent-hover",
    forceHover &&
      variant === "ghost" &&
      "bg-surface-1 border-hairline-strong",
    forceHover &&
      variant === "text" &&
      "text-accent-hover border-accent-hover",
    className,
  );

  const content = (
    <>
      {children}
      {trailingArrow && variant !== "text" ? (
        <span
          className="font-mono transition-transform duration-fast ease-sz group-hover:translate-x-[3px] group-disabled:translate-x-0"
          aria-hidden
        >
          →
        </span>
      ) : null}
    </>
  );

  if (isLinkProps(props)) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classNames} {...rest}>
        {content}
      </a>
    );
  }

  const { type, ...rest } = props;
  return (
    <button type={type ?? "button"} className={classNames} {...rest}>
      {content}
    </button>
  );
}
