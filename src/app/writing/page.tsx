import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { articles } from "@/content/writing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Writing",
  description: "Articles and technical notes by Sabrim Mahmud on NLP for Bangla, model deployment and software engineering.",
  path: "/writing",
});

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function WritingPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageIntro title="Writing" lead="Articles and technical notes." />
      <div className="shell">
        <div className="hang">
          <div aria-hidden className="hidden lg:block" />
          {sorted.length === 0 ? (
            <div className="max-w-[36rem] border-t border-rule pt-8">
              <p className="font-serif text-step-2 text-ink">Nothing published here yet.</p>
              <p className="mt-3 text-ink-2">
                In the meantime, the{" "}
                <Link href="/publications" className="prose-link">
                  publications
                </Link>{" "}
                and{" "}
                <Link href="/projects" className="prose-link">
                  project case studies
                </Link>{" "}
                are the best record of my work.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-rule border-y border-rule">
              {sorted.map((a) => (
                <li key={a.slug} className="grid gap-1 py-6 md:grid-cols-[minmax(0,1fr)_10rem] md:gap-8">
                  <div>
                    <a href={a.href} className="font-serif text-step-2 hover:text-accent" target={a.href.startsWith("http") ? "_blank" : undefined} rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {a.title}
                    </a>
                    <p className="mt-1 text-ink-2">{a.summary}</p>
                  </div>
                  <p className="text-[0.875rem] text-ink-3 md:text-right">
                    <time dateTime={a.date}>{dateFormat.format(new Date(a.date))}</time>
                    <span className="block">{a.venue}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
