import { PencilLine } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { isPending, type Maybe } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * A visible "not added yet" note for a missing fact.
 * Hidden everywhere when `site.showPending` is false.
 */
export function Pending({ what, className, inline }: { what: string; className?: string; inline?: boolean }) {
  if (!site.showPending) return null;
  if (inline) {
    return (
      <span
        data-pending
        className={cn(
          "inline-flex items-baseline gap-1.5 rounded border border-dashed border-pending-rule bg-pending-bg px-1.5 py-0.5 text-[0.8125rem] leading-snug text-pending-ink",
          className,
        )}
      >
        <PencilLine aria-hidden className="size-3.5 self-center" strokeWidth={1.6} />
        <span>
          <span className="font-semibold">Not added yet:</span> {what}
        </span>
      </span>
    );
  }
  return (
    <div
      data-pending
      className={cn(
        "flex gap-2.5 rounded-md border border-dashed border-pending-rule bg-pending-bg px-3.5 py-2.5 text-[0.875rem] leading-relaxed text-pending-ink",
        className,
      )}
    >
      <PencilLine aria-hidden className="mt-[0.2rem] size-4 shrink-0" strokeWidth={1.6} />
      <p>
        <span className="font-semibold">Not added yet:</span> {what}
      </p>
    </div>
  );
}

/** Renders a value, or a Pending note if the value is still missing. */
export function MaybeValue<T>({
  value,
  children,
  inline,
  className,
}: {
  value: Maybe<T> | undefined;
  children: (value: T) => ReactNode;
  inline?: boolean;
  className?: string;
}) {
  if (value === undefined) return null;
  if (isPending(value)) return <Pending what={value.pending} inline={inline} className={className} />;
  return <>{children(value)}</>;
}

/** True when a section holding this value should render at all. */
export function shown<T>(value: Maybe<T> | undefined): boolean {
  return value !== undefined && (!isPending(value) || site.showPending);
}

/** True when at least one of the values should render. */
export function anyShown(values: (Maybe<unknown> | undefined)[]): boolean {
  return values.some((v) => shown(v));
}
