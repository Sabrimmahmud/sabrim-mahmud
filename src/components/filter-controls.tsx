"use client";

import { Search, X } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils";

export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; count?: number }[];
  value: T;
  onChange: (value: T) => void;
}) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id} className="flex flex-wrap items-center gap-2">
      <span id={id} className="mr-1 text-[0.875rem] text-ink-3">
        {label}
      </span>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full border px-3 py-1 text-[0.875rem] transition-colors",
              selected
                ? "border-ink bg-ink text-paper"
                : "border-rule-strong text-ink-2 hover:border-ink-3 hover:text-ink",
            )}
          >
            {o.label}
            {o.count !== undefined && (
              <span className={cn("ml-1.5 tabular-nums", selected ? "text-paper/70" : "text-ink-3")}>{o.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function SearchField({
  value,
  onChange,
  label,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
}) {
  const id = useId();
  return (
    <div className="relative w-full max-w-sm">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-3"
        strokeWidth={1.6}
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-full border border-rule-strong bg-surface py-2 pl-9 pr-9 text-[0.9375rem] text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-3 hover:text-ink"
        >
          <X aria-hidden className="size-4" strokeWidth={1.6} />
        </button>
      )}
    </div>
  );
}

export function ResultCount({ shown, total, noun }: { shown: number; total: number; noun: [string, string] }) {
  return (
    <p role="status" aria-live="polite" className="text-[0.875rem] text-ink-3">
      {shown === total
        ? `${total} ${total === 1 ? noun[0] : noun[1]}`
        : `Showing ${shown} of ${total} ${total === 1 ? noun[0] : noun[1]}`}
    </p>
  );
}

/** Lowercased haystack match across several fields. */
export function matches(query: string, fields: (string | undefined)[]) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = fields.filter(Boolean).join(" ").toLowerCase();
  return q.split(/\s+/).every((term) => hay.includes(term));
}
