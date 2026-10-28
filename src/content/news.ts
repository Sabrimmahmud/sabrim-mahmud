import type { NewsItem } from "./types";

/**
 * Latest updates, newest first on the site (sorted by `sortDate`).
 * Add a line here whenever something happens: a paper, a talk, a new role, an award.
 */
export const news: NewsItem[] = [
  {
    date: "2026",
    sortDate: "2026-03-01",
    text: "PoliticaNet published by Springer in Communications in Computer and Information Science, vol. 2837 (APANConf 2025).",
    href: "/publications/politicanet-bangla-political-hate-speech",
    kind: "Publication",
  },
  {
    date: "2026",
    sortDate: "2026-02-01",
    text: "Mentoring participants in the Daffodil ModelX programme, run by Daffodil AI Club.",
    href: "/academic#mentorship",
    kind: "Mentorship",
  },
  {
    date: "Jan 2026",
    sortDate: "2026-01-08",
    text: "Completed the B.Sc. in Computer Science and Engineering at Daffodil International University, CGPA 3.84.",
    href: "/education",
    kind: "Education",
  },
  {
    date: "Aug 2025",
    sortDate: "2025-08-01",
    text: "Joined Enovosoft as an AI Systems Developer, building the UniSentix multilingual sentiment platform.",
    href: "/projects/unisentix",
    kind: "Role",
  },
  {
    date: "Jun 2025",
    sortDate: "2025-06-27",
    text: "Presented “Identifying Bangla Political Hate Speech using Transformer-based Approach” at NCIM 2025, Gazipur.",
    href: "/publications/identifying-bangla-political-hate-speech-transformers",
    kind: "Talk",
  },
  {
    date: "Apr 2025",
    sortDate: "2025-04-12",
    text: "Took part in Data Visionary, the National Data Analytics Competition 2025, with team Spark.",
    href: "/achievements#ndac-2025",
    kind: "Competition",
  },
  {
    date: "2024",
    sortDate: "2024-06-01",
    text: "Placed fifth in Crack Dataset 2024, the university's dataset contest, with teammate Samaun Rezvi Payel.",
    href: "/achievements#crack-dataset-2024",
    kind: "Award",
  },
];
