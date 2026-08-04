// Single source of truth for SprintZero design tokens — import from here; never hardcode values elsewhere.
// Stack note: Next.js 16.2.12 (stable current) used instead of brief’s Next 15.

export const tokens = {
  color: {
    bg: "#0a0a0a",
    surface1: "#141414",
    surface2: "#1c1c1c",
    text: "#e8e6e1",
    textMuted: "#a3a09a",
    textFaint: "#6b6862",
    accent: "#e0a832",
    accentHover: "#f0bc4c",
    accentGlow: "rgba(224, 168, 50, 0.12)",
    hairline: "rgba(232, 230, 225, 0.08)",
    divider: "rgba(232, 230, 225, 0.06)",
  },
  type: {
    displayXl: {
      size: "4.75rem",
      lineHeight: 1.05,
      letterSpacing: "-0.02em",
      weight: 400,
    },
    displayL: {
      size: "3.25rem",
      lineHeight: 1.12,
      letterSpacing: "-0.015em",
      weight: 400,
    },
    h3: {
      size: "1.4375rem",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
      weight: 500,
    },
    body: {
      size: "1.0625rem",
      lineHeight: 1.6,
      letterSpacing: "0",
      weight: 400,
    },
    small: {
      size: "0.875rem",
      lineHeight: 1.55,
      letterSpacing: "0",
      weight: 400,
    },
    monoLabel: {
      size: "0.8125rem",
      lineHeight: 1.2,
      letterSpacing: "0.1em",
      weight: 400,
      textTransform: "uppercase" as const,
    },
  },
  space: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 24,
    6: 32,
    7: 48,
    8: 64,
    9: 96,
    10: 128,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  motion: {
    ease: "cubic-bezier(0.2, 0, 0, 1)",
    durFast: "120ms",
    durBase: "200ms",
  },
  depth: {
    grainOpacity: 0.04,
    heroGlow: 0.12,
    cardTexture: 0.03,
  },
} as const;

export type Tokens = typeof tokens;
