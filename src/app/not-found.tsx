import Link from "next/link";
import { primaryNav } from "@/content/site";

export default function NotFound() {
  return (
    <div className="shell py-20 md:py-28">
      <div className="hang">
        <p className="hang-label">Error 404</p>
        <div>
          <h1 className="text-step-4 md:text-step-5">This page isn’t here</h1>
          <p className="mt-5 max-w-[34rem] text-step-1 text-ink-2">
            The address may have a typo, or the page may have moved. These sections are a good place to start.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/" className="prose-link">
                Home
              </Link>
            </li>
            {primaryNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="prose-link">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
