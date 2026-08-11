import posthog from "posthog-js";

type Props = Record<string, string | number | boolean | null | undefined>;

function isReady(): boolean {
  return typeof window !== "undefined" && posthog.__loaded === true;
}

/** Capture an event — no-ops until PostHog has initialized. */
export function capture(event: string, properties?: Props): void {
  if (!isReady()) return;
  posthog.capture(event, properties);
}

/** Identify a person — only after explicit identity (e.g. booking). */
export function identify(distinctId: string, properties?: Props): void {
  if (!isReady()) return;
  posthog.identify(distinctId, properties);
}

export { posthog };
