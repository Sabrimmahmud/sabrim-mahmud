/**
 * Builds the two CV PDFs in public/cv/ from the same content files the site uses.
 *
 *   npm run cv
 *
 * Needs a Chromium-based browser. It uses, in order: CHROME_PATH, then an installed
 * Google Chrome (playwright "chrome" channel). Without Chrome, use
 * `npm run cv:weasyprint` (needs Python and `pip install weasyprint`). Missing facts (marked pending in the
 * content files) are left out of the PDFs rather than printed as placeholders.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { chromium } from "playwright-core";

import { profile, links, site } from "../src/content/site.ts";
import { publications } from "../src/content/publications.ts";
import { experience } from "../src/content/experience.ts";
import { education } from "../src/content/education.ts";
import { achievements } from "../src/content/achievements.ts";
import { projects } from "../src/content/projects.ts";
import { skillGroups } from "../src/content/skills.ts";
import { mentorship, service, conferenceParticipation } from "../src/content/academic.ts";
import { referees } from "../src/content/references.ts";
import type { Maybe, Publication } from "../src/content/types.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * --private builds a copy that also lists referees and always shows the phone number,
 * written to /private-cv (git-ignored, never deployed). Use it for applications sent by email.
 */
const isPrivate = process.argv.includes("--private");
const showPhone = site.showPhone || isPrivate;
/* Static instances of the site fonts; some PDF engines mis-space variable-font bold text. */
const fontDir = pathToFileURL(path.join(root, "scripts/cv-fonts")).href;
const known = <T,>(v: Maybe<T> | undefined): v is T =>
  v !== undefined && !(typeof v === "object" && v !== null && "pending" in (v as object));

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const host = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function authors(p: Publication) {
  return p.authors.map((a) => (a.isSelf ? `<strong>${esc(a.name)}</strong>` : esc(a.name))).join(", ");
}

function reference(p: Publication, i: number) {
  const parts = [`<em>${esc(p.venue.name)}</em>`, esc(p.venue.publisher), String(p.year)];
  if (p.venue.series) parts.push(`${esc(p.venue.series)}${p.venue.volume ? `, vol. ${esc(p.venue.volume)}` : ""}`);
  if (known(p.venue.pages)) parts.push(`pp. ${esc(p.venue.pages)}`);
  return `<li class="ref"><span class="n">[${i + 1}]</span><div>
    <p class="ref-title">${esc(p.title)}</p>
    <p>${authors(p)}. ${parts.join(", ")}. DOI: ${esc(p.doi)}.${p.authorNote ? ` ${esc(p.authorNote)}` : ""}</p></div></li>`;
}

