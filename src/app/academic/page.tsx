import Link from "next/link";
import { MaybeValue } from "@/components/pending";
import { PageIntro, Section } from "@/components/page-intro";
import { conferenceParticipation, mentorship, researchMethods, service, teachingInterests } from "@/content/academic";
import { degree } from "@/content/education";
import { experience } from "@/content/experience";
import { publications } from "@/content/publications";
import { profile } from "@/content/site";
import type { AcademicActivity } from "@/content/types";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Academic profile",
  description:
    "Academic profile of Sabrim Mahmud: education, research experience, publications, conference participation, mentorship in Daffodil ModelX, and teaching interests.",
  path: "/academic",
});

function Activity({ a }: { a: AcademicActivity }) {
  return (
    <article className="max-w-[40rem]">
      <h3 className="text-step-1 leading-snug">{a.title}</h3>
      <div className="mt-2 space-y-2 text-[0.9375rem] text-ink-2">
        <p>
          <MaybeValue value={a.organization} inline>
            {(v) => v}
          </MaybeValue>
          {", "}
          <MaybeValue value={a.period} inline>
            {(v) => v}
          </MaybeValue>
        </p>
        <MaybeValue value={a.description}>{(v) => <p>{v}</p>}</MaybeValue>
      </div>
    </article>
  );
}

export default function AcademicPage() {
  const research = experience.filter((r) => r.kind === "Research");

  return (
    <>
      <PageIntro
        title="Academic profile"
        lead="The academic side of my work in one place: training, research roles, papers, the conference where I presented, and mentoring."
      />

      <Section title="Objective" id="objective">
        <p className="measure font-serif text-step-1 leading-[1.6] text-ink">{profile.careerGoal}</p>
      </Section>

      <Section title="Education" id="education">
        <p className="font-serif text-step-1 text-ink">
          {degree.degree} in {degree.field}
        </p>
        <p className="text-ink-2">
          {degree.institution}, {degree.start} – {degree.end}
        </p>
        {degree.thesis && !("pending" in degree.thesis) && (
          <p className="mt-3 max-w-[40rem] text-[0.9375rem] text-ink-2">
            <span className="text-ink-3">Thesis: </span>
            {degree.thesis.title}
          </p>
        )}
        <Link href="/education" className="prose-link mt-2 inline-block text-[0.9375rem]">
          Coursework and details
        </Link>
      </Section>

      <Section title="Research experience" id="research-experience">
        <ul className="space-y-5">
          {research.map((r) => (
            <li key={r.slug} className="max-w-[40rem]">
              <p className="font-serif text-step-1 text-ink">{r.title}</p>
              <p className="text-ink-2">
                {r.organization}
                {r.unit && `, ${r.unit}`}, {r.start} – {r.end}
              </p>
              <p className="mt-1 text-[0.9375rem] text-ink-2">{r.summary}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Publications" id="publications">
        <ol className="max-w-[44rem] space-y-4">
          {publications.map((p, i) => (
            <li key={p.slug} className="grid grid-cols-[2.25rem_minmax(0,1fr)]">
              <span className="text-ink-3 tabular-nums">[{i + 1}]</span>
              <span>
                <Link href={`/publications/${p.slug}`} className="prose-link">
                  {p.title}
                </Link>
                <span className="block text-[0.875rem] text-ink-3">
                  {p.venue.short}, {p.venue.publisher}, {p.year}. First author.
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Conferences" id="conferences">
        <ul className="space-y-3">
          {conferenceParticipation.map((c) => (
            <li key={c.event} className="max-w-[40rem]">
              <p className="text-ink">
                <Link href={c.href} className="prose-link">
                  {c.event}
                </Link>
                , {c.role.toLowerCase()}
              </p>
              <p className="text-[0.875rem] text-ink-3">
                {c.location}, {c.date}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Mentorship" id="mentorship">
        <div className="space-y-8">
          {mentorship.map((a) => (
            <Activity key={a.slug} a={a} />
          ))}
        </div>
      </Section>

      <Section title="Service and teams" id="service">
        <div className="space-y-8">
          {service.map((a) => (
            <Activity key={a.slug} a={a} />
          ))}
        </div>
      </Section>

      <Section title="Research interests" id="interests">
        <p className="max-w-[40rem] text-ink-2">{profile.researchInterests.join(", ")}.</p>
      </Section>

      <Section title="Methods and tools" id="methods">
        <dl className="max-w-[44rem] space-y-4">
          {researchMethods.map((m) => (
            <div key={m.name} className="grid gap-0.5 sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-6">
              <dt className="font-medium text-ink">{m.name}</dt>
              <dd className="text-ink-2">{m.detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Teaching interests" id="teaching" aside="Subjects I would like to teach. I have not held a lecturer position.">
        <ul className="grid max-w-[40rem] gap-x-8 gap-y-2 text-ink-2 sm:grid-cols-2">
          {teachingInterests.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
