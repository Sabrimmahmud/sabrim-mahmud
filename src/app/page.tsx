import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, CodeXml, FileText, Mail } from "lucide-react";
import { ScriptSpecimen } from "@/components/script-specimen";
import { Section } from "@/components/page-intro";
import { ProjectCard, PublicationEntry, RoleEntry } from "@/components/entries";
import { cvFiles, links, profile } from "@/content/site";
import { publications } from "@/content/publications";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { achievements } from "@/content/achievements";
import { degree } from "@/content/education";
import { mentorship } from "@/content/academic";
import { news } from "@/content/news";
import { isPending } from "@/content/types";
import { joinList } from "@/lib/utils";

export default function HomePage() {
  const featuredPubs = publications.filter((p) => p.featured);
  const featuredProjects = projects.filter((p) => p.featured);
  const recognition = [...achievements].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  const latest = [...news].sort((a, b) => b.sortDate.localeCompare(a.sortDate)).slice(0, 6);
  const publishers = [...new Set(publications.map((p) => p.venue.publisher))];
  const mentor = mentorship[0];

  const facts = [
    {
      value: String(publications.filter((p) => p.authors[0]?.isSelf).length),
      label: `First-author papers, ${joinList(publishers)}`,
      href: "/publications",
    },
    ...(degree.result
      ? [{ value: degree.result.value, label: `${degree.result.label}, B.Sc. in CSE, DIU`, href: "/education" }]
      : []),
    { value: "NCIM 2025", label: "Paper presenter", href: "/achievements#ncim-2025-presenter" },
    ...(mentor
      ? [
          {
            value: "ModelX",
            label: `Program mentor${!isPending(mentor.period) ? `, ${mentor.period}` : ""}`,
            href: "/academic#mentorship",
          },
        ]
      : []),
  ];

  const contactLinks = [
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail, external: false },
    { href: links.github.href, label: "GitHub", icon: CodeXml, external: true },
    { href: links.linkedin.href, label: "LinkedIn", icon: BriefcaseBusiness, external: true },
    { href: cvFiles.academic.href, label: "CV", icon: FileText, external: false, download: cvFiles.academic.fileName },
  ];

  return (
    <>
      <section aria-labelledby="hero-name" className="bg-band text-band-ink">
        <div className="shell grid gap-12 pb-12 pt-12 md:pt-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16 lg:pb-14">
          <div className="order-2 lg:order-1">
            <h1
              id="hero-name"
              className="font-serif text-[clamp(3rem,7.6vw,5.9rem)] font-[350] leading-[0.95] tracking-[-0.025em]"
            >
              {profile.name}
            </h1>
            <p className="mt-5 text-step-1 text-band-ink-2">
              {joinList(profile.shortRoles).replace(/^./, (c) => c.toUpperCase())}
            </p>
            <p className="mt-8 max-w-[32rem] font-serif text-step-3 italic leading-[1.18]">{profile.headline}</p>
            <p className="mt-5 max-w-[36rem] leading-relaxed text-band-ink-2">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/research"
                className="inline-flex items-center rounded-full bg-band-ink px-5 py-2.5 text-[0.9375rem] font-medium text-band transition-colors hover:bg-white"
              >
                Explore my research
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center rounded-full border border-band-ink-2/50 px-5 py-2.5 text-[0.9375rem] text-band-ink transition-colors hover:border-band-ink"
              >
                View projects
              </Link>
              <a
                href={cvFiles.academic.href}
                download={cvFiles.academic.fileName}
                className="inline-flex items-center rounded-full border border-band-ink-2/50 px-5 py-2.5 text-[0.9375rem] text-band-ink transition-colors hover:border-band-ink"
              >
                Download CV
              </a>
              <Link
                href="/contact"
                className="px-2 py-2.5 text-[0.9375rem] text-band-ink underline decoration-band-ink-2/50 underline-offset-4 hover:decoration-band-ink"
              >
                Get in touch
              </Link>
            </div>
          </div>

          <figure className="order-1 mx-auto w-full max-w-[19rem] lg:order-2 lg:mx-0 lg:ml-auto">
            <Image
              src={profile.portrait.src}
              width={profile.portrait.width}
              height={profile.portrait.height}
              alt={profile.portrait.alt}
              priority
              sizes="(min-width: 1024px) 304px, 70vw"
              className="aspect-[4/5] w-full rounded-md object-cover object-top"
            />
            <figcaption className="mt-4">
              <p className="text-[0.9375rem] text-band-ink">
                {degree.degree} in {degree.field}
              </p>
              <p className="text-[0.875rem] text-band-ink-2">
                {degree.institution}, {degree.end.replace(/^\D+/, "")}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {contactLinks.map(({ href, label, icon: Icon, external, download }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      {...(download ? { download } : {})}
                      className="inline-flex items-center gap-1.5 rounded-full border border-band-rule px-3 py-1.5 text-[0.8125rem] text-band-ink-2 transition-colors hover:border-band-ink-2 hover:text-band-ink"
                    >
                      <Icon aria-hidden className="size-3.5" strokeWidth={1.7} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </div>

        <div className="border-t border-band-rule">
          <dl className="shell grid grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`py-6 pr-4 ${i % 2 === 1 ? "border-l border-band-rule pl-5" : ""} ${
                  i >= 2 ? "border-t border-band-rule lg:border-t-0" : ""
                } ${i === 2 ? "lg:border-l lg:pl-5" : ""}`}
              >
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <Link href={f.href} className="group block">
                    <span className="block font-serif text-step-3 leading-none text-band-ink group-hover:text-band-accent">
                      {f.value}
                    </span>
                    <span className="mt-2 block text-[0.875rem] leading-snug text-band-ink-2">{f.label}</span>
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="[&>section:first-child_.hang]:border-t-0">
        <Section title="News" id="news" aside="Recent papers, talks, roles and awards.">
          <ol className="max-w-[46rem] divide-y divide-rule border-y border-rule">
            {latest.map((n) => (
              <li key={n.sortDate + n.text.slice(0, 12)} className="grid gap-1 py-3.5 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-5">
                <span className="text-[0.875rem] text-ink-3 tabular-nums">{n.date}</span>
                <p className="text-ink-2">
                  {n.href ? (
                    <Link href={n.href} className="hover:text-accent">
                      {n.text}
                    </Link>
                  ) : (
                    n.text
                  )}
                  <span className="ml-2 inline-block rounded-full bg-sage-wash px-2 py-px align-[0.1em] text-[0.6875rem] font-medium text-ink">
                    {n.kind}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          title="Selected publications"
          id="publications"
          aside={
            <Link href="/publications" className="prose-link">
              All publications
            </Link>
          }
        >
          <ol className="space-y-9">
            {featuredPubs.map((p, i) => (
              <li key={p.slug}>
                <PublicationEntry pub={p} number={i + 1} />
              </li>
            ))}
          </ol>
        </Section>

        <Section
          title="Projects"
          id="projects"
          aside={
            <Link href="/projects" className="prose-link">
              All projects
            </Link>
          }
        >
          <ul className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((p, i) => (
              <li key={p.slug} className={i === 0 ? "md:col-span-2" : undefined}>
                <ProjectCard project={p} large={i === 0} />
              </li>
            ))}
          </ul>
        </Section>

        <Section
          title="Experience"
          id="experience"
          aside={
            <Link href="/experience" className="prose-link">
              Full experience
            </Link>
          }
        >
          <div className="space-y-10 [&_.hang]:lg:grid-cols-[9rem_minmax(0,1fr)]">
            {experience.map((r) => (
              <RoleEntry key={r.slug} role={r} />
            ))}
          </div>
        </Section>

        <Section title="Research focus" id="interests">
          <ul className="grid max-w-[46rem] gap-x-8 gap-y-2 font-serif text-step-1 text-ink sm:grid-cols-2">
            {profile.researchInterests.map((interest) => (
              <li key={interest} className="flex gap-3">
                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-sage" />
                {interest}
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-lg bg-band p-6 text-band-ink sm:p-8">
            <ScriptSpecimen />
          </div>
          <p className="mt-5">
            <Link href="/research" className="prose-link">
              How these connect in my work
            </Link>
          </p>
        </Section>

        <Section
          title="Recognition"
          id="recognition"
          aside={
            <Link href="/achievements" className="prose-link">
              All certificates
            </Link>
          }
        >
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recognition.map((a) => (
              <li key={a.slug} className="h-full">
                <Link
                  href={`/achievements#${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-surface transition-colors hover:border-rule-strong"
                >
                  <Image
                    src={a.images[0].src}
                    width={a.images[0].width}
                    height={a.images[0].height}
                    alt={a.images[0].alt}
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 100vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="block p-4">
                    <span className="inline-flex rounded-full border border-sage px-2.5 py-0.5 text-[0.75rem] font-medium text-ink">
                      {a.outcome}
                    </span>
                    <span className="mt-2 block font-medium leading-snug text-ink group-hover:text-accent">{a.title}</span>
                    <span className="mt-1 block text-[0.8125rem] text-ink-3">{a.date}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Get in touch" id="contact">
          <p className="max-w-[38rem] text-step-1 leading-[1.55] text-ink-2">
            Open to research collaboration, graduate study and teaching opportunities in AI, machine learning and NLP.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 inline-flex items-center gap-2 font-serif text-step-2 text-ink hover:text-accent"
          >
            {profile.email}
            <ArrowUpRight aria-hidden className="size-5 text-sage" strokeWidth={1.5} />
          </a>
        </Section>
      </div>
    </>
  );
}
