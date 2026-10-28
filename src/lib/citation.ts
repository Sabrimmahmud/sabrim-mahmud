import type { Publication } from "@/content/types";
import { isPending } from "@/content/types";

export type CitationFormat = "apa" | "ieee" | "bibtex";

export const citationFormats: { id: CitationFormat; label: string }[] = [
  { id: "apa", label: "APA" },
  { id: "ieee", label: "IEEE" },
  { id: "bibtex", label: "BibTeX" },
];

type NameParts = { given: string[]; family: string };

/** "Samaun Rezvi Payel" -> { given: ["Samaun", "Rezvi"], family: "Payel" } */
export function splitName(full: string): NameParts {
  const parts = full.trim().split(/\s+/);
  const family = parts.pop() ?? "";
  return { given: parts, family };
}

const initials = (given: string[], sep = " ") => given.map((g) => `${g[0]}.`).join(sep);

function apaAuthors(names: string[]): string {
  const formatted = names.map((n) => {
    const { given, family } = splitName(n);
    return `${family}, ${initials(given)}`;
  });
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]}, & ${formatted[1]}`;
  return `${formatted.slice(0, -1).join(", ")}, & ${formatted[formatted.length - 1]}`;
}

function ieeeAuthors(names: string[]): string {
  const formatted = names.map((n) => {
    const { given, family } = splitName(n);
    return `${initials(given)} ${family}`;
  });
  if (formatted.length <= 2) return formatted.join(" and ");
  return `${formatted.slice(0, -1).join(", ")}, and ${formatted[formatted.length - 1]}`;
}

const pages = (p: Publication) => {
  const value = p.venue.pages;
  return value && !isPending(value) ? value : undefined;
};

export function formatApa(p: Publication): string {
  const names = p.authors.map((a) => a.name);
  const pp = pages(p);
  const inner = [
    p.venue.series,
    p.venue.volume ? `Vol. ${p.venue.volume}` : undefined,
    pp ? `pp. ${pp}` : undefined,
  ].filter(Boolean);
  const container = `In ${p.venue.name}${inner.length ? ` (${inner.join(", ")})` : ""}`;
  return `${apaAuthors(names)} (${p.year}). ${p.title}. ${container}. ${p.venue.publisher}. https://doi.org/${p.doi}`;
}

export function formatIeee(p: Publication): string {
  const names = p.authors.map((a) => a.name);
  const pp = pages(p);
  const parts = [`${ieeeAuthors(names)}, “${p.title},” in ${p.venue.name}`];
  if (p.venue.series) parts.push(`${p.venue.series}${p.venue.volume ? `, vol. ${p.venue.volume}` : ""}`);
  if (p.venue.location) parts.push(p.venue.location);
  parts.push(`${p.venue.publisher}, ${p.year}`);
  if (pp) parts.push(`pp. ${pp}`);
  return `${parts.join(", ")}, doi: ${p.doi}.`;
}

export function bibtexKey(p: Publication): string {
  const first = splitName(p.authors[0]?.name ?? "anon").family.toLowerCase();
  const word = p.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .find((w) => w.length > 3) ?? "paper";
  return `${first}${p.year}${word}`;
}

export function formatBibtex(p: Publication): string {
  const pp = pages(p);
  const fields: [string, string | undefined][] = [
    ["title", `{${p.title}}`],
    ["author", p.authors.map((a) => {
      const { given, family } = splitName(a.name);
      return `${family}, ${given.join(" ")}`;
    }).join(" and ")],
    ["booktitle", p.venue.name],
    ["series", p.venue.series],
    ["volume", p.venue.volume],
    ["pages", pp?.replace("–", "--")],
    ["publisher", p.venue.publisher],
    ["address", p.venue.location],
    ["year", String(p.year)],
    ["doi", p.doi],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");
  return `@inproceedings{${bibtexKey(p)},\n${body}\n}`;
}

export function formatCitation(p: Publication, format: CitationFormat): string {
  switch (format) {
    case "apa":
      return formatApa(p);
    case "ieee":
      return formatIeee(p);
    case "bibtex":
      return formatBibtex(p);
  }
}

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;
