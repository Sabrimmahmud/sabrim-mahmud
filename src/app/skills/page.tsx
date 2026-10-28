import Link from "next/link";
import { Fragment } from "react";
import { PageIntro, Section } from "@/components/page-intro";
import { skillGroups } from "@/content/skills";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Skills",
  description:
    "Technical skills of Sabrim Mahmud across programming, AI and NLP, frontend, backend and deployment, each linked to the project where it was used.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageIntro
        title="Skills"
        lead="No percentages. Where a tool was used in work described on this site, it links there, so you can see what it was used for."
      />
      {skillGroups.map((g) => (
        <Section key={g.name} title={g.name} id={g.name.toLowerCase().replace(/\s+/g, "-")} aside={g.description}>
          <dl className="max-w-[44rem] divide-y divide-rule border-y border-rule">
            {g.skills.map((s) => (
              <div key={s.name} className="grid gap-0.5 py-3 sm:grid-cols-[16rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-ink">{s.name}</dt>
                <dd className="text-[0.9375rem] text-ink-2">
                  {s.evidence.length === 0 ? (
                    <span className="text-ink-3">Listed on CV</span>
                  ) : (
                    s.evidence.map((e, i) => (
                      <Fragment key={e.href}>
                        {i > 0 && ", "}
                        <Link href={e.href} className="prose-link">
                          {e.label}
                        </Link>
                      </Fragment>
                    ))
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}
    </>
  );
}
