"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CAL_LINK } from "@/lib/booking";
import { capture, identify } from "@/lib/analytics";
import { tokens } from "@/lib/tokens";

const CAL_NAMESPACE = "book";

/**
 * Heavy Cal.com embed — loaded only after SchedulerPanel gates viewport/interaction.
 * Theme + bookingSuccessfulV2 analytics live here so the shell stays light.
 */
export function CalSchedulerEmbed() {
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
    <Cal
      namespace={CAL_NAMESPACE}
      calLink={CAL_LINK}
      config={{
        theme: "dark",
        layout: "month_view",
      }}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
    />
  );
}
