import type { Metadata } from "next";
import { profile, site } from "@/content/site";

export const siteUrl = site.url.replace(/\/$/, "");
export const hasSiteUrl = siteUrl.length > 0;

/**
 * Base for resolving social image URLs. Uses the configured domain, then Vercel's
 * production domain, then localhost. Canonical URLs still require NEXT_PUBLIC_SITE_URL.
 */
export const metadataBase = new URL(
  hasSiteUrl
    ? siteUrl
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
);

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

/**
 * Per-page metadata. Canonical URLs are only emitted once NEXT_PUBLIC_SITE_URL is set,
 * so a preview deployment never claims to be the canonical site.
 */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: hasSiteUrl ? { canonical: path } : undefined,
    openGraph: {
      title: `${title} | ${profile.name}`,
      description,
      url: hasSiteUrl ? path : undefined,
      siteName: profile.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${profile.name}`,
      description,
    },
  };
}

export function absoluteUrl(path: string) {
  return hasSiteUrl ? `${siteUrl}${path}` : path;
}
