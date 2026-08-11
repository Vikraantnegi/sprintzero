import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Force a static sitemap at build time.
 * Avoid `new Date()` here — it is a request-time API and can make the
 * route dynamic, which has produced intermittent 500s on cold starts.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-08-11";

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/book`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
