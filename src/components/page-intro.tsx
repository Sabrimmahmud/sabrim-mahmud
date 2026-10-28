import type { ReactNode } from "react";

/** The opening block of every inner page: title, a short lead, optional extras. */
export function PageIntro({ title, lead, children }: { title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <div className="shell pb-10 pt-14 md:pb-14 md:pt-20">
      <div className="hang">
        <div aria-hidden className="hidden lg:block" />
        <div>
          <h1 className="text-step-4 md:text-step-5">{title}</h1>
          {lead && <div className="mt-5 max-w-[38rem] text-step-1 leading-[1.55] text-ink-2">{lead}</div>}
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * A titled section using the hanging layout. The left column holds the
 * section title; the right holds its content.
 */
export function Section({
  title,
  id,
  children,
  aside,
}: {
  title: string;
  id?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="shell scroll-mt-24">
      <div className="hang border-t border-rule py-10 md:py-14">
        <div className="pb-4 lg:pb-0">
          <h2 id={id ? `${id}-title` : undefined} className="text-step-2 lg:text-step-1">
            {title}
          </h2>
          {aside && <div className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">{aside}</div>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
