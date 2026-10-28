# Content guide: kivabe notun jinish add korben

Shob text ar data `src/content/` folder-e. Page ba component chhute hobe na: file-e ekta entry add korun, save korun, site nije update hoye jabe (`npm run dev` chalu thakle browser-e shathe shathe dekhben).

Chobi gulo `public/images/` folder-e rakhben. File-er naam choto haater, space chhara, jemon `ncim-2025-stage.jpg`. Code-e path likhben `/images/...` diye shuru kore (`public` likhben na).

> Chobi boro hole age choto kore nin (1600px width jothesto). Certificate-e student ID, phone number ba onyo personal number thakle blur kore tarpor rakhben.

Chobir `width` ar `height` jante: Windows-e file-e right click → Properties → Details. Mac-e Preview → Tools → Show Inspector.

---

## 1. Notun achievement ba certificate

File: `src/content/achievements.ts`. `achievements` list-er bhitore ei block-ta copy kore boshan:

```ts
{
  slug: "icpc-2026",                      // URL-er jonno, choto haater, space chhara
  title: "ICPC Dhaka Regional 2026",
  outcome: "Participant",                 // "Champion", "3rd place", "Participant", "Speaker" — ja asholei hoyeche
  category: "Competition",                // "Competition" ba "Conference"
  event: "ICPC Asia Dhaka Regional Contest",
  organizer: "Daffodil International University",
  date: "15 March 2026",                  // jemon dekhabe
  sortDate: "2026-03-15",                 // sajanor jonno, YYYY-MM-DD
  description: "Took part with team ...",
  images: [
    {
      src: "/images/certificates/icpc-2026.jpg",
      width: 1600,
      height: 1200,
      alt: "ICPC 2026 certificate of participation awarded to Sabrim Mahmud.",  // je dekhte pay na tar jonno chobir bornona
      caption: "Certificate of participation.",
    },
    // ekadhik chobi dite paren: medal, stage photo, team photo
  ],
},
```

Homepage-er Recognition section, /achievements page ar CV PDF — shob jaygay nije theke chole ashbe.

## 2. Notun news ba update

File: `src/content/news.ts`. Shobcheye shohoj, ar site-ke "active" dekhay. Proti notun ghotonar por ek line add korun:

```ts
{
  date: "Mar 2026",
  sortDate: "2026-03-20",
  text: "Gave a guest talk on Bangla NLP at the DIU NLP & ML Research Lab.",
  href: "/research",          // optional: kon page-e niye jabe
  kind: "Talk",               // Publication, Talk, Award, Competition, Role, Education, Mentorship, Other
},
```

Homepage-e shesh 6 ta dekhay.

## 3. Project-e screenshot ba cover chobi

File: `src/content/projects.ts`. Project-er `screenshots` line-ta khujun. Ekhon eta ache:

```ts
screenshots: { pending: "Dashboard screenshots, with any client data removed" },
```

Eta bodle din:

```ts
screenshots: [
  {
    src: "/images/projects/unisentix-dashboard.png",
    width: 1600,
    height: 1000,
    alt: "UniSentix dashboard showing sentiment trends for Bangla news.",
    caption: "The analytics dashboard.",
  },
],
```

Prothom screenshot-ta nije theke project card-er chobi hoye jabe. Alada cover chaile `cover: { src, width, height, alt }` add korun. Kono chobi na thakle card-e project-er pipeline diagram dekhay.

GitHub ba demo link: `links: { code: "https://github.com/...", demo: "https://..." }`.

## 4. Notun paper

File: `src/content/publications.ts`. Ager ekta paper-er puro block copy kore boshan, tarpor title, authors, venue, year, DOI bodlan. `status` dite paren: `"published"`, `"presented"`, `"preprint"`, `"in-progress"`. Citation (APA, IEEE, BibTeX) nije theke toiri hobe.

## 5. Article ba blog post

File: `src/content/writing.ts`. File-er upore example dewa ache. Medium, dev.to ba LinkedIn article-er link dite paren.

## 6. Profile link (ORCID, Google Scholar)

File: `src/content/site.ts`, `links` er bhitore:

```ts
orcid: { label: "0000-0002-1234-5678", href: "https://orcid.org/0000-0002-1234-5678" },
scholar: { label: "Google Scholar", href: "https://scholar.google.com/citations?user=..." },
```

## 7. Portrait bodlate

`public/images/portrait.jpg` replace korun (3:4 ratio bhalo, jemon 900 × 1200). Size bodlale `site.ts`-e `portrait.width` ar `height` thik kore din.

---

## Ki missing ache dekhte

Site normally shob "Not added yet" note lukiye rakhe, tai shob shomoy finished dekhay. Kon kon jaygay info baki, dekhte chaile:

```bash
NEXT_PUBLIC_SHOW_PENDING=1 npm run dev
```

Windows PowerShell-e:

```powershell
$env:NEXT_PUBLIC_SHOW_PENDING="1"; npm run dev
```

## CV update

Content bodlanor por CV PDF notun kore banate:

```bash
npm run cv            # Google Chrome thakle
npm run cv:private    # references soho, email-e pathanor jonno
```

## Bhul hole

`npm run dev`-er terminal-e error dekhabe, line number soho. Shadharon karon: comma bad pora, quote (`"`) bondho na kora, ba `{ }` mile na. Error line-er ashe pashe check korun. Push korar age `npm run build` chaliye nin; build pass korle site thik ache.
