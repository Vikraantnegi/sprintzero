/**
 * Shared motion timing — mirrors specimen --ease / --dur-base equivalents.
 * Framer uses cubic-bezier array; GSAP uses the closest power3.out stand-in.
 */

/** Specimen cubic-bezier(0.2, 0, 0, 1) for Framer Motion. */
export const SZ_EASE_FRAMER = [0.2, 0, 0, 1] as const;

/** Closest GSAP stand-in for specimen --ease. */
export const SZ_EASE_GSAP = "power3.out";

/** Default entrance / drawer duration in seconds. */
export const SZ_DUR = 0.32;

/** Nav overlay fade duration. */
export const SZ_OVERLAY_DUR = 0.24;
