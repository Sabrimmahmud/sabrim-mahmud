import { Suspense } from "react";
import { DetailSkeleton } from "@/components/detail-skeleton";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Info } from "lucide-react";
import { FlowDiagram } from "@/components/flow-diagram";
import { MaybeValue, Pending, anyShown, shown } from "@/components/pending";
import { Section } from "@/components/page-intro";
import { getProject, projects } from "@/content/projects";
import { isPending } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { joinList } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return pageMetadata({
    title: `${project.title}: ${project.subtitle}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="measure list-none space-y-2.5 text-ink-2">
      {items.map((item) => (
        <li key={item} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-sage">
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * The slug is URL data, so it is read inside Suspense. Every known slug is still
 * prerendered in full; the fallback only appears in the instant navigation shell.
 */
export default function ProjectPage(props: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProjectDetail params={props.params} />
    </Suspense>
  );
}

async function ProjectDetail({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <div className="shell pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="hang">
          <nav aria-label="Breadcrumb" className="hang-label">
            <Link href="/projects" className="prose-link">
              Projects
            </Link>
          </nav>
          <div>
            <h1 className="text-step-5 leading-[1] md:text-[3.75rem]">{project.title}</h1>
            <p className="mt-3 font-serif text-step-2 italic text-ink-2">{project.subtitle}</p>
            <p className="mt-6 max-w-[40rem] text-step-1 leading-[1.55] text-ink-2">{project.summary}</p>
            <dl className="mt-8 grid max-w-[40rem] grid-cols-[6rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-t border-rule pt-5 text-[0.9375rem]">
              <dt className="text-ink-3">Where</dt>
              <dd className="text-ink-2">
                <MaybeValue value={project.context} inline>
                  {(v) => v}
                </MaybeValue>
              </dd>
              <dt className="text-ink-3">When</dt>
              <dd className="text-ink-2">
                <MaybeValue value={project.period} inline>
                  {(v) => v}
                </MaybeValue>
              </dd>
              <dt className="text-ink-3">Role</dt>
              <dd className="text-ink-2">{project.role}</dd>
              <dt className="text-ink-3">Areas</dt>
              <dd className="text-ink-2">{joinList(project.categories)}</dd>
            </dl>
            {project.thesis && (
              <p className="mt-6 max-w-[40rem] text-[0.9375rem] leading-relaxed text-ink-2">
                <span className="font-medium text-ink">Undergraduate thesis. </span>
                {project.thesis}
              </p>
            )}
            {project.notice && (
              <p className="mt-6 flex max-w-[40rem] gap-2.5 rounded-md bg-sage-wash px-3.5 py-2.5 text-[0.875rem] leading-relaxed text-ink">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
                {project.notice}
              </p>
            )}
          </div>
        </div>
      </div>

      {shown(project.problem) && (
        <Section title="Problem" id="problem">
          <MaybeValue value={project.problem}>{(v) => <p className="measure text-ink-2">{v}</p>}</MaybeValue>
        </Section>
      )}

      {shown(project.objectives) && (
        <Section title="Objectives" id="objectives">
          <MaybeValue value={project.objectives}>{(v) => <List items={v} />}</MaybeValue>
        </Section>
      )}

      <Section title="Role and responsibilities" id="role">
        <p className="mb-4 text-ink">{project.role}</p>
        <List items={project.responsibilities} />
      </Section>

      <Section title="Architecture" id="architecture" aside={project.architecture.note}>
        <FlowDiagram steps={project.architecture.steps} label={`${project.title} pipeline`} />
      </Section>

      {(project.stack.length > 0 || shown({ pending: "" })) && (
      <Section title="Technology" id="stack">
        {project.stack.length > 0 ? (
          <ul className="flex max-w-[40rem] flex-wrap gap-2">
            {project.stack.map((t) => (
              <li key={t} className="rounded-full border border-rule-strong px-3 py-1 text-[0.875rem] text-ink-2">
                {t}
              </li>
            ))}
          </ul>
        ) : (
          <Pending what="The languages, libraries and tools used in this project." />
        )}
      </Section>
      )}

      <Section title="Implementation" id="implementation">
        <List items={project.implementation} />
      </Section>

      {anyShown([project.challenges, project.solutions]) && (
        <Section title="Challenges and solutions" id="challenges">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-sans text-[0.9375rem] font-semibold text-ink">Challenges</h3>
              <MaybeValue value={project.challenges}>{(v) => <List items={v} />}</MaybeValue>
            </div>
            <div>
              <h3 className="mb-3 font-sans text-[0.9375rem] font-semibold text-ink">Solutions</h3>
              <MaybeValue value={project.solutions}>{(v) => <List items={v} />}</MaybeValue>
            </div>
          </div>
        </Section>
      )}

      {shown(project.outcomes) && (
        <Section title="Outcomes" id="outcomes">
          <MaybeValue value={project.outcomes}>{(v) => <List items={v} />}</MaybeValue>
        </Section>
      )}

      {shown(project.screenshots) && (
        <Section title="Screenshots" id="screenshots">
          <MaybeValue value={project.screenshots}>
            {(shots) => (
              <div className="grid gap-6">
                {shots.map((s) => (
                  <figure key={s.src}>
                    <Image src={s.src} width={s.width} height={s.height} alt={s.alt} className="rounded-md border border-rule" />
                    <figcaption className="mt-2 text-[0.875rem] text-ink-3">{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </MaybeValue>
        </Section>
      )}

      {anyShown([project.links.code, project.links.demo]) && (
        <Section title="Links" id="links">
          <ul className="space-y-3">
            {(["code", "demo"] as const)
              .filter((k) => shown(project.links[k]))
              .map((k) => {
                const v = project.links[k];
                return (
                  <li key={k} className="grid gap-1 sm:grid-cols-[6rem_minmax(0,1fr)] sm:items-baseline">
                    <span className="text-[0.9375rem] text-ink-3">{k === "code" ? "Code" : "Demo"}</span>
                    {v && !isPending(v) ? (
                      <a href={v} target="_blank" rel="noopener noreferrer" className="prose-link break-all">
                        {v}
                      </a>
                    ) : (
                      <MaybeValue value={v} inline>
                        {() => null}
                      </MaybeValue>
                    )}
                  </li>
                );
              })}
          </ul>
        </Section>
      )}

      <Section title="Other projects" id="other">
        <ul className="space-y-3">
          {others.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="prose-link font-serif text-step-1">
                {p.title}
              </Link>
              <span className="ml-2 text-[0.875rem] text-ink-3">{p.subtitle}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
