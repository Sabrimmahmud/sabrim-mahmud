# To verify before publishing

Missing facts are hidden on the site by default. Run `NEXT_PUBLIC_SHOW_PENDING=1 npm run dev` to see each one as a **Not added yet** note.
Search the content for the rest: `grep -rn "pending:" src/content`

## Facts to confirm

1. **Author lists.** The CV and NCIM certificate list three authors for PoliticaNet and five for the NCIM paper. The DIU research portal lists fewer (it seems to show only DIU-affiliated authors). Check both against the IEEE Xplore and SpringerLink pages.
2. **"The publisher notes equal contributions"** on PoliticaNet comes from the earlier CV. Confirm it appears on the Springer page.
3. **Published results.** NCIM: Bangla-BERT accuracy 92.41%. PoliticaNet: Bangla BERT-SQuAD F1-score 0.74 on 11,118 comments and four classes. Taken from the published abstracts; confirm against the papers.
4. **NCIM pages 1–6** come from the LaTeX CV. Confirm on IEEE Xplore.
5. **Enovosoft dates.** The resume says Aug 2025, the LaTeX CV says 2025–2026. The site shows Aug 2025 – 2026; add the end month.
6. **CGPA 3.84, HSC and SSC GPA 5.00** are shown. Set `showGrades: false` in `site.ts` to hide all of them.
7. **Phone number** is on the contact page and in the public CV PDFs. Set `showPhone: false` if you would rather keep it only in the private CV.
8. **Referees.** Their names and emails are only in the private CV (`npm run cv:private`). The site says references are available on request. Ask both referees before sending their details.
9. **Skills removed from the resume list.** The resume's second skills line (Scala, Kafka, AWS, Play, GCE) looked like template text and is not on the site. Add any you really use to `skills.ts`.
10. **UniSentix and Enovosoft.** UniSentix was both Enovosoft work and your undergraduate thesis. Confirm with the company what can be shown publicly before adding screenshots or code.
11. **Portrait.** The photo's blue background was replaced with a soft neutral tone. If you prefer another photo, replace `public/images/portrait.jpg` (3:4 ratio).

## Missing information

- Paper PDFs or author copies, code and dataset links, slides (`publications.ts`)
- Method details and your own wording of PoliticaNet's research problem
- Project screenshots, repository and demo links, challenges, solutions and outcomes (`projects.ts`)
- A short summary of the UniSentix thesis, and what "multimodal" covers in it
- Where and when the YouTube Transcript Analyzer was built, and its tech stack
- MRI dataset name and reportable results for the Medical AI Pipeline
- Dates you were on the R&D team (`academic.ts`)
- Current or planned research (`/research` page)
- ORCID, Google Scholar, ResearchGate links (`site.ts`)
- Articles for `/writing`, if any
- Live domain, for `NEXT_PUBLIC_SITE_URL`
