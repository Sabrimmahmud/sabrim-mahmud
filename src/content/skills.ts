import type { SkillGroup } from "./types";

const unisentix = { label: "UniSentix", href: "/projects/unisentix" };
const medical = { label: "Medical AI Pipeline", href: "/projects/medical-ai-pipeline" };
const youtube = { label: "YouTube Transcript Analyzer", href: "/projects/youtube-transcript-analyzer" };
const papers = { label: "Publications", href: "/publications" };
const enovosoft = { label: "Enovosoft", href: "/experience#enovosoft" };

/**
 * No proficiency percentages. Each skill points to where it was used.
 * A skill with no evidence yet still appears, without links.
 */
export const skillGroups: SkillGroup[] = [
  {
    name: "Programming",
    description: "Languages used across research code and production systems.",
    skills: [
      { name: "Python", evidence: [] },
      { name: "TypeScript", evidence: [unisentix] },
      { name: "JavaScript", evidence: [] },
      { name: "C++", evidence: [] },
      { name: "Java", evidence: [] },
      { name: "SQL", evidence: [] },
    ],
  },
  {
    name: "Artificial intelligence",
    description: "Building, adapting and shipping models, with a focus on Bangla and mixed-language text.",
    skills: [
      { name: "PyTorch", evidence: [] },
      { name: "Transformers and fine-tuning", evidence: [papers] },
      { name: "Natural language processing", evidence: [papers, unisentix, youtube] },
      { name: "ONNX", evidence: [unisentix] },
      { name: "Quantization (bnb-4bit, GGUF)", evidence: [unisentix] },
      { name: "LLM integration (Qwen)", evidence: [unisentix] },
      { name: "Time-series forecasting", evidence: [unisentix] },
      { name: "EfficientNet and YOLO", evidence: [medical] },
      { name: "Continual learning (EWC, LwF)", evidence: [medical] },
    ],
  },
  {
    name: "Frontend",
    description: "Interfaces for exploring model output.",
    skills: [
      { name: "React", evidence: [unisentix] },
      { name: "Next.js", evidence: [unisentix] },
      { name: "Tailwind CSS", evidence: [unisentix] },
      { name: "Recharts", evidence: [unisentix] },
    ],
  },
  {
    name: "Backend",
    description: "Services that put models behind stable interfaces.",
    skills: [
      { name: "REST API design", evidence: [unisentix, enovosoft] },
      { name: "FastAPI", evidence: [] },
      { name: "Node.js", evidence: [] },
    ],
  },
  {
    name: "Tools and deployment",
    description: "Running models locally and keeping work reproducible.",
    skills: [
      { name: "Ollama", evidence: [unisentix] },
      { name: "llama.cpp", evidence: [unisentix] },
      { name: "Git", evidence: [] },
      { name: "MySQL", evidence: [] },
    ],
  },
];
