import Link from "next/link";
import { MaybeValue, shown } from "@/components/pending";
import { PageIntro } from "@/components/page-intro";
import { education } from "@/content/education";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Education",
  description:
    "Sabrim Mahmud's education: B.Sc. in Computer Science and Engineering at Daffodil International University (CGPA 3.84), with HSC and SSC in science.",
  path: "/education",
});

export default function EducationPage() {
  const [degree, ...school] = education;

  return (
    <>
      <PageIntro title="Education" />
      <div className="shell">
        <article className="hang border-t border-rule py-12">
          <p className="hang-label tabular-nums">
            {degree.start} – {degree.end}
            {degree.location && <span className="block">{degree.location}</span>}
          </p>
          <div>
            <h2 className="text-step-3 leading-[1.15]">
              {degree.degree} in {degree.field}
            </h2>
            <p className="mt-2 text-step-1 text-ink-2">{degree.institution}</p>

            <dl className="mt-8 grid max-w-[40rem] gap-x-6 gap-y-2 text-[0.9375rem] sm:grid-cols-[8rem_minmax(0,1fr)]">
              {site.showGrades && degree.result && (
                <>
                  <dt className="text-ink-3">{degree.result.label}</dt>
                  <dd className="text-ink">
                    <span className="font-serif text-step-1">{degree.result.value}</span>
                    <span className="text-ink-3"> out of {degree.result.scale}</span>
                  </dd>
                </>
              )}
              {degree.credits && (
                <>
                  <dt className="text-ink-3">Credits</dt>
                  <dd className="text-ink-2">{degree.credits}</dd>
                </>
              )}
              {degree.details.length > 0 && (
                <>
                  <dt className="text-ink-3">Notes</dt>
                  <dd className="text-ink-2">{degree.details.join(" ")}</dd>
                </>
              )}
            </dl>

            {shown(degree.thesis) && (
              <>
                <h3 className="mt-10 font-sans text-[0.9375rem] font-semibold text-ink">Thesis</h3>
                <div className="mt-3 max-w-[40rem]">
                  <MaybeValue value={degree.thesis}>
                    {(t) => (
                      <>
                        <p className="font-serif text-step-1 leading-snug text-ink">{t.title}</p>
                        <p className="mt-1.5 text-[0.9375rem] text-ink-3">{t.kind}</p>
                        {t.summary && <p className="mt-2 text-ink-2">{t.summary}</p>}
                        {t.href && (
                          <Link href={t.href} className="prose-link mt-2 inline-block text-[0.9375rem]">
                            Read the project case study
                          </Link>
                        )}
                      </>
                    )}
                  </MaybeValue>
                </div>
              </>
            )}

            {degree.coursework.length > 0 && (
              <>
                <h3 className="mt-10 font-sans text-[0.9375rem] font-semibold text-ink">Selected coursework</h3>
                <ul className="mt-3 grid max-w-[44rem] gap-x-8 gap-y-1.5 text-ink-2 sm:grid-cols-2">
                  {degree.coursework.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </article>

        <section aria-labelledby="school-title" className="hang border-t border-rule py-12">
          <h2 id="school-title" className="text-step-2 lg:text-step-1">
            School
          </h2>
          <ul className="max-w-[44rem] divide-y divide-rule border-y border-rule">
            {school.map((d) => (
              <li key={d.slug} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,1fr)_9rem] sm:gap-6">
                <div>
                  <p className="font-medium text-ink">{d.degree}</p>
                  <p className="text-ink-2">
                    {d.institution}
                    {d.location && `, ${d.location}`}
                  </p>
                  <p className="text-[0.9375rem] text-ink-3">
                    {d.field} group
                    {site.showGrades && d.result && `, ${d.result.label} ${d.result.value} out of ${d.result.scale}`}
                  </p>
                </div>
                <p className="text-[0.875rem] text-ink-3 tabular-nums sm:text-right">Passed {d.end}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
