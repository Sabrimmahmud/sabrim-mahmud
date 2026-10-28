import { links, profile } from "@/content/site";
import { education } from "@/content/education";
import type { Publication } from "@/content/types";
import { absoluteUrl } from "@/lib/seo";
import { doiUrl } from "@/lib/citation";

/** Serializes structured data safely for an inline script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(profile.portrait.src),
    email: `mailto:${profile.email}`,
    jobTitle: "AI Systems Developer and NLP Researcher",
    alumniOf: education
      .filter((d) => d.level === "Undergraduate")
      .map((d) => ({ "@type": "CollegeOrUniversity", name: d.institution })),
    knowsAbout: profile.researchInterests,
    sameAs: [links.github.href, links.linkedin.href],
    address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  };
}

export function articleJsonLd(p: Publication) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: p.title,
    name: p.title,
    author: p.authors.map((a) => ({ "@type": "Person", name: a.name })),
    datePublished: String(p.year),
    publisher: { "@type": "Organization", name: p.venue.publisher },
    identifier: { "@type": "PropertyValue", propertyID: "DOI", value: p.doi },
    sameAs: doiUrl(p.doi),
    about: p.topics,
    abstract: p.summary,
    url: absoluteUrl(`/publications/${p.slug}`),
  };
}
