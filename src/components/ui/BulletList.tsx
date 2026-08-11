import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BulletRowProps = {
  children: ReactNode;
  className?: string;
};

/** Mono-dash row used in pricing, booking, privacy lists. */
export function BulletRow({ children, className }: BulletRowProps) {
  return (
    <li
      className={cn(
        "grid grid-cols-[16px_1fr] gap-space-2 text-body text-muted max-md:grid-cols-[14px_1fr]",
        className,
      )}
    >
      <span className="font-mono text-faint" aria-hidden>
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

type BulletListProps = {
  items: readonly ReactNode[];
  className?: string;
  itemClassName?: string;
};

export function BulletList({ items, className, itemClassName }: BulletListProps) {
  return (
    <ul
      className={cn(
        "flex list-none flex-col gap-space-3 p-0",
        className,
      )}
    >
      {items.map((item, index) => (
        <BulletRow
          key={typeof item === "string" ? item : index}
          className={itemClassName}
        >
          {item}
        </BulletRow>
      ))}
    </ul>
  );
}
