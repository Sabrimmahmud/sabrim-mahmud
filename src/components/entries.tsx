import Link from "next/link";
import { Fragment } from "react";
import type { Person, Project, Publication, Role } from "@/content/types";
import { statusLabels } from "@/content/publications";
import { doiUrl } from "@/lib/citation";
import { joinList } from "@/lib/utils";
import { isPending } from "@/content/types";
import { ProjectVisual } from "./project-visual";

export function AuthorList({ authors }: { authors: Person[] }) {
  return (
    <>
      {authors.map((a, i) => (
        <Fragment key={a.name}>
          {i > 0 && (i === authors.length - 1 ? ", and " : ", ")}
          {a.isSelf ? <strong className="font-semibold text-ink">{a.name}</strong> : a.name}
        </Fragment>
      ))}
    </>
  );
}

export function StatusTag({ status }: { status: Publication["status"] }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sage-wash px-2.5 py-0.5 text-[0.75rem] font-medium text-ink">
      {statusLabels[status]}
    </span>
  );
}

const publisherTone: Record<string, string> = {
  IEEE: "bg-band text-band-ink",
  Springer: "bg-sage-wash text-ink",
};

/** A small typographic mark for the venue, shown beside a paper. Text only, no publisher logos. */
export function VenueMark({ pub, number }: { pub: Publication; number?: number }) {
  return (
    <div
      aria-hidden
      className={`flex aspect-[4/5] w-full flex-col justify-between rounded-md p-3 ${publisherTone[pub.venue.publisher] ?? "bg-sage-wash text-ink"}`}
    >
      <span className="text-[0.75rem] tabular-nums opacity-70">{number !== undefined ? `[${number}]` : pub.year}</span>
      <span>
        <span className="block font-serif text-[1.35rem] leading-none">{pub.venue.publisher}</span>
        <span className="mt-1.5 block text-[0.75rem] leading-tight opacity-80">{pub.venue.short}</span>
      </span>
    </div>
  );
}

/** A publication in reference-list form, with a venue mark in the margin. */
export function PublicationEntry({
  pub,
  number,
  headingLevel = 3,
}: {
  pub: Publication;
  number?: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="grid grid-cols-[4.25rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-x-6">
      <VenueMark pub={pub} number={number} />
      <div>
        <Heading className="text-step-1 leading-[1.25] sm:text-step-2 sm:leading-[1.2]">
          <Link href={`/publications/${pub.slug}`} className="hover:text-accent">
            {pub.title}
          </Link>
        </Heading>
        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
          <AuthorList authors={pub.authors} />
        </p>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">
          <em className="font-serif text-[1.05em]">{pub.venue.short}</em>, {pub.venue.publisher}, {pub.year}.{" "}
          {pub.venue.series && (
            <>
              {pub.venue.series}
              {pub.venue.volume && `, vol. ${pub.venue.volume}`}
              {pub.venue.pages && !isPending(pub.venue.pages) && `, pp. ${pub.venue.pages}`}.
            </>
          )}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.875rem]">
          <StatusTag status={pub.status} />
          <span className="text-ink-3">First author</span>
          <a href={doiUrl(pub.doi)} className="prose-link" target="_blank" rel="noopener noreferrer">
            doi:{pub.doi}
          </a>
        </div>
      </div>
    </article>
  );
}

/** A project as a card with its visual on top. */
export function ProjectCard({
  project,
  headingLevel = 3,
  large = false,
}: {
  project: Project;
  headingLevel?: 2 | 3;
  large?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-surface transition-colors hover:border-rule-strong ${
        large ? "lg:grid lg:grid-cols-[1.05fr_1fr]" : ""
      }`}
    >
      <ProjectVisual project={project} className={large ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[16/10]"} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.8125rem] text-ink-3">{joinList(project.categories)}</p>
        <Heading className={`mt-1.5 leading-[1.1] ${large ? "text-step-3" : "text-step-2"}`}>
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 group-hover:text-accent">
            {project.title}
          </Link>
        </Heading>
        <p className="mt-1 font-serif italic text-ink-2">{project.subtitle}</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{project.summary}</p>
        <p className="mt-auto pt-4 text-[0.8125rem] text-ink-3">
          {project.role}
          {!isPending(project.context) && `, ${project.context}`}
        </p>
      </div>
    </article>
  );
}

/** A project in list form. */
export function ProjectRow({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative grid gap-5 py-7 first:pt-0 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-8">
      <ProjectVisual project={project} className="aspect-[16/10] rounded-md" sizes="(min-width: 768px) 272px, 100vw" />
      <div>
        <p className="text-[0.8125rem] text-ink-3">{joinList(project.categories)}</p>
        <Heading className="mt-1 text-step-3 leading-[1.1]">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 group-hover:text-accent">
            {project.title}
          </Link>
        </Heading>
        <p className="mt-1 font-serif text-step-1 italic text-ink-2">{project.subtitle}</p>
        <p className="mt-3 max-w-[38rem] text-ink-2">{project.summary}</p>
        <p className="mt-3 text-[0.875rem] text-ink-3">
          {project.role}
          {!isPending(project.context) && `, ${project.context}`}
        </p>
      </div>
    </article>
  );
}

/** A role in the hanging layout: dates in the margin, the work on the right. */
export function RoleEntry({ role, detailed = false }: { role: Role; detailed?: boolean }) {
  return (
    <article id={role.slug} className="hang scroll-mt-24">
      <p className="hang-label tabular-nums">
        {role.start} – {role.end}
        <span className="block">{role.kind}</span>
      </p>
      <div>
        <h3 className="text-step-2 leading-[1.2]">{role.title}</h3>
        <p className="mt-1 text-ink-2">
          {role.organization}
          {role.unit && `, ${role.unit}`}
          <span className="text-ink-3">, {role.location}</span>
        </p>
        {detailed ? (
          <ul className="mt-5 space-y-3.5">
            {role.highlights.map((h) => (
              <li key={h.title} className="grid gap-0.5 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-6">
                <span className="font-medium text-ink">{h.title}</span>
                <span className="text-ink-2">{h.detail}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 max-w-[38rem] text-ink-2">{role.summary}</p>
        )}
      </div>
    </article>
  );
}
