"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Project, ProjectCategory } from "@/content/types";
import { isPending } from "@/content/types";
import { ProjectRow } from "./entries";
import { FilterChips, ResultCount, SearchField, matches } from "./filter-controls";

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const categories = [...new Set(projects.flatMap((p) => p.categories))];
  const filtered = projects.filter(
    (p) =>
      (category === "all" || p.categories.includes(category)) &&
      matches(query, [
        p.title,
        p.subtitle,
        p.summary,
        isPending(p.context) ? undefined : p.context,
        ...p.stack,
        ...p.categories,
      ]),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-rule pb-6">
        <SearchField value={query} onChange={setQuery} label="Search projects" placeholder="Search by name or tool, e.g. ONNX" />
        <FilterChips
          label="Area"
          value={category}
          onChange={setCategory}
          options={[
            { value: "all", label: "All" },
            ...categories.map((c) => ({
              value: c,
              label: c,
              count: projects.filter((p) => p.categories.includes(c)).length,
            })),
          ]}
        />
        <ResultCount shown={filtered.length} total={projects.length} noun={["project", "projects"]} />
      </div>
      {filtered.length === 0 ? (
        <div className="py-12">
          <p className="text-ink-2">No projects match. Try a different tool name, or show every area.</p>
          <button
            type="button"
            className="prose-link mt-2"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-rule">
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((p) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.15 } }}
                transition={{ duration: 0.2 }}
                className="pt-7 first:pt-0"
              >
                <ProjectRow project={p} headingLevel={2} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
