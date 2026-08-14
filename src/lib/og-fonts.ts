/**
 * Load Google Font files for Next.js ImageResponse.
 * ImageResponse does not inherit next/font — fetch explicitly.
 *
 * In-module cache: OG routes (`/opengraph-image`, twitter) hit this on the edge.
 * Not on page HTML — caching only avoids repeat font fetches within the isolate.
 */
const fontCache = new Map<string, Promise<ArrayBuffer>>();

export async function loadGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer> {
  const key = `${family}:${weight}`;
  const cached = fontCache.get(key);
  if (cached) return cached;

  const load = (async () => {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
    const css = await fetch(cssUrl, {
      headers: {
        // Request a format Satori/ImageResponse can load.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    }).then((res) => res.text());

    const match = css.match(
      /src: url\(([^)]+)\) format\('(woff2|truetype|opentype)'\)/,
    );
    if (!match?.[1]) {
      throw new Error(`Could not resolve font URL for ${family} ${weight}`);
    }

    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) {
      throw new Error(`Failed to fetch font file for ${family} ${weight}`);
    }
    return fontRes.arrayBuffer();
  })();

  fontCache.set(key, load);
  try {
    return await load;
  } catch (err) {
    fontCache.delete(key);
    throw err;
  }
}
