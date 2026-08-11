import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-fonts";
import { tokens } from "@/lib/tokens";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "SprintZero Studios — The 72-hour software studio.";
export const ogContentType = "image/png";

/**
 * Default social image — BrandMark grammar: amber square + SprintZero. + tagline.
 * One amber touch (the square). Fonts loaded explicitly for ImageResponse.
 */
export async function generateOgImage() {
  const [fraunces, jetbrains] = await Promise.all([
    loadGoogleFont("Fraunces", 400),
    loadGoogleFont("JetBrains Mono", 400),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: tokens.color.bg,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Amber BrandMark square — sole accent touch */}
          <div
            style={{
              width: 28,
              height: 28,
              background: tokens.color.accent,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: 72,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: tokens.color.text,
              lineHeight: 1.05,
            }}
          >
            SprintZero.
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            width: 120,
            height: 1,
            background: tokens.color.hairline,
          }}
        />

        <div
          style={{
            marginTop: 36,
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: "0.02em",
            color: tokens.color.textMuted,
            lineHeight: 1.4,
          }}
        >
          The 72-hour software studio.
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 400 },
        {
          name: "JetBrains Mono",
          data: jetbrains,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
