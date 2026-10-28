import type { Publication } from "./types";

/**
 * Bibliographic details come from the CV, the NCIM certificate and badge, and the
 * Daffodil International University research portal (Scopus listing).
 * Summaries and results are paraphrased from the published abstracts.
 * Check every field against the publisher page before submitting the site anywhere.
 */
export const publications: Publication[] = [
  {
    slug: "politicanet-bangla-political-hate-speech",
    title:
      "PoliticaNet: A Transformer-Driven Framework for Fine-Grained Classification of Bangla Political Hate Speech in Social Media",
    authors: [
      { name: "Sabrim Mahmud", isSelf: true },
      { name: "Samaun Rezvi Payel" },
      { name: "Jawad Hossain" },
    ],
    authorNote: "The publisher notes equal contributions.",
    year: 2026,
    status: "published",
    type: "Conference paper, published as a book chapter",
    venue: {
      name: "Asia Pacific Advanced Network (APANConf 2025)",
      short: "APANConf 2025",
      publisher: "Springer",
      series: "Communications in Computer and Information Science",
      volume: "2837",
      pages: "93–111",
    },
    doi: "10.1007/978-3-032-18319-4_6",
    topics: ["Hate speech detection", "Low-resource NLP", "Transformers", "Dataset"],
    summary:
      "Builds a new Bangla dataset of 11,118 politically reactive Facebook comments and labels each one at a fine grain: passive political hate speech, direct political hate speech, non-political hate speech, or other. Classical machine learning, deep learning and transformer models are compared on the four-way task, and the Bangla BERT-SQuAD transformer performed best.",
    summarySource: "Paraphrased from the published abstract.",
    problem: {
      pending:
        "The research problem in your own words: why separating passive from direct political hate speech matters, and what earlier Bangla datasets did not cover.",
    },
    method: {
      pending:
        "Method details from the paper: annotation guidelines, inter-annotator agreement, preprocessing, the specific models compared and training setup.",
    },
    contribution:
      "A four-class dataset that separates passive from direct political hate speech, and a comparison of classical, deep learning and transformer models on that fine-grained task.",
    results: [{ label: "Best model, Bangla BERT-SQuAD", value: "F1-score 0.74" }],
    dataset: "11,118 Facebook comments, four classes (Pa-PoliHaS, Dir-PoliHaS, Non-PoliHaS, Other)",
    links: {
      paper: { pending: "Link to an author copy or accepted manuscript, if the publisher allows it" },
      code: { pending: "Code repository link, if public" },
      dataset: { pending: "Dataset link or access policy, if released" },
    },
    featured: true,
  },
  {
    slug: "identifying-bangla-political-hate-speech-transformers",
    title: "Identifying Bangla Political Hate Speech using Transformer-based Approach",
    authors: [
      { name: "Sabrim Mahmud", isSelf: true },
      { name: "Samaun Rezvi Payel" },
      { name: "Jawad Hossain" },
      { name: "Nuzhat Tabassum Progga" },
      { name: "Asma Mariam" },
    ],
    year: 2025,
    status: "published",
    type: "Conference paper",
    venue: {
      name: "2025 2nd International Conference on Next-Generation Computing, IoT and Machine Learning (NCIM)",
      short: "NCIM 2025",
      publisher: "IEEE",
      pages: "1–6",
      location: "Gazipur, Bangladesh",
      dates: "27–28 June 2025",
    },
    doi: "10.1109/NCIM65934.2025.11159848",
    topics: ["Hate speech detection", "Low-resource NLP", "Transformers", "Dataset"],
    summary:
      "Introduces BanglaPoliHaS-D, a new dataset for detecting political hate speech in Bangla, and compares machine learning, deep learning and transformer approaches on it. Bangla-BERT gave the best result.",
    summarySource: "Paraphrased from the published abstract.",
    problem:
      "Bangla is a low-resource language, and detecting political hate speech in it first needs annotated data that models can be trained and compared on.",
    method: {
      pending:
        "Method details from the paper: data source, dataset size and labels, preprocessing, the models compared and training setup.",
    },
    contribution:
      "The BanglaPoliHaS-D dataset and a comparison of classical, deep learning and transformer models for political hate speech in Bangla.",
    results: [{ label: "Best model, Bangla-BERT", value: "Accuracy 92.41%" }],
    dataset: "BanglaPoliHaS-D",
    links: {
      paper: { pending: "Link to an author copy or accepted manuscript, if IEEE policy allows it" },
      code: { pending: "Code repository link, if public" },
      dataset: { pending: "Dataset link or access policy, if released" },
      slides: { pending: "Presentation slides, if you want to share them" },
    },
    presentation: {
      event: "NCIM 2025",
      date: "27–28 June 2025",
      location: "Dhaka University of Engineering & Technology, Gazipur",
      evidence: "Certificate of appreciation for presenting the paper",
    },
    featured: true,
  },
];

export function getPublication(slug: string) {
  return publications.find((p) => p.slug === slug);
}

export const statusLabels: Record<Publication["status"], string> = {
  published: "Published",
  presented: "Presented",
  preprint: "Preprint",
  "in-progress": "In progress",
};
