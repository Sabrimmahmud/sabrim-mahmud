import Image from "next/image";
import Link from "next/link";
import { PageIntro, Section } from "@/components/page-intro";
import { cvFiles, profile } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About Sabrim Mahmud: Computer Science and Engineering graduate of Daffodil International University, first author of two papers on Bangla hate speech, and AI systems developer.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro title="About" />
      <div className="shell">
        <div className="hang pb-12">
          <div>
            <Image
              src={profile.portrait.src}
              width={profile.portrait.width}
              height={profile.portrait.height}
              alt={profile.portrait.alt}
              priority
              sizes="(min-width: 896px) 192px, 220px"
              className="w-[13.75rem] rounded-sm lg:w-full"
            />
            <p className="mt-3 text-[0.8125rem] text-ink-3">{profile.location}</p>
          </div>
          <div className="measure text-step-1 leading-[1.6] text-ink-2">
            {profile.about.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      <Section title="Where to go next" id="next">
        <ul className="grid max-w-[44rem] gap-x-8 gap-y-4 sm:grid-cols-2">
          {[
            { href: "/research", label: "Research", text: "The questions behind the papers" },
            { href: "/publications", label: "Publications", text: "Both papers, with citations" },
            { href: "/projects", label: "Projects", text: "How the systems are built" },
            { href: "/cv", label: "CV", text: "Academic CV and resume" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="prose-link font-serif text-step-1">
                {l.label}
              </Link>
              <p className="text-[0.9375rem] text-ink-3">{l.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[0.9375rem] text-ink-2">
          Prefer a single document?{" "}
          <a href={cvFiles.academic.href} download={cvFiles.academic.fileName} className="prose-link">
            Download the academic CV
          </a>
          .
        </p>
      </Section>
    </>
  );
}
