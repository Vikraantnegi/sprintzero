"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { capture } from "@/lib/analytics";

const PAGEVIEW_PATHS = new Set(["/", "/book", "/privacy"]);

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !PAGEVIEW_PATHS.has(pathname)) return;
    if (!posthog.__loaded) return;

    const search = searchParams?.toString();
    const url = search
      ? `${window.location.origin}${pathname}?${search}`
      : `${window.location.origin}${pathname}`;

    capture("$pageview", { $current_url: url });

    if (pathname === "/book") {
      capture("book_page_viewed");
    }
  }, [pathname, searchParams]);

  return null;
}

type PostHogProviderProps = {
  children: React.ReactNode;
};

/**
 * PostHog init — locked gating must match /privacy:
 * EU host, respect_dnt, person_profiles identified_only, no consent banner.
 * Pageviews mount only after init so nothing captures before the provider is ready.
 */
export function PostHogProvider({ children }: PostHogProviderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!key || !host) return;

    posthog.init(key, {
      api_host: host,
      respect_dnt: true, // DNT on → capture nothing
      person_profiles: "identified_only",
      capture_pageview: false, // App Router: manual
      // consent banner pending KAN-78 — DNT is the interim gate
    });
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
      ) : null}
      {children}
    </>
  );
}
