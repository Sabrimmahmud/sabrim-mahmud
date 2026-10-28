import Link from "next/link";
import { links, primaryNav, profile, secondaryNav } from "@/content/site";

export function SiteFooter() {
  return (
    <footer data-site-footer className="mt-24 bg-band text-band-ink">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:py-16">
        <div>
          <p className="font-serif text-step-3 leading-tight">{profile.name}</p>
          <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-band-ink-2">
            Multilingual NLP research and AI systems engineering, from {profile.location}.
          </p>
          <ul className="mt-6 space-y-1.5 text-[0.9375rem]">
            <li>
              <a className="underline decoration-band-rule underline-offset-4 hover:decoration-band-ink" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li>
              <a
                className="underline decoration-band-rule underline-offset-4 hover:decoration-band-ink"
                href={links.github.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <span aria-hidden className="mx-2 text-band-ink-2">/</span>
              <a
                className="underline decoration-band-rule underline-offset-4 hover:decoration-band-ink"
                href={links.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Footer, main sections">
          <ul className="space-y-2 text-[0.9375rem]">
            <li>
              <Link href="/" className="text-band-ink-2 hover:text-band-ink">
                Home
              </Link>
            </li>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-band-ink-2 hover:text-band-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer, more sections">
          <ul className="space-y-2 text-[0.9375rem]">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-band-ink-2 hover:text-band-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-band-rule">
        <p className="shell py-5 text-[0.8125rem] leading-relaxed text-band-ink-2">
          Publications link to their publishers through DOIs. This is a personal site and is not endorsed by IEEE,
          Springer or any institution named on it.
        </p>
      </div>
    </footer>
  );
}
