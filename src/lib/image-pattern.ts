import type { ImageProps } from "next/image";

/**
 * Pattern for future product screenshots (e.g. Recent builds).
 * Placeholders today are CSS stand-ins — no image bytes.
 *
 * When shipping real assets via `next/image`:
 * - Below-fold / in cards: `loading="lazy"` (default for non-priority)
 * - LCP / hero only: `priority` — never lazy-load the LCP image
 * - Always set `sizes` for responsive slots (e.g. `(max-width: 768px) 100vw, 50vw`)
 * - Prefer WebP/AVIF via next defaults; no fabricated screenshots
 */
export type ProductScreenshotImageProps = Pick<
  ImageProps,
  "src" | "alt" | "sizes" | "className" | "priority" | "loading"
> & {
  /** Prefer false for card/gallery shots; true only for true LCP. */
  priority?: boolean;
};

export const BELOW_FOLD_SCREENSHOT_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px";
