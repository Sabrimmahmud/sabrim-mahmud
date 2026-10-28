import type { AcademicActivity } from "./types";

export const mentorship: AcademicActivity[] = [
  {
    slug: "daffodil-modelx",
    title: "Program Mentor, Daffodil ModelX",
    organization: "Daffodil AI Club, Daffodil International University",
    period: "2026",
    description: "Mentored participants in the Daffodil ModelX programme, supporting their learning and skill development.",
  },
];

export const service: AcademicActivity[] = [
  {
    slug: "research-development-team",
    title: "Research & Development (R&D) Team Member",
    organization: "Faculty-supervised R&D team, Daffodil International University",
    period: { pending: "Dates you were on the team" },
    description:
      "Took part in a faculty-supervised research and development team that later became affiliated with Daffodil AI Club.",
  },
];

export const conferenceParticipation = [
  {
    event: "NCIM 2025",
    role: "Author and paper presenter",
    date: "27–28 June 2025",
    location: "Gazipur, Bangladesh",
    href: "/publications/identifying-bangla-political-hate-speech-transformers",
  },
];

/** Methods and tools that appear in the published work and projects. */
export const researchMethods = [
  {
    name: "Dataset construction for a low-resource language",
    detail: "Collecting and labelling Bangla social media comments for political hate speech.",
  },
  {
    name: "Comparative model evaluation",
    detail: "Testing classical machine learning, deep learning and transformer models on the same task.",
  },
  {
    name: "Transformer fine-tuning",
    detail: "Adapting pretrained Bangla language models to classification tasks.",
  },
  {
    name: "Continual learning",
    detail: "Comparing EWC and LwF for learning new tasks without forgetting earlier ones.",
  },
  {
    name: "Efficient inference",
    detail: "ONNX export and 4-bit and GGUF quantization for running models on local hardware.",
  },
];

/** Presented as interests. None of these is a teaching appointment. */
export const teachingInterests = [
  "Programming fundamentals",
  "Database systems",
  "Software engineering",
  "Artificial intelligence and machine learning",
  "Natural language processing",
];
