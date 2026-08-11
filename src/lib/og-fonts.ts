/**
 * Load Google Font files for Next.js ImageResponse.
 * ImageResponse does not inherit next/font — fetch explicitly.
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css = await fetch(cssUrl, {
    headers: {
      // Request a format Satori/ImageResponse can load.
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  }).then((res) => res.text());

  const match = css.match(/src: url\(([^)]+)\) format\('(woff2|truetype|opentype)'\)/);
  if (!match?.[1]) {
    throw new Error(`Could not resolve font URL for ${family} ${weight}`);
  }

  const fontRes = await fetch(match[1]);
  if (!fontRes.ok) {
    throw new Error(`Failed to fetch font file for ${family} ${weight}`);
  }
  return fontRes.arrayBuffer();
}
