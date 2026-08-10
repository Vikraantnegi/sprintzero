"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/Button";
import { CAL_LINK, CAL_URL } from "@/lib/booking";
import { cn } from "@/lib/cn";
import { tokens } from "@/lib/tokens";

type SchedulerPanelProps = {
  className?: string;
};

const CAL_NAMESPACE = "book";

/**
 * Contained Cal.com tool — framed as a scheduler inside our shell,
 * not disguised as native UI. Accent touch 2: embed brand + fallback link.
 */
export function SchedulerPanel({ className }: SchedulerPanelProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        styles: {
          branding: {
            brandColor: tokens.color.accent,
          },
        },
        cssVarsPerTheme: {
          light: {
            "cal-brand": tokens.color.accent,
            "cal-brand-emphasis": tokens.color.accentHover,
            "cal-brand-text": tokens.color.bg,
            "cal-bg": tokens.color.bg,
            "cal-bg-emphasis": tokens.color.surface1,
            "cal-bg-subtle": tokens.color.surface2,
            "cal-bg-muted": tokens.color.bg,
            "cal-text": tokens.color.text,
            "cal-text-emphasis": tokens.color.text,
            "cal-text-subtle": tokens.color.textMuted,
            "cal-text-muted": tokens.color.textFaint,
            "cal-border": tokens.color.hairline,
            "cal-border-booker": "transparent",
            "cal-border-booker-width": "0px",
          },
          dark: {
            "cal-brand": tokens.color.accent,
            "cal-brand-emphasis": tokens.color.accentHover,
            "cal-brand-text": tokens.color.bg,
            "cal-bg": tokens.color.bg,
            "cal-bg-emphasis": tokens.color.surface1,
            "cal-bg-subtle": tokens.color.surface2,
            "cal-bg-muted": tokens.color.bg,
            "cal-text": tokens.color.text,
            "cal-text-emphasis": tokens.color.text,
            "cal-text-subtle": tokens.color.textMuted,
            "cal-text-muted": tokens.color.textFaint,
            "cal-border": tokens.color.hairline,
            "cal-border-booker": "transparent",
            "cal-border-booker-width": "0px",
          },
        },
      });
    })();
  }, []);

  return (
    <div
      className={cn(
        "card-texture flex min-w-0 flex-col gap-space-4 rounded-lg border border-hairline bg-surface-1 p-space-5 max-md:p-space-4",
        className,
      )}
    >
      <span className="font-mono text-meta uppercase tracking-[0.1em] text-faint">
        Scheduler · Cal.com
      </span>

      <div className="min-h-[520px] w-full min-w-0 overflow-visible max-md:min-h-[480px]">
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={CAL_LINK}
          config={{
            theme: "dark",
            layout: "month_view",
          }}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
        />
      </div>

      <p className="font-mono text-meta text-faint">
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
