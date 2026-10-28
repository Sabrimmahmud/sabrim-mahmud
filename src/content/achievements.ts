import type { Achievement } from "./types";

/**
 * Student ID numbers have been blurred out of the certificate photos.
 * Keep originals out of /public.
 */
export const achievements: Achievement[] = [
  {
    slug: "ncim-2025-presenter",
    title: "Paper presentation, NCIM 2025",
    outcome: "Paper presenter",
    category: "Conference",
    event: "2nd International Conference on Next-Generation Computing, IoT and Machine Learning",
    organizer: "Department of CSE, Dhaka University of Engineering & Technology, Gazipur",
    date: "27–28 June 2025",
    sortDate: "2025-06-27",
    description:
      "Presented “Identifying Bangla Political Hate Speech using Transformer-based Approach” as first author. The conference had IEEE and the IEEE Computer Society as technical co-sponsors.",
    images: [
      {
        src: "/images/certificates/ncim-certificate.jpg",
        width: 1600,
        height: 1200,
        alt: "NCIM 2025 certificate of appreciation certifying that Sabrim Mahmud presented the paper Identifying Bangla Political Hate Speech using Transformer-based Approach, with the five authors listed.",
        caption: "Certificate of appreciation for presenting the paper.",
      },
      {
        src: "/images/certificates/ncim-author-badge.jpg",
        width: 1200,
        height: 1600,
        alt: "NCIM 2025 conference badge reading Author, Ms. Sabrim Mahmud, Daffodil International University.",
        caption: "Author badge from the conference.",
      },
    ],
    related: {
      label: "Read about the paper",
      href: "/publications/identifying-bangla-political-hate-speech-transformers",
    },
  },
  {
    slug: "crack-dataset-2024",
    title: "Crack Dataset 2024",
    outcome: "Fifth place",
    category: "Competition",
    event: "Intra-university dataset contest",
    organizer: "Department of CSE and NLP & ML Research Lab, Daffodil International University",
    date: "2024",
    sortDate: "2024-01-01",
    description:
      "Placed fifth in the university's dataset contest with teammate Samaun Rezvi Payel (team CD24_T081). Each team member received a certificate of achievement and a fifth-place medal from the NLP & ML Research Lab.",
    images: [
      {
        src: "/images/certificates/crack-dataset-2024-team.jpg",
        width: 1280,
        height: 960,
        alt: "Sabrim Mahmud and teammate Samaun Rezvi Payel seated in an auditorium, each wearing a medal and holding a Crack Dataset 2024 certificate of achievement, with a fifth position envelope between them. Student IDs are blurred.",
        caption: "With teammate Samaun Rezvi Payel at the award ceremony. Student IDs blurred.",
      },
      {
        src: "/images/certificates/crack-dataset-2024-certificates-and-medals.jpg",
        width: 1280,
        height: 994,
        alt: "Two Crack Dataset 2024 certificates of achievement with fifth-place ribbons, two medals marked 5th, and an envelope reading 5th Position. Student IDs are blurred.",
        caption: "Both team certificates, the fifth-place medals and the result envelope. Student IDs blurred.",
      },
      {
        src: "/images/certificates/crack-dataset-2024-fifth-place.jpg",
        width: 1600,
        height: 1200,
        alt: "Crack Dataset 2024 certificate of achievement awarded to Sabrim Mahmud, with a fifth place ribbon. The student ID is blurred.",
        caption: "Certificate of achievement, fifth place. Student ID blurred.",
      },
      {
        src: "/images/certificates/crack-dataset-2024-medal.jpg",
        width: 1200,
        height: 1600,
        alt: "Gold-coloured medal with a laurel border reading Organized by NLP & ML Research Lab, DIU.",
        caption: "Medal from the NLP & ML Research Lab.",
      },
      {
        src: "/images/certificates/crack-dataset-2024-participation.jpg",
        width: 1600,
        height: 1200,
        alt: "Crack Dataset 2024 certificate of participation awarded to Sabrim Mahmud. The student ID is blurred.",
        caption: "Certificate of participation. Student ID blurred.",
      },
    ],
  },
  {
    slug: "ndac-2025",
    title: "Data Visionary: National Data Analytics Competition 2025",
    outcome: "Participant",
    category: "Competition",
    event: "National data analytics competition (NDAC 2025)",
    organizer: "Department of CSE, Daffodil International University",
    date: "12 April 2025",
    sortDate: "2025-04-12",
    description: "Took part in the national data analytics competition with team Spark.",
    images: [
      {
        src: "/images/certificates/ndac-2025-certificate.jpg",
        width: 1600,
        height: 1200,
        alt: "Certificate of appreciation for participating in Data Visionary, the National Data Analytics Competition 2025, team Spark, dated 12 April 2025.",
        caption: "Certificate of participation, team Spark.",
      },
    ],
  },
];
