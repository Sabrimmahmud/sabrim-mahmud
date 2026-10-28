"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import type { Publication } from "@/content/types";
import { PublicationEntry } from "./entries";
import { FilterChips, ResultCount, SearchField, matches } from "./filter-controls";

export function PublicationExplorer({ publications }: { publications: Publication[] }) {
  const [year, setYear] = useState<string>("all");
  const [topic, setTopic] = useState<string>("all");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const years = useMemo(
    () => [...new Set(publications.map((p) => String(p.year)))].sort((a, b) => b.localeCompare(a)),
    [publications],
  );
  const topics = useMemo(() => [...new Set(publications.flatMap((p) => p.topics))].sort(), [publications]);

  const filtered = publications.filter(
    (p) =>
      (year === "all" || String(p.year) === year) &&
      (topic === "all" || p.topics.includes(topic)) &&
      matches(query, [p.title, p.summary, p.venue.name, p.venue.short, ...p.authors.map((a) => a.name), ...p.topics]),
  );

  // Numbers stay tied to the full list so [1] always means the same paper.
  const numberOf = (p: Publication) => publications.indexOf(p) + 1;

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-rule pb-6">
        <SearchField
          value={query}
          onChange={setQuery}
          label="Search publications"
          placeholder="Search titles, authors, venues"
        />
        <FilterChips
          label="Year"
          value={year}
          onChange={setYear}
          options={[
            { value: "all", label: "All" },
            ...years.map((y) => ({
              value: y,
              label: y,
              count: publications.filter((p) => String(p.year) === y).length,
            })),
          ]}
        />
        <FilterChips
          label="Topic"
          value={topic}
          onChange={setTopic}
          options={[{ value: "all", label: "All" }, ...topics.map((t) => ({ value: t, label: t }))]}
        />
        <ResultCount shown={filtered.length} total={publications.length} noun={["paper", "papers"]} />
      </div>

      {filtered.length === 0 ? (
        <div className="py-12">
          <p className="text-ink-2">No papers match these filters.</p>
          <button
            type="button"
            className="prose-link mt-2"
            onClick={() => {
              setYear("all");
              setTopic("all");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ol className="mt-10 space-y-12">
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((p) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <PublicationEntry pub={p} number={numberOf(p)} headingLevel={2} />
                <p className="mt-4 max-w-[40rem] pl-[2.75rem] text-[0.9375rem] leading-relaxed text-ink-2 md:pl-[3.5rem]">
                  {p.summary}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      )}
    </div>
  );
}
