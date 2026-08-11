import { ImageResponse } from "next/og";
import { tokens } from "@/lib/tokens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — amber square on near-black (matches BrandMark / icon.svg). */
export default function AppleIcon() {
  const pad = 45;
  const inner = size.width - pad * 2;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: tokens.color.bg,
        }}
      >
        <div
          style={{
            width: inner,
            height: inner,
            background: tokens.color.accent,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
