import type { MetadataRoute } from "next";
import { publications } from "@/content/publications";
import { projects } from "@/content/projects";
import { primaryNav, secondaryNav } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...primaryNav.map((n) => n.href), ...secondaryNav.map((n) => n.href)];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path), changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...publications.map((p) => ({ url: absoluteUrl(`/publications/${p.slug}`), changeFrequency: "yearly" as const, priority: 0.8 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
