import type { MetadataRoute } from "next";
import { absoluteUrl, hasSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: hasSiteUrl ? absoluteUrl("/sitemap.xml") : undefined,
  };
}
