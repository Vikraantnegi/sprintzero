"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/Button";
import { CAL_LINK, CAL_URL } from "@/lib/booking";
import { capture, identify } from "@/lib/analytics";
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
    let cancelled = false;
    let offBooking: (() => void) | undefined;

    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;

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

      // Funnel endpoint — real booking only (not /book pageview).
      // bookingSuccessfulV2 is Cal's current API (bookingSuccessful is deprecated).
      const onBookingSuccessful = (e: {
        detail: {
          data: {
            uid?: string;
            startTime?: string;
            endTime?: string;
            eventTypeId?: number | null;
            status?: string;
          };
        };
      }) => {
        const data = e.detail.data;
        if (data.uid) identify(data.uid);
        capture("discovery_call_booked", {
          booking_uid: data.uid,
          start_time: data.startTime,
          end_time: data.endTime,
          event_type_id: data.eventTypeId ?? undefined,
          status: data.status,
        });
      };

      cal("on", {
        action: "bookingSuccessfulV2",
        callback: onBookingSuccessful,
      });

      offBooking = () => {
        cal("off", {
          action: "bookingSuccessfulV2",
          callback: onBookingSuccessful,
        });
      };
    })();

    return () => {
      cancelled = true;
      offBooking?.();
    };
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
