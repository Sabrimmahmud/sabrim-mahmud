import { Download, FileText } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { cvFiles } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "CV",
  description: "Download Sabrim Mahmud's academic CV and software engineering resume as PDF.",
  path: "/cv",
});

const docs = [
  {
    ...cvFiles.academic,
    id: "academic",
    for: "For graduate admissions, research positions and collaborations.",
    covers: "Education, publications, conference presentation, research experience, mentorship and service, awards, research interests and methods.",
  },
  {
    ...cvFiles.resume,
    id: "resume",
    for: "For engineering roles.",
    covers: "Industry experience, technical stack, AI and ML systems, projects, architecture and deployment work.",
  },
];

export default function CvPage() {
  return (
    <>
      <PageIntro
        title="CV"
        lead="Two documents built from the same facts, ordered for different readers. Both are PDF files you can open in the browser or download."
      />
      <div className="shell space-y-16">
        {docs.map((d) => (
          <section key={d.id} aria-labelledby={`${d.id}-title`} className="hang border-t border-rule pt-10">
            <div>
              <h2 id={`${d.id}-title`} className="text-step-2 lg:text-step-1">
                {d.title}
              </h2>
              <p className="mt-2 text-[0.875rem] text-ink-3">{d.for}</p>
            </div>
            <div className="min-w-0">
              <p className="max-w-[40rem] text-ink-2">{d.covers}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={d.href}
                  download={d.fileName}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.9375rem] text-paper hover:bg-accent"
                >
                  <Download aria-hidden className="size-4" strokeWidth={1.7} />
                  Download PDF
                </a>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-4 py-2 text-[0.9375rem] text-ink-2 hover:border-ink-3 hover:text-ink"
                >
                  <FileText aria-hidden className="size-4" strokeWidth={1.6} />
                  Open in a new tab
                </a>
              </div>
              <div className="mt-8 hidden overflow-hidden rounded-md border border-rule bg-surface md:block">
                <object data={`${d.href}#view=FitH`} type="application/pdf" aria-label={`${d.title} preview`} className="h-[46rem] w-full">
                  <p className="p-6 text-ink-2">
                    Your browser cannot show the PDF here.{" "}
                    <a href={d.href} className="prose-link">
                      Open the {d.title.toLowerCase()}
                    </a>{" "}
                    instead.
                  </p>
                </object>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
