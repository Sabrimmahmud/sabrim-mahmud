import type { Role } from "./types";

export const experience: Role[] = [
  {
    slug: "enovosoft",
    title: "AI Systems Developer",
    organization: "Enovosoft",
    location: "Bangladesh",
    start: "Aug 2025",
    end: "2026",
    endNeedsConfirmation: "End month at Enovosoft (the CV gives the year, 2026)",
    kind: "Industry",
    summary:
      "Built a multilingual sentiment platform for Bangla, English and Banglish with transformer-based NLP: the model integration, a unified API, an analytics dashboard, forecasting, and quantized local inference.",
    highlights: [
      {
        title: "Multilingual sentiment engine",
        detail:
          "Developed multilingual sentiment analysis for Bangla, English and Banglish with transformer-based NLP models, served as an ONNX model, with an explanation layer built on the Qwen language model.",
      },
      {
        title: "Unified AI API",
        detail:
          "Designed scalable endpoints for text, news and YouTube sentiment analysis, with fallback inference logic.",
      },
      {
        title: "Analytics dashboard",
        detail:
          "Built a full-stack sentiment intelligence platform with Next.js, TypeScript, Tailwind CSS and Recharts.",
      },
      {
        title: "Forecasting",
        detail: "Implemented sentiment trend analysis and time-series forecasting to detect emotional shifts.",
      },
      {
        title: "Model optimization",
        detail:
          "Applied bnb-4bit and GGUF quantization and deployed models through Ollama and llama.cpp for efficient inference.",
      },
    ],
    projects: ["unisentix"],
  },
  {
    slug: "diu-ar-vr-lab",
    title: "Research Assistant & AI Developer",
    organization: "Daffodil International University",
    unit: "AR/VR Lab",
    location: "Dhaka, Bangladesh",
    start: "2024",
    end: "2025",
    kind: "Research",
    summary:
      "Research on hate speech detection, cyberbullying classification and multilingual NLP, plus MRI classification pipelines and continual learning experiments.",
    highlights: [
      {
        title: "AI research",
        detail: "Worked on hate speech detection, cyberbullying classification and multilingual NLP research.",
      },
      {
        title: "Medical machine learning",
        detail:
          "Developed MRI classification pipelines with EfficientNet, YOLO segmentation, and continual learning with EWC and LwF.",
      },
      {
        title: "Full-stack systems",
        detail: "Built database-driven academic systems and real-time applications.",
      },
      {
        title: "Experimentation and evaluation",
        detail: "Contributed to AI model experimentation, evaluation and research-based software development.",
      },
    ],
    projects: ["medical-ai-pipeline"],
  },
];
