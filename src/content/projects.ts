import type { Project } from "./types";

/**
 * Facts here come from the resume. Anything the resume does not state is marked
 * pending rather than filled in. Add screenshots to /public/images/projects/.
 */
export const projects: Project[] = [
  {
    slug: "unisentix",
    title: "UniSentix",
    subtitle: "Multilingual sentiment intelligence suite",
    categories: ["NLP", "LLM systems", "Full-stack"],
    context: "Enovosoft, and my undergraduate thesis",
    period: "August 2025 – 2026",
    role: "AI Systems Developer",
    summary:
      "A full-stack platform that scores sentiment in Bangla, English and Banglish text, news and YouTube content, explains each prediction with a language model, and tracks how sentiment shifts over time.",
    problem: {
      pending:
        "Who UniSentix is for and the problem it solves for them, in two or three sentences.",
    },
    objectives: [
      "Score sentiment across Bangla, English and romanized Banglish.",
      "Explain predictions with a language model.",
      "Serve text, news and YouTube analysis through one API.",
      "Keep inference efficient through model quantization.",
    ],
    responsibilities: [
      "Integrated the ONNX sentiment model optimized for Bangla, English and Banglish.",
      "Designed the unified API for text, news and YouTube analysis, including fallback inference logic.",
      "Built the analytics dashboard in Next.js, TypeScript, Tailwind CSS and Recharts.",
      "Implemented sentiment trend analysis and time-series forecasting to detect emotional shifts.",
      "Quantized the explanation model (bnb-4bit, GGUF) and deployed it with Ollama and llama.cpp.",
    ],
    architecture: {
      note: "Drawn from the project description, not from the codebase. Replace it with your own diagram if the real flow differs.",
      steps: [
        { label: "Input", detail: "Text, news articles or YouTube content" },
        { label: "Unified API", detail: "One set of endpoints, with fallback inference" },
        { label: "Sentiment model", detail: "ONNX model for Bangla, English and Banglish" },
        { label: "Explanation layer", detail: "Quantized Qwen model via Ollama or llama.cpp" },
        { label: "Trends and forecasting", detail: "Time-series view of emotional shift" },
        { label: "Dashboard", detail: "Next.js, TypeScript, Tailwind CSS, Recharts" },
      ],
    },
    stack: [
      "ONNX",
      "Qwen",
      "Ollama",
      "llama.cpp",
      "bnb-4bit",
      "GGUF",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
    ],
    implementation: [
      "Sentiment scoring runs on an ONNX model optimized for Bangla, English and Banglish.",
      "A language model layer (Qwen) turns each prediction into a short explanation.",
      "One API serves plain text, news and YouTube input, with fallback inference logic.",
      "Quantization to 4-bit and GGUF formats lets the explanation model run locally through Ollama or llama.cpp.",
    ],
    challenges: {
      pending: "Two or three technical challenges you hit, such as code-mixed Banglish input or latency of the explanation model.",
    },
    solutions: { pending: "How you solved each challenge above." },
    outcomes: { pending: "Measured outcomes you can share: latency, accuracy, users, or what shipped." },
    screenshots: { pending: "Dashboard screenshots, with any client data removed" },
    links: {
      code: { pending: "Repository link, if it can be public" },
      demo: { pending: "Live demo link, if there is one" },
    },
    thesis:
      "“UniSentix: A Multilingual and Multimodal Sentiment Analysis Framework with Explainable Insights”, carried out as an industrial R&D project.",
    notice:
      "Built during employment at Enovosoft. Confirm with the company what can be shown publicly before adding screenshots or code.",
    featured: true,
  },
  {
    slug: "youtube-transcript-analyzer",
    title: "YouTube Transcript Analyzer",
    subtitle: "Segment-level sentiment and emotion timelines for video",
    categories: ["NLP", "Full-stack"],
    context: { pending: "Where this was built: personal project, Enovosoft, or the lab" },
    period: { pending: "When you built it" },
    role: "Developer",
    summary:
      "Scores sentiment for each segment of a YouTube transcript and plots the results as an emotional timeline, so you can see where a video's tone changes.",
    problem: { pending: "What question this tool answers, and for whom." },
    objectives: [
      "Break a transcript into segments and score each one.",
      "Show how sentiment moves across the length of a video.",
    ],
    responsibilities: [
      "Built per-segment sentiment scoring for transcripts.",
      "Built the emotional timeline visualization.",
    ],
    architecture: {
      note: "Drawn from the project description, not from the codebase.",
      steps: [
        { label: "YouTube video", detail: "Transcript retrieved for the video" },
        { label: "Segmentation", detail: "Transcript split into time-stamped segments" },
        { label: "Sentiment scoring", detail: "Each segment scored separately" },
        { label: "Emotional timeline", detail: "Scores plotted against video time" },
      ],
    },
    stack: [],
    implementation: [
      "Each transcript segment keeps its timestamp, so a score can be placed back on the video's timeline.",
    ],
    challenges: { pending: "Technical challenges, for example long transcripts or noisy auto-captions." },
    solutions: { pending: "How you solved them." },
    outcomes: { pending: "What it produced or who used it." },
    screenshots: { pending: "A screenshot of the emotional timeline" },
    links: {
      code: { pending: "Repository link" },
      demo: { pending: "Demo link" },
    },
    featured: true,
  },
  {
    slug: "medical-ai-pipeline",
    title: "Medical AI Pipeline",
    subtitle: "MRI classification, segmentation and continual learning",
    categories: ["Medical AI"],
    context: "DIU AR/VR Lab",
    period: "2024 – 2025",
    role: "Research Assistant & AI Developer",
    summary:
      "A pipeline for MRI image classification and feature extraction that tests whether a model can learn new tasks without forgetting earlier ones.",
    problem: { pending: "The clinical or research question, and the MRI dataset used." },
    objectives: [
      "Classify MRI images with an EfficientNet-based model.",
      "Segment regions of interest with YOLO.",
      "Compare continual learning methods, EWC and LwF, for learning new tasks without forgetting.",
    ],
    responsibilities: [
      "Developed MRI classification pipelines using EfficientNet.",
      "Applied YOLO for segmentation.",
      "Investigated continual learning with Elastic Weight Consolidation (EWC) and Learning without Forgetting (LwF).",
    ],
    architecture: {
      note: "Drawn from the project description, not from the codebase.",
      steps: [
        { label: "MRI images", detail: "Dataset to be named" },
        { label: "Segmentation", detail: "YOLO" },
        { label: "Feature extraction and classification", detail: "EfficientNet" },
        { label: "Continual learning", detail: "EWC and LwF across sequential tasks" },
      ],
    },
    stack: ["EfficientNet", "YOLO", "EWC", "LwF"],
    implementation: [
      "EWC limits changes to weights that mattered for earlier tasks; LwF keeps the new model's outputs close to the old model's on new data. The pipeline tries both.",
    ],
    challenges: { pending: "Challenges such as class imbalance or small datasets." },
    solutions: { pending: "How you addressed them." },
    outcomes: { pending: "Results you can report, with the dataset and metric." },
    screenshots: { pending: "Example predictions or a results figure" },
    links: {
      code: { pending: "Repository link" },
    },
    featured: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
