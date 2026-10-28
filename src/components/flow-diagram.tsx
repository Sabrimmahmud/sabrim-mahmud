import type { DiagramStep } from "@/content/types";

/**
 * A pipeline drawn as an ordered list, so it reads correctly to screen readers
 * and reflows from a horizontal chain on wide screens to a vertical one on phones.
 */
export function FlowDiagram({ steps, label }: { steps: DiagramStep[]; label: string }) {
  return (
    <figure>
      <ol aria-label={label} className="relative grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.label} className="relative flex gap-4 pb-6 pr-6 sm:pb-8">
            <div className="flex flex-col items-center">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-sage bg-sage-wash font-serif text-[0.9375rem] text-ink tabular-nums">
                {i + 1}
              </span>
              {i < steps.length - 1 && <span aria-hidden className="mt-1 w-px flex-1 bg-rule-strong sm:hidden" />}
            </div>
            <div className="pt-1">
              <p className="font-medium text-ink">{s.label}</p>
              {s.detail && <p className="mt-0.5 text-[0.875rem] leading-snug text-ink-2">{s.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
