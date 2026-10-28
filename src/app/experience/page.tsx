import Link from "next/link";
import { Pending } from "@/components/pending";
import { PageIntro } from "@/components/page-intro";
import { RoleEntry } from "@/components/entries";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "Sabrim Mahmud's experience as AI Systems Developer at Enovosoft and Research Assistant & AI Developer at the Daffodil International University AR/VR Lab.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        title="Experience"
        lead="Industry work on multilingual AI systems, and research work on hate speech, multilingual NLP and medical imaging."
      />
      <div className="shell">
        {experience.map((r) => (
          <div key={r.slug} className="border-t border-rule py-12">
            <RoleEntry role={r} detailed />
            <div className="hang mt-6">
              <div aria-hidden className="hidden lg:block" />
              <div className="space-y-3">
                {r.endNeedsConfirmation && <Pending what={r.endNeedsConfirmation} className="max-w-[40rem]" />}
                {r.projects && r.projects.length > 0 && (
                  <p className="text-[0.9375rem] text-ink-2">
                    <span className="text-ink-3">Case study: </span>
                    {r.projects.map((slug, i) => {
                      const p = getProject(slug);
                      if (!p) return null;
                      return (
                        <span key={slug}>
                          {i > 0 && ", "}
                          <Link href={`/projects/${slug}`} className="prose-link">
                            {p.title}
                          </Link>
                        </span>
                      );
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
