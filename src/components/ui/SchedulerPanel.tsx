"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CAL_URL } from "@/lib/booking";
import { cn } from "@/lib/cn";

type SchedulerPanelProps = {
  className?: string;
};

const CalSchedulerEmbed = dynamic(
  () =>
    import("./CalSchedulerEmbed").then((m) => m.CalSchedulerEmbed),
  { ssr: false },
);

/**
 * Contained Cal.com tool — framed as a scheduler inside our shell,
 * not disguised as native UI. Accent touch 2: embed brand + fallback link.
 *
 * Cal JS loads only when the panel nears the viewport (or on first focus/
 * pointer interaction) so /book LCP stays on framing copy, not the embed.
 */
export function SchedulerPanel({ className }: SchedulerPanelProps) {
  const gateRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const el = gateRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad]);

  const requestLoad = () => {
    if (!shouldLoad) setShouldLoad(true);
  };

  return (
    <div
      className={cn(
        "card-texture flex min-w-0 flex-col gap-space-4 rounded-lg border border-hairline bg-surface-1 p-space-5 max-md:p-space-4",
        className,
      )}
    >
      <span className="font-mono text-meta uppercase tracking-widest text-faint">
        Scheduler · Cal.com
      </span>

      <div
        ref={gateRef}
        className="min-h-130 w-full min-w-0 overflow-visible max-md:min-h-120"
        onPointerEnter={requestLoad}
        onFocusCapture={requestLoad}
      >
        {shouldLoad ? (
          <CalSchedulerEmbed />
        ) : (
          <div
            className="flex h-full min-h-130 items-center justify-center max-md:min-h-120"
            aria-busy="true"
            aria-label="Loading scheduler"
          >
            <span className="font-mono text-meta text-faint">
              Loading calendar…
            </span>
          </div>
        )}
      </div>

      <p className="font-mono text-meta text-faint text-center">
        Calendar not loading?{" "}
        <Button
          variant="text"
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline font-mono text-meta"
        >
          Book directly here{" "}
          <span aria-hidden>↗</span>
        </Button>
      </p>
    </div>
  );
}
