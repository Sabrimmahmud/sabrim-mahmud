import type { Degree } from "./types";

/**
 * B.Sc. details are from the official academic transcript (issued 19 April 2026).
 * HSC and SSC details are from the LaTeX CV.
 */
export const education: Degree[] = [
  {
    slug: "bsc",
    level: "Undergraduate",
    degree: "Bachelor of Science",
    field: "Computer Science and Engineering",
    institution: "Daffodil International University",
    location: "Dhaka, Bangladesh",
    start: "Jan 2022",
    end: "Jan 2026",
    details: [
      "Four-year programme, enrolled Spring 2022.",
      "Results published 8 January 2026.",
      "Medium of instruction: English.",
    ],
    result: { label: "CGPA", value: "3.84", scale: "4.00" },
    credits: "148 of 148 credits completed",
    coursework: [
      "Natural Language Processing",
      "Artificial Intelligence",
      "Data Mining and Machine Learning",
      "Introduction to Data Science",
      "Statistics and Probability",
      "Algorithms",
      "Data Structures",
      "Database Management Systems",
      "Software Engineering",
      "System Analysis and Design",
      "Research and Innovation in CSE",
      "Web Engineering",
      "Compiler Design",
      "Computer Networks",
    ],
    thesis: {
      kind: "Undergraduate thesis, industrial R&D project",
      title: "UniSentix: A Multilingual and Multimodal Sentiment Analysis Framework with Explainable Insights",
      href: "/projects/unisentix",
    },
  },
  {
    slug: "hsc",
    level: "Higher secondary",
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science",
    institution: "Rajshahi Govt. City College",
    location: "Rajshahi, Bangladesh",
    end: "2020",
    details: [],
    result: { label: "GPA", value: "5.00", scale: "5.00" },
    coursework: [],
  },
  {
    slug: "ssc",
    level: "Secondary",
    degree: "Secondary School Certificate (SSC)",
    field: "Science",
    institution: "Akkelpur F. U. Pilot High School",
    end: "2017",
    details: [],
    result: { label: "GPA", value: "5.00", scale: "5.00" },
    coursework: [],
  },
];

export const degree = education[0];
