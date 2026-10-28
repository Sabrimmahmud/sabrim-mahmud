import { Suspense } from "react";
import { DetailSkeleton } from "@/components/detail-skeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AuthorList, StatusTag } from "@/components/entries";
import { CitationBox } from "@/components/citation-box";
import { CopyButton } from "@/components/copy-button";
import { MaybeValue, anyShown, shown } from "@/components/pending";
import { Section } from "@/components/page-intro";
import { JsonLd, articleJsonLd } from "@/components/json-ld";
import { getPublication, publications } from "@/content/publications";
import { isPending } from "@/content/types";
import { doiUrl } from "@/lib/citation";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/publications/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const pub = getPublication(slug);
  if (!pub) return { title: "Publication not found" };
  return pageMetadata({ title: pub.title, description: pub.summary, path: `/publications/${pub.slug}` });
}

const linkLabels = {
  paper: "Paper",
  code: "Code",
  dataset: "Dataset",
  slides: "Slides",
} as const;

/**
 * The slug is URL data, so it is read inside Suspense. Every known slug is still
 * prerendered in full; the fallback only appears in the instant navigation shell.
 */
export default function PublicationPage(props: PageProps<"/publications/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <PublicationDetail params={props.params} />
    </Suspense>
  );
}

async function PublicationDetail({ params }: { params: PageProps<"/publications/[slug]">["params"] }) {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) notFound();

  const index = publications.indexOf(pub);
  const others = publications.filter((p) => p.slug !== pub.slug);

  return (
    <>
      <JsonLd data={articleJsonLd(pub)} />
      <div className="shell pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="hang">
          <nav aria-label="Breadcrumb" className="hang-label">
            <Link href="/publications" className="prose-link">
              Publications
            </Link>
            <span className="block tabular-nums">[{index + 1}]</span>
          </nav>
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[0.875rem] text-ink-3">
              <StatusTag status={pub.status} />
              <span>{pub.type}</span>
              <span>{pub.year}</span>
            </div>
            <h1 className="mt-5 max-w-[48rem] text-step-4 leading-[1.08] md:text-[2.75rem]">{pub.title}</h1>
            <p className="mt-6 text-step-0 text-ink-2">
              <AuthorList authors={pub.authors} />
            </p>
            {pub.authorNote && <p className="mt-1 text-[0.875rem] text-ink-3">{pub.authorNote}</p>}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={doiUrl(pub.doi)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-[0.9375rem] text-paper hover:bg-accent"
              >
                Read at {pub.venue.publisher}
              </a>
              <CopyButton text={pub.doi} label="Copy DOI" />
              <span className="text-[0.875rem] text-ink-3">doi:{pub.doi}</span>
            </div>
          </div>
        </div>
      </div>

      <Section title="Summary" id="summary" aside={pub.summarySource}>
        <p className="max-w-[40rem] font-serif text-step-1 leading-[1.55] text-ink">{pub.summary}</p>
      </Section>

      {shown(pub.problem) && (
      <Section title="Research problem" id="problem">
        <MaybeValue value={pub.problem}>{(v) => <p className="measure text-ink-2">{v}</p>}</MaybeValue>
      </Section>
      )}

      {anyShown([pub.method, pub.dataset]) && (
      <Section title="Method" id="method">
        <MaybeValue value={pub.method}>{(v) => <p className="measure text-ink-2">{v}</p>}</MaybeValue>
        {pub.dataset && (
          <div className="mt-5 max-w-[40rem] text-[0.9375rem]">
            <span className="text-ink-3">Dataset: </span>
            <MaybeValue value={pub.dataset} inline>
              {(v) => <span className="text-ink-2">{v}</span>}
            </MaybeValue>
          </div>
        )}
      </Section>
      )}

      {shown(pub.contribution) && (
      <Section title="Contribution" id="contribution">
        <MaybeValue value={pub.contribution}>{(v) => <p className="measure text-ink-2">{v}</p>}</MaybeValue>
      </Section>
      )}

      {shown(pub.results) && (
      <Section title="Results" id="results" aside="Only figures stated in the published abstract.">
        <MaybeValue value={pub.results}>
          {(rows) => (
            <dl className="divide-y divide-rule border-y border-rule">
              {rows.map((r) => (
                <div key={r.label} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_12rem]">
                  <dt className="text-ink-2">{r.label}</dt>
                  <dd className="font-serif text-step-1 text-ink sm:text-right">{r.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </MaybeValue>
      </Section>
      )}

      <Section title="Publication details" id="details">
        <dl className="grid max-w-[44rem] gap-x-6 gap-y-3 text-[0.9375rem] sm:grid-cols-[9rem_minmax(0,1fr)]">
          <dt className="text-ink-3">Venue</dt>
          <dd className="text-ink-2">{pub.venue.name}</dd>
          <dt className="text-ink-3">Publisher</dt>
          <dd className="text-ink-2">{pub.venue.publisher}</dd>
          {pub.venue.series && (
            <>
              <dt className="text-ink-3">Series</dt>
              <dd className="text-ink-2">
                {pub.venue.series}
                {pub.venue.volume && `, volume ${pub.venue.volume}`}
              </dd>
            </>
          )}
          <dt className="text-ink-3">Pages</dt>
          <dd className="text-ink-2">
            <MaybeValue value={pub.venue.pages} inline>
              {(v) => v}
            </MaybeValue>
          </dd>
          {pub.venue.location && (
            <>
              <dt className="text-ink-3">Location</dt>
              <dd className="text-ink-2">
                {pub.venue.location}
                {pub.venue.dates && `, ${pub.venue.dates}`}
              </dd>
            </>
          )}
          <dt className="text-ink-3">Year</dt>
          <dd className="text-ink-2">{pub.year}</dd>
          <dt className="text-ink-3">Topics</dt>
          <dd className="text-ink-2">{pub.topics.join(", ")}</dd>
        </dl>
        {pub.presentation && (
          <p className="mt-6 max-w-[40rem] text-[0.9375rem] text-ink-2">
            Presented by Sabrim Mahmud at {pub.presentation.event}, {pub.presentation.location},{" "}
            {pub.presentation.date}.{" "}
            <Link href="/achievements#ncim-2025-presenter" className="prose-link">
              See the certificate
            </Link>
          </p>
        )}
      </Section>

      {anyShown(Object.values(pub.links)) && (
      <Section title="Materials" id="materials">
        <ul className="space-y-3">
          {(Object.keys(linkLabels) as (keyof typeof linkLabels)[])
            .filter((k) => shown(pub.links[k]))
            .map((k) => {
              const value = pub.links[k];
              return (
                <li key={k} className="grid gap-1 sm:grid-cols-[6rem_minmax(0,1fr)] sm:items-baseline">
                  <span className="text-[0.9375rem] text-ink-3">{linkLabels[k]}</span>
                  {value && !isPending(value) ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="prose-link break-all">
                      {value}
                    </a>
                  ) : (
                    <MaybeValue value={value} inline>
                      {() => null}
                    </MaybeValue>
                  )}
                </li>
              );
            })}
        </ul>
      </Section>
      )}

      <Section title="Cite this paper" id="cite">
        <CitationBox publication={pub} />
      </Section>

      {others.length > 0 && (
        <Section title="Other papers" id="other">
          <ul className="space-y-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/publications/${p.slug}`} className="prose-link font-serif text-step-1">
                  {p.title}
                </Link>
                <span className="ml-2 text-[0.875rem] text-ink-3">
                  {p.venue.short}, {p.year}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
