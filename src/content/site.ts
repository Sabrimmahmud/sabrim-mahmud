import type { ExternalLink, Maybe } from "./types";

export const site = {
  /**
   * "Not added yet" notes for missing facts. Off by default, so the site always looks finished:
   * sections with nothing to show simply disappear. To see what is still missing, run
   *   NEXT_PUBLIC_SHOW_PENDING=1 npm run dev
   */
  showPending: process.env.NEXT_PUBLIC_SHOW_PENDING === "1",
  /** Shows CGPA and GPA results on the education page and in the CVs. */
  showGrades: true,
  /** Shows the phone number on the contact page and in the public CV PDFs. */
  showPhone: true,
  /** Set NEXT_PUBLIC_SITE_URL in your hosting settings once the domain is final. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  locale: "en",
};

export const profile = {
  name: "Sabrim Mahmud",
  shortRoles: ["AI systems developer", "NLP researcher", "software engineer"],
  headline: "Building intelligent systems. Advancing meaningful research.",
  intro:
    "I'm a Computer Science graduate, AI systems developer, and researcher working at the intersection of multilingual NLP, machine learning, and practical software engineering. I build intelligent applications and investigate how AI can solve meaningful real-world problems.",
  location: "Dhaka, Bangladesh",
  email: "mahmudsabrim@gmail.com",
  phone: { display: "+880 1754 971710", href: "tel:+8801754971710" },
  /** The career objective from the CV. */
  careerGoal:
    "I want to build a career in academia as a Computer Science educator and researcher: teaching well, mentoring students, and doing research in artificial intelligence, machine learning and natural language processing that matters outside the lab. My research and software engineering experience help me connect theory with working systems.",
  portrait: {
    src: "/images/portrait.jpg",
    width: 675,
    height: 900,
    alt: "Portrait of Sabrim Mahmud",
  },
  about: [
    "I completed my B.Sc. in Computer Science and Engineering at Daffodil International University in January 2026. My research looks at Bangla, a language spoken by hundreds of millions of people that still has comparatively few annotated datasets and tools.",
    "As first author, I have published two papers on detecting political hate speech in Bangla social media: one at NCIM 2025, where I presented the work, and one in Springer's Communications in Computer and Information Science series from APANConf 2025.",
    "Alongside research I build software. At Enovosoft I developed UniSentix, a multilingual sentiment platform that reads Bangla, English and Banglish, explains its predictions with a language model, and runs efficiently through quantized local inference. It was also my undergraduate thesis, as an industrial R&D project. Before that, at the DIU AR/VR Lab, I worked on hate speech and cyberbullying classification and on medical image pipelines.",
    "I also mentor students in the Daffodil ModelX programme run by Daffodil AI Club. My aim is an academic career that combines teaching, mentoring and research in AI, machine learning and NLP.",
  ],
  researchInterests: [
    "Natural language processing",
    "Multilingual and low-resource NLP",
    "Transformer models",
    "Explainable artificial intelligence",
    "Responsible and trustworthy AI",
    "Hate speech detection",
    "Deep learning and applied machine learning",
    "AI for accessibility and healthcare",
    "Multimodal AI",
  ],
};

export const links: {
  github: ExternalLink;
  linkedin: ExternalLink;
  orcid: Maybe<ExternalLink>;
  scholar: Maybe<ExternalLink>;
  researchgate: Maybe<ExternalLink>;
} = {
  github: { label: "github.com/Sabrimmahmud", href: "https://github.com/Sabrimmahmud" },
  linkedin: {
    label: "linkedin.com/in/sabrim-mahmud-048b88313",
    href: "https://www.linkedin.com/in/sabrim-mahmud-048b88313/",
  },
  orcid: { pending: "ORCID iD (orcid.org/0000-…)" },
  scholar: { pending: "Google Scholar profile link" },
  researchgate: { pending: "ResearchGate profile link, if you use one" },
};

export const cvFiles = {
  academic: {
    href: "/cv/sabrim-mahmud-academic-cv.pdf",
    fileName: "Sabrim-Mahmud-Academic-CV.pdf",
    title: "Academic CV",
  },
  resume: {
    href: "/cv/sabrim-mahmud-resume.pdf",
    fileName: "Sabrim-Mahmud-Resume.pdf",
    title: "Software engineering resume",
  },
};

export type NavItem = { href: string; label: string; description: string };

/** Primary navigation, shown in the header on wide screens. */
export const primaryNav: NavItem[] = [
  { href: "/research", label: "Research", description: "Themes, questions and interests" },
  { href: "/publications", label: "Publications", description: "Peer-reviewed papers" },
  { href: "/projects", label: "Projects", description: "Engineering case studies" },
  { href: "/experience", label: "Experience", description: "Industry and research roles" },
  { href: "/about", label: "About", description: "Background and portrait" },
];

/** Everything else, grouped in the "More" menu and the footer. */
export const secondaryNav: NavItem[] = [
  { href: "/education", label: "Education", description: "Degree and coursework" },
  { href: "/academic", label: "Academic", description: "Mentorship, service, teaching interests" },
  { href: "/achievements", label: "Achievements", description: "Competitions and certificates" },
  { href: "/skills", label: "Skills", description: "Tools, shown through the work" },
  { href: "/writing", label: "Writing", description: "Articles and technical notes" },
  { href: "/cv", label: "CV", description: "Academic CV and resume" },
  { href: "/contact", label: "Contact", description: "Email and profiles" },
];
