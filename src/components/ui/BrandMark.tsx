import { cn } from "@/lib/cn";
import { MonoLabel } from "./MonoLabel";

type BrandMarkProps = {
  /** Wordmark size classes (e.g. text-wordmark / text-wordmark-sm). */
  wordmarkClassName?: string;
  /** Show the /STUDIO caption next to the wordmark. */
  showStudio?: boolean;
  className?: string;
};

/**
 * Shared lockup: amber square glyph + Fraunces wordmark.
 * Favicon mirrors the same square on --bg.
 */
export function BrandMark({
  wordmarkClassName,
  showStudio = false,
  className,
}: BrandMarkProps) {
  return (
    <span
      className={cn(
        "flex min-w-0 shrink items-center gap-gap-btn",
        className,
      )}
    >
      {/* Amber mark — same glyph as app/icon.svg */}
      <span
        className="size-2 shrink-0 bg-accent max-md:size-[7px]"
        aria-hidden
      />
      <span
        className={cn(
          "truncate font-display leading-none text-text",
          wordmarkClassName,
        )}
      >
        SprintZero.
      </span>
      {showStudio ? (
        <MonoLabel size="caption" className="hidden tracking-[0.1em] md:inline">
          /STUDIO
        </MonoLabel>
      ) : null}
    </span>
  );
}
