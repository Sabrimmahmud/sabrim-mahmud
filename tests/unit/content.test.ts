import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { publications } from "@/content/publications";
import { projects } from "@/content/projects";
import { achievements } from "@/content/achievements";
import { skillGroups } from "@/content/skills";
import { experience } from "@/content/experience";
import { cvFiles, primaryNav, profile, secondaryNav } from "@/content/site";

const publicDir = path.resolve(__dirname, "../../public");
const routes = new Set([
  "/",
  ...primaryNav.map((n) => n.href),
  ...secondaryNav.map((n) => n.href),
  ...publications.map((p) => `/publications/${p.slug}`),
  ...projects.map((p) => `/projects/${p.slug}`),
]);

const unique = (xs: string[]) => new Set(xs).size === xs.length;

describe("content integrity", () => {
  it("has unique slugs", () => {
    expect(unique(publications.map((p) => p.slug))).toBe(true);
    expect(unique(projects.map((p) => p.slug))).toBe(true);
    expect(unique(achievements.map((a) => a.slug))).toBe(true);
  });

  it("stores DOIs without a resolver prefix", () => {
    for (const p of publications) expect(p.doi).toMatch(/^10\.\d{4,9}\/\S+$/);
  });

  it("marks exactly one author as the site owner on every paper", () => {
    for (const p of publications) expect(p.authors.filter((a) => a.isSelf)).toHaveLength(1);
  });

  it("points every image and CV file at a file in /public", () => {
    const files = [
      profile.portrait.src,
      cvFiles.academic.href,
      cvFiles.resume.href,
      ...achievements.flatMap((a) => a.images.map((i) => i.src)),
    ];
    for (const f of files) expect(existsSync(path.join(publicDir, f)), f).toBe(true);
  });

  it("gives every certificate image alt text and a caption", () => {
    for (const img of achievements.flatMap((a) => a.images)) {
      expect(img.alt.length).toBeGreaterThan(20);
      expect(img.caption.length).toBeGreaterThan(5);
    }
  });

  it("only links to routes that exist", () => {
    const internal = [
      ...skillGroups.flatMap((g) => g.skills.flatMap((s) => s.evidence.map((e) => e.href))),
      ...achievements.flatMap((a) => (a.related ? [a.related.href] : [])),
    ].map((h) => h.split("#")[0]);
    for (const href of internal) expect(routes.has(href), href).toBe(true);
  });

  it("references real projects from experience entries", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const r of experience) for (const s of r.projects ?? []) expect(slugs.has(s), s).toBe(true);
  });

  it("does not present participation as a placing", () => {
    const ndac = achievements.find((a) => a.slug === "ndac-2025")!;
    expect(ndac.outcome).toBe("Participant");
  });
});

describe("privacy", () => {
  it("never imports referee contact details into the website", async () => {
    const { readdirSync, readFileSync, statSync } = await import("node:fs");
    const walk = (dir: string): string[] =>
      readdirSync(dir).flatMap((f) => {
        const p = path.join(dir, f);
        return statSync(p).isDirectory() ? walk(p) : [p];
      });
    const src = path.resolve(__dirname, "../../src");
    const offenders = walk(src)
      .filter((f) => /\.(ts|tsx)$/.test(f) && !f.endsWith(path.join("content", "references.ts")))
      .filter((f) => readFileSync(f, "utf8").includes("content/references"));
    expect(offenders).toEqual([]);
  });

  it("links the thesis to an existing project page", async () => {
    const { degree } = await import("@/content/education");
    const thesis = degree.thesis;
    expect(thesis && !("pending" in thesis) && thesis.href).toBeTruthy();
    if (thesis && !("pending" in thesis) && thesis.href) expect(routes.has(thesis.href)).toBe(true);
  });
});

describe("news", () => {
  it("links every news item to a page that exists", async () => {
    const { news } = await import("@/content/news");
    for (const n of news) if (n.href) expect(routes.has(n.href.split("#")[0]), n.href).toBe(true);
  });
});
