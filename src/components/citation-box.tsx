"use client";

import { useId, useState } from "react";
import type { Publication } from "@/content/types";
import { citationFormats, formatCitation, type CitationFormat } from "@/lib/citation";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

export function CitationBox({ publication }: { publication: Publication }) {
  const [format, setFormat] = useState<CitationFormat>("apa");
  const baseId = useId();
  const text = formatCitation(publication, format);

  return (
    <div className="rounded-md border border-rule bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-2.5">
        <div role="tablist" aria-label="Citation format" className="flex gap-1">
          {citationFormats.map((f) => (
            <button
              key={f.id}
              id={`${baseId}-tab-${f.id}`}
              role="tab"
              type="button"
              aria-selected={format === f.id}
              aria-controls={`${baseId}-panel`}
              tabIndex={format === f.id ? 0 : -1}
              onClick={() => setFormat(f.id)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const i = citationFormats.findIndex((c) => c.id === format);
                const next = citationFormats[(i + (e.key === "ArrowRight" ? 1 : -1) + citationFormats.length) % citationFormats.length];
                setFormat(next.id);
                document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
              }}
              className={cn(
                "rounded-full px-3 py-1 text-[0.875rem] transition-colors",
                format === f.id ? "bg-ink text-paper" : "text-ink-2 hover:bg-sage-wash hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <CopyButton text={text} label="Copy citation" />
      </div>
      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${format}`}
        className="px-4 py-4"
      >
        {format === "bibtex" ? (
          <pre className="overflow-x-auto whitespace-pre text-[0.8125rem] leading-relaxed text-ink-2">
            <code>{text}</code>
          </pre>
        ) : (
          <p className="select-all text-[0.9375rem] leading-relaxed text-ink-2">{text}</p>
        )}
      </div>
    </div>
  );
}