const css = `
@font-face { font-family: "Newsreader"; src: url("${fontDir}/Newsreader-Regular.woff2") format("woff2"); font-weight: 400; font-style: normal; }
@font-face { font-family: "Newsreader"; src: url("${fontDir}/Newsreader-Medium.woff2") format("woff2"); font-weight: 500; font-style: normal; }
@font-face { font-family: "Newsreader"; src: url("${fontDir}/Newsreader-Italic.woff2") format("woff2"); font-weight: 400; font-style: italic; }
@font-face { font-family: "Newsreader Display"; src: url("${fontDir}/Newsreader-Display.woff2") format("woff2"); font-weight: 400; font-style: normal; }
@font-face { font-family: "Instrument Sans"; src: url("${fontDir}/InstrumentSans-Regular.woff2") format("woff2"); font-weight: 400; font-style: normal; }
@font-face { font-family: "Instrument Sans"; src: url("${fontDir}/InstrumentSans-SemiBold.woff2") format("woff2"); font-weight: 600 700; font-style: normal; }
@font-face { font-family: "Instrument Sans"; src: url("${fontDir}/InstrumentSans-Italic.woff2") format("woff2"); font-weight: 400; font-style: italic; }
@page { size: A4; margin: 16mm 17mm 16mm 17mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "Instrument Sans", sans-serif; font-size: 9.4pt; line-height: 1.4; color: #1f2a3d; }
h1 { font-family: "Newsreader Display", "Newsreader", serif; font-weight: 400; font-size: 27pt; line-height: 1; margin: 0; color: #13213a; letter-spacing: -0.01em; }
.role { margin: 5pt 0 0; font-size: 11pt; color: #3d495e; }
.contact { margin: 7pt 0 0; font-size: 8.8pt; color: #3d495e; display: flex; flex-wrap: wrap; gap: 3pt 12pt; }
.contact a { color: #1c5a46; text-decoration: none; }
header { padding-bottom: 10pt; border-bottom: 1.2pt solid #13213a; margin-bottom: 4pt; }
section { display: grid; grid-template-columns: 30mm 1fr; column-gap: 6mm; padding: 7pt 0 1pt; border-top: 0.5pt solid #d9dcd3; break-inside: auto; }
header + section { border-top: 0; }
h2 { font-family: "Newsreader", serif; font-weight: 500; font-size: 11pt; line-height: 1.25; margin: 0; color: #13213a; }
p { margin: 0; }
a { color: #1c5a46; text-decoration: none; }
.item { margin-bottom: 6pt; break-inside: avoid; }
.item-head { display: flex; justify-content: space-between; gap: 8pt; }
.item-title { font-weight: 600; color: #13213a; }
.when { color: #626b7d; white-space: nowrap; font-variant-numeric: tabular-nums; }
.sub { color: #3d495e; }
ul.bul { margin: 3pt 0 0; padding-left: 10pt; }
ul.bul li { margin: 1.5pt 0; }
ol.refs { list-style: none; margin: 0; padding: 0; }
.ref { display: grid; grid-template-columns: 7mm 1fr; margin-bottom: 5pt; break-inside: avoid; }
.ref .n { color: #626b7d; }
.ref-title { font-family: "Newsreader", serif; font-size: 10.5pt; color: #13213a; line-height: 1.3; margin-bottom: 1.5pt; }
.kv { display: grid; grid-template-columns: 34mm 1fr; gap: 2pt 4mm; }
.kv dt { color: #3d495e; font-weight: 600; }
.kv dd { margin: 0; }
.muted { color: #626b7d; }
.refs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 6mm; }
.refs-grid .item { margin-bottom: 2pt; }
.lead { font-family: "Newsreader", serif; font-size: 10.6pt; line-height: 1.45; color: #1f2a3d; }
footer { margin-top: 10pt; font-size: 7.8pt; color: #626b7d; }
`;

