# Sabrim Mahmud — personal academic and professional site

Next.js 16 (App Router, Cache Components), TypeScript strict, Tailwind CSS 4, Motion and Lucide icons.
Every page is prerendered at build time; there is no database, backend or tracking.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Node 20.9 or newer is required (22 LTS recommended).

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint |
| `npm test` | Unit and component tests (Vitest, Testing Library) |
| `npm run test:e2e` | Browser tests against the production build (Playwright). Run `npm run build` first, and `npx playwright install chromium` once |
| `npm run cv` | Rebuilds both CV PDFs with Google Chrome |
| `npm run cv:weasyprint` | Same, using WeasyPrint instead of Chrome (`pip install weasyprint`) |
| `npm run cv:private` | Builds copies that also list your referees, into `private-cv/` (git-ignored, never deployed). Use these for applications you send by email |

## Editing content

All text lives in typed files in `src/content/`. Pages read from them, so most updates never touch a component.

| File | Holds |
| --- | --- |
| `site.ts` | Name, intro, about text, research interests, email, profile links, navigation, CV file names, site switches |
| `publications.ts` | Papers: authors, venue, DOI, summary, results, links |
| `projects.ts` | Case studies |
| `experience.ts` | Roles and highlights |
| `education.ts` | B.Sc. (CGPA, coursework, thesis), HSC and SSC |
| `references.ts` | Referees. Used only by `npm run cv:private`, never shown on the site |
| `achievements.ts` | Competitions, presentations and their certificate images |
| `academic.ts` | Mentorship, service, conferences, methods, teaching interests |
| `skills.ts` | Skills, each linked to where it was used |
| `news.ts` | Dated updates shown on the homepage |
| `writing.ts` | Articles (empty for now; the page shows an empty state) |

### Placeholders

A fact that is not known yet is written as `{ pending: "what is missing" }` instead of a value, so nothing is invented. By default these are hidden and any section with nothing to show disappears, so the site always looks finished.

- To see every missing fact as a dashed **Not added yet** note: `NEXT_PUBLIC_SHOW_PENDING=1 npm run dev`
- Fill one in by replacing the object with the real value, for example
  `code: { pending: "Repository link" }` becomes `code: "https://github.com/Sabrimmahmud/unisentix"`.
- To list what is left: `grep -rn "pending:" src/content`

Step-by-step examples in Banglish (achievements with photos, news, screenshots, papers): see **CONTENT-GUIDE.md**.

### Common additions

- **New paper**: add an object to `publications` in `publications.ts`. Its page at `/publications/<slug>`, the citation box (APA, IEEE, BibTeX), structured data and sitemap entry are generated from it.
- **New project**: add to `projects.ts`. Put screenshots in `public/images/projects/` and list them in `screenshots`.
- **New award or certificate**: add to `achievements.ts`, with the image in `public/images/certificates/`. Blur any student ID or personal number before adding a photo.
- **New article**: add to `articles` in `writing.ts`.
- **Grades**: hide CGPA and GPA everywhere with `showGrades: false` in `site.ts`.
- **Phone number**: hide it from the site and the public PDFs with `showPhone: false` in `site.ts`. The private CV always includes it.

After changing CV-relevant content, run `npm run cv` (or `npm run cv:weasyprint`) to regenerate `public/cv/*.pdf`.

## Structure

```
src/
  app/            routes, metadata, sitemap, robots, social image, 404 and error pages
  components/     header, footer, filters, citation box, certificate gallery, entries
  content/        all site text and data (see above)
  fonts/          self-hosted Newsreader, Instrument Sans, Tiro Bangla (SIL OFL)
  lib/            citation formatting, SEO helpers
scripts/          CV PDF builder and its static font instances
public/           portrait, certificate photos (IDs blurred), CV PDFs
tests/            unit, component and end-to-end tests
```

Design tokens (colour, type scale) are CSS variables at the top of `src/app/globals.css`. The light theme is warm off-white with midnight-navy text and emerald links; dark mode swaps the navy in as the page colour. Fonts are self-hosted, so builds do not depend on a font CDN.

## Deploy to Vercel

1. Push the project to a GitHub repository.
2. In Vercel, choose **Add New… → Project** and import the repository. The defaults (framework Next.js, `npm run build`) are correct.
3. Once you have a domain, add it under **Settings → Domains**, then set the environment variable `NEXT_PUBLIC_SITE_URL` (for example `https://sabrimmahmud.com`) under **Settings → Environment Variables** and redeploy. This turns on canonical URLs and absolute links in the sitemap.

Until `NEXT_PUBLIC_SITE_URL` is set, the site works normally but does not claim a canonical address.

## Accessibility and quality notes

- Colour pairs meet WCAG AA contrast in both themes. Focus is always visible; a skip link leads to the main content.
- Menus, filters, the citation tabs and the certificate viewer all work by keyboard; the viewer uses a native modal dialog and returns focus on close.
- Motion is limited to one load animation in the hero and transitions that follow a person's action. All of it is turned off under reduced-motion settings.
- External links open in a new tab with `rel="noopener noreferrer"`. The site has no forms, so it accepts no user input on the server.
