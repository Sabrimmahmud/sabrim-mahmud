import { describe, expect, it } from "vitest";
import { publications } from "@/content/publications";
import { bibtexKey, formatApa, formatBibtex, formatIeee, splitName } from "@/lib/citation";

const politicanet = publications.find((p) => p.slug.startsWith("politicanet"))!;
const ncim = publications.find((p) => p.venue.short === "NCIM 2025")!;

describe("citation formatting", () => {
  it("splits names into given and family parts", () => {
    expect(splitName("Samaun Rezvi Payel")).toEqual({ given: ["Samaun", "Rezvi"], family: "Payel" });
  });

  it("formats APA with series, volume and pages", () => {
    expect(formatApa(politicanet)).toBe(
      "Mahmud, S., Payel, S. R., & Hossain, J. (2026). PoliticaNet: A Transformer-Driven Framework for Fine-Grained Classification of Bangla Political Hate Speech in Social Media. In Asia Pacific Advanced Network (APANConf 2025) (Communications in Computer and Information Science, Vol. 2837, pp. 93–111). Springer. https://doi.org/10.1007/978-3-032-18319-4_6",
    );
  });

  it("formats IEEE with pages", () => {
    const text = formatIeee(ncim);
    expect(text.startsWith("S. Mahmud, S. R. Payel, J. Hossain, N. T. Progga, and A. Mariam, “Identifying")).toBe(true);
    expect(text).toContain("IEEE, 2025, pp. 1–6");
    expect(text.endsWith("doi: 10.1109/NCIM65934.2025.11159848.")).toBe(true);
  });

  it("leaves out pages that are still pending", () => {
    const text = formatIeee({ ...ncim, venue: { ...ncim.venue, pages: { pending: "pages" } } });
    expect(text).not.toContain("pp.");
  });

  it("produces valid-looking BibTeX", () => {
    const bib = formatBibtex(politicanet);
    expect(bib.startsWith(`@inproceedings{${bibtexKey(politicanet)},`)).toBe(true);
    expect(bib).toContain("author = {Mahmud, Sabrim and Payel, Samaun Rezvi and Hossain, Jawad}");
    expect(bib).toContain("pages = {93--111}");
    expect(bib.trim().endsWith("}")).toBe(true);
  });
});
