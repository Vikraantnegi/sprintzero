import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "text";
type ButtonSize = "default" | "small";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  trailingArrow?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes({
  variant,
  size,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
}) {
  if (variant === "text") {
    return ["link", className].filter(Boolean).join(" ");
  }

  return [
    "btn",
    variant === "primary" ? "btn-primary" : "btn-ghost",
    size === "small" ? "btn-sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "primary",
  size = "default",
  trailingArrow = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const content = (
    <>
      {children}
      {trailingArrow && variant !== "text" ? (
        <span className="arrow" aria-hidden>
          →
        </span>
      ) : null}
    </>
  );

  const classNames = classes({ variant, size, className });

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classNames} {...rest}>
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} className={classNames} {...buttonProps}>
      {content}
    </button>
  );
}
