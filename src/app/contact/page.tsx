import { Mail } from "lucide-react";
import { MaybeValue, shown } from "@/components/pending";
import { CopyButton } from "@/components/copy-button";
import { PageIntro } from "@/components/page-intro";
import { links, profile, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Sabrim Mahmud by email, or find her on GitHub and LinkedIn.",
  path: "/contact",
});

export default function ContactPage() {
  const profiles = [
    { name: "GitHub", value: links.github },
    { name: "LinkedIn", value: links.linkedin },
    { name: "ORCID", value: links.orcid },
    { name: "Google Scholar", value: links.scholar },
    { name: "ResearchGate", value: links.researchgate },
  ].filter((p) => shown(p.value));

  return (
    <>
      <PageIntro
        title="Contact"
        lead="For research collaboration, graduate opportunities or engineering roles, email is the most reliable way to reach me."
      />
      <div className="shell">
        <div className="hang border-t border-rule py-12">
          <h2 className="text-step-2 lg:text-step-1">Email</h2>
          <div>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 font-serif text-[clamp(1.5rem,4vw,2.4rem)] text-ink hover:text-accent"
            >
              <Mail aria-hidden className="size-7 shrink-0 text-sage" strokeWidth={1.4} />
              <span className="break-all">{profile.email}</span>
            </a>
            <div className="mt-4">
              <CopyButton text={profile.email} label="Copy address" />
            </div>
          </div>
        </div>
        {site.showPhone && (
          <div className="hang border-t border-rule py-12">
            <h2 className="text-step-2 lg:text-step-1">Phone</h2>
            <div className="flex flex-wrap items-center gap-4">
              <a href={profile.phone.href} className="font-serif text-step-2 text-ink tabular-nums hover:text-accent">
                {profile.phone.display}
              </a>
              <CopyButton text={profile.phone.href.replace("tel:", "")} label="Copy number" />
            </div>
          </div>
        )}
        <div className="hang border-t border-rule py-12">
          <h2 className="text-step-2 lg:text-step-1">Profiles</h2>
          <dl className="max-w-[40rem] divide-y divide-rule border-y border-rule">
            {profiles.map((p) => (
              <div key={p.name} className="grid gap-0.5 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-ink-3">{p.name}</dt>
                <dd>
                  <MaybeValue value={p.value} inline>
                    {(l) => (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="prose-link break-all">
                        {l.label}
                      </a>
                    )}
                  </MaybeValue>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hang border-t border-rule py-12">
          <h2 className="text-step-2 lg:text-step-1">Location</h2>
          <p className="text-ink-2">{profile.location}</p>
        </div>
        <div className="hang border-t border-rule py-12">
          <h2 className="text-step-2 lg:text-step-1">References</h2>
          <p className="max-w-[40rem] text-ink-2">
            Two faculty referees from the Department of Computer Science and Engineering, Daffodil International
            University. Their contact details are available on request.
          </p>
        </div>
      </div>
    </>
  );
}