function page(title: string, body: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${css}</style></head><body>${body}</body></html>`;
}

function header(roleLine: string) {
  return `<header>
  <h1>${esc(profile.name)}</h1>
  <p class="role">${esc(roleLine)}</p>
  <p class="contact">
    <span>${esc(profile.location)}</span>
    <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
    ${showPhone ? `<a href="${esc(profile.phone.href)}">${esc(profile.phone.display)}</a>` : ""}
    <a href="${esc(links.github.href)}">${esc(host(links.github.href))}</a>
    <a href="${esc(links.linkedin.href)}">${esc(host(links.linkedin.href))}</a>
    ${known(links.orcid) ? `<a href="${esc(links.orcid.href)}">${esc(links.orcid.label)}</a>` : ""}
    ${known(links.scholar) ? `<a href="${esc(links.scholar.href)}">Google Scholar</a>` : ""}
  </p>
</header>`;
}

const sec = (title: string, inner: string) => `<section><h2>${esc(title)}</h2><div>${inner}</div></section>`;

function educationBlock(full: boolean) {
  const [degree, ...school] = education;
  const grade = (d: (typeof education)[number]) =>
    site.showGrades && d.result ? `${esc(d.result.label)} ${esc(d.result.value)} / ${esc(d.result.scale)}` : "";
  const thesis = known(degree.thesis)
    ? `<p><strong>${esc(degree.thesis.kind)}:</strong> <em>${esc(degree.thesis.title)}</em></p>`
    : "";
  const main = `<div class="item">
      <div class="item-head"><span class="item-title">${esc(degree.degree)} in ${esc(degree.field)}</span><span class="when">${esc(degree.start ?? "")} – ${esc(degree.end)}</span></div>
      <p class="sub">${esc(degree.institution)}${degree.location ? `, ${esc(degree.location)}` : ""}</p>
      ${grade(degree) ? `<p>${grade(degree)}${degree.credits ? `, ${esc(degree.credits)}` : ""}</p>` : ""}
      ${thesis}
      ${full && degree.coursework.length ? `<p class="muted">Selected coursework: ${degree.coursework.map(esc).join(", ")}.</p>` : ""}
    </div>`;
  const rest = school
    .map(
      (d) => `<div class="item">
      <div class="item-head"><span class="item-title">${esc(d.degree)}</span><span class="when">${esc(d.end)}</span></div>
      <p class="sub">${esc(d.institution)}${d.location ? `, ${esc(d.location)}` : ""}</p>
      <p>${esc(d.field)} group${grade(d) ? `, ${grade(d)}` : ""}</p>
    </div>`,
    )
    .join("");
  return main + rest;
}

function referencesBlock() {
  if (!isPrivate || referees.length === 0) return "";
  return sec(
    "References",
    `<div class="refs-grid">${referees
      .map(
        (r) => `<div class="item"><p><span class="item-title">${esc(r.name)}</span>, ${esc(r.title)}</p><p class="sub">${esc(r.department.replace("Department of Computer Science and Engineering", "Dept. of CSE"))}, ${esc(r.institution)}</p><p><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></p></div>`,
      )
      .join("")}</div>`,
  );
}

function roleBlock(kind: "Industry" | "Research" | "all", detailed: boolean) {
  return experience
    .filter((r) => kind === "all" || r.kind === kind)
    .map(
      (r) => `<div class="item">
      <div class="item-head"><span class="item-title">${esc(r.title)}</span><span class="when">${esc(r.start)} – ${esc(r.end)}</span></div>
      <p class="sub">${esc(r.organization)}${r.unit ? `, ${esc(r.unit)}` : ""}, ${esc(r.location)}</p>
      ${
        detailed
          ? `<ul class="bul">${r.highlights.map((h) => `<li><strong>${esc(h.title)}.</strong> ${esc(h.detail)}</li>`).join("")}</ul>`
          : `<p>${esc(r.summary)}</p>`
      }
    </div>`,
    )
    .join("");
}

function awardsBlock() {
  return [...achievements]
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
    .map(
      (a) => `<div class="item"><div class="item-head"><span class="item-title">${esc(a.title)}</span><span class="when">${esc(a.date)}</span></div>
      <p class="sub">${esc(a.outcome)}. ${esc(a.organizer)}</p></div>`,
    )
    .join("");
}

function academicCv() {
  const mentor = [...mentorship, ...service]
    .map((a) => {
      const org = known(a.organization) ? `, ${esc(a.organization)}` : "";
      const when = known(a.period) ? `<span class="when">${esc(a.period)}</span>` : "";
      const desc = known(a.description) ? `<p>${esc(a.description)}</p>` : "";
      return `<div class="item"><div class="item-head"><span class="item-title">${esc(a.title)}${org}</span>${when}</div>${desc}</div>`;
    })
    .join("");

  const ai = skillGroups.find((g) => g.name === "Artificial intelligence");
  const prog = skillGroups.find((g) => g.name === "Programming");

  return page(
    `${profile.name}, Academic CV`,
    `${header("Researcher in multilingual NLP, AI systems developer")}
    ${sec("Objective", `<p class="lead">${esc(profile.careerGoal)}</p>`)}
    ${sec("Education", educationBlock(!isPrivate))}
    ${sec("Peer-reviewed publications", `<ol class="refs">${publications.map(reference).join("")}</ol>`)}
    ${sec(
      "Presentations",
      conferenceParticipation
        .map(
          (c) =>
            `<div class="item"><div class="item-head"><span class="item-title">${esc(c.role)}, ${esc(c.event)}</span><span class="when">${esc(c.date)}</span></div><p>Presented “${esc(publications.find((p) => p.presentation?.event === c.event)?.title ?? "")}”, ${esc(c.location)}.</p></div>`,
        )
        .join(""),
    )}
    ${sec("Research experience", roleBlock("Research", true))}
    ${sec("Industry experience", roleBlock("Industry", false))}
    ${mentor ? sec("Mentorship and service", mentor) : ""}
    ${sec("Awards and competitions", awardsBlock())}
    ${sec("Research interests", `<p>${profile.researchInterests.map(esc).join(", ")}.</p>`)}
    ${sec(
      "Skills",
      `<dl class="kv">
        ${ai ? `<dt>AI and ML</dt><dd>${ai.skills.map((s) => esc(s.name)).join(", ")}</dd>` : ""}
        ${prog ? `<dt>Programming</dt><dd>${prog.skills.map((s) => esc(s.name)).join(", ")}</dd>` : ""}
      </dl>`,
    )}
    ${referencesBlock()}`,
  );
}

function resume() {
  const proj = projects
    .map(
      (p) => `<div class="item"><div class="item-head"><span><span class="item-title">${esc(p.title)}</span> <span class="sub">${esc(p.subtitle)}</span></span>${
        known(p.period) ? `<span class="when">${esc(p.period)}</span>` : ""
      }</div>
      <p>${esc(p.summary)}</p>
      ${p.stack.length ? `<p class="muted">${p.stack.map(esc).join(", ")}</p>` : ""}
      ${known(p.links.code) ? `<p><a href="${esc(p.links.code)}">${esc(host(p.links.code))}</a></p>` : ""}</div>`,
    )
    .join("");

  return page(
    `${profile.name}, Resume`,
    `${header("AI systems developer, multilingual NLP, full-stack development")}
    ${sec(
      "Summary",
      `<p class="lead">AI systems developer who builds production NLP for Bangla, English and Banglish: ONNX model integration, LLM explanation layers, unified inference APIs, analytics dashboards, and quantized local deployment with Ollama and llama.cpp. First author of two peer-reviewed NLP papers.</p>`,
    )}
    ${sec("Experience", roleBlock("all", true))}
    ${sec("Projects", proj)}
    ${sec(
      "Technical skills",
      `<dl class="kv">${skillGroups.map((g) => `<dt>${esc(g.name)}</dt><dd>${g.skills.map((s) => esc(s.name)).join(", ")}</dd>`).join("")}</dl>`,
    )}
    ${sec(
      "Publications",
      publications
        .map(
          (p) =>
            `<div class="item"><p><span class="item-title">${esc(p.title)}</span>. First author. ${esc(p.venue.short)}, ${esc(p.venue.publisher)}, ${p.year}. DOI: ${esc(p.doi)}</p></div>`,
        )
        .join(""),
    )}
    ${sec("Education", educationBlock(false))}
    ${referencesBlock()}`,
  );
}

async function launch() {
  const executablePath = process.env.CHROME_PATH;
  if (executablePath) return chromium.launch({ executablePath, headless: true, args: ["--no-sandbox"] });
  return chromium.launch({ channel: "chrome", headless: true });
}

const outDir = path.join(root, isPrivate ? "private-cv" : "public/cv");
const suffix = isPrivate ? "-with-references" : "";
await mkdir(outDir, { recursive: true });

const documents = [
  [`sabrim-mahmud-academic-cv${suffix}`, academicCv()],
  [`sabrim-mahmud-resume${suffix}`, resume()],
] as const;

// --html-only: write the HTML sources and stop (used by `npm run cv:weasyprint`).
if (process.argv.includes("--html-only")) {
  const htmlDir = path.join(root, "scripts/.cv-build", isPrivate ? "private" : "public");
  await mkdir(htmlDir, { recursive: true });
  for (const [file, html] of documents) {
    await writeFile(path.join(htmlDir, `${file}.html`), html);
    console.log(`Wrote ${path.relative(root, path.join(htmlDir, `${file}.html`))}`);
  }
  process.exit(0);
}

const browser = await launch();
try {
  for (const [file, html] of documents) {
    const page = await browser.newPage();
    const htmlPath = path.join(outDir, `.${file}.html`);
    await writeFile(htmlPath, html);
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: path.join(outDir, `${file}.pdf`),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      tagged: true,
      outline: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: `<div style="width:100%;font-size:7pt;color:#626b7d;padding:0 17mm;display:flex;justify-content:space-between;font-family:sans-serif"><span>${esc(profile.name)}</span><span><span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
    });
    await page.close();
    if (!process.env.KEEP_CV_HTML) {
      const { rm } = await import("node:fs/promises");
      await rm(htmlPath);
    }
    console.log(`Wrote ${path.relative(root, path.join(outDir, `${file}.pdf`))}`);
  }
} finally {
  await browser.close();
}
