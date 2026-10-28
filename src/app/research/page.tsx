import Link from "next/link";
import { Pending } from "@/components/pending";
import { PageIntro, Section } from "@/components/page-intro";
import { profile } from "@/content/site";
import { publications } from "@/content/publications";
import { researchMethods } from "@/content/academic";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research",
  description:
    "Sabrim Mahmud's research on Bangla NLP: political hate speech detection, multilingual sentiment across Bangla, Banglish and English, explainable and efficient models, and medical imaging.",
  path: "/research",
});

type Theme = {
  id: string;
  title: string;
  kind: string;
  body: string;
  evidence: { label: string; href: string; note: string }[];
};

const themes: Theme[] = [
  {
    id: "political-hate-speech",
    title: "Political hate speech in Bangla social media",
    kind: "Published research",
    body: "Both of my papers introduce Bangla datasets for political hate speech and compare classical, deep learning and transformer models on them. The second, PoliticaNet, labels 11,118 Facebook comments at a finer grain: passive political hate speech, direct political hate speech, non-political hate speech, and other.",
    evidence: publications.map((p) => ({
      label: p.title,
      href: `/publications/${p.slug}`,
      note: `${p.venue.short}, ${p.venue.publisher}, ${p.year}`,
    })),
  },
  {
    id: "multilingual-sentiment",
    title: "Sentiment across Bangla, Banglish and English",
    kind: "Engineering work",
    body: "People in Bangladesh write in Bangla script, in romanized Banglish, and in English, sometimes within a single comment. UniSentix scores sentiment across all three and tracks how it changes over time, for text, news and YouTube content.",
    evidence: [
      { label: "UniSentix", href: "/projects/unisentix", note: "Enovosoft" },
      { label: "YouTube Transcript Analyzer", href: "/projects/youtube-transcript-analyzer", note: "Segment-level sentiment" },
    ],
  },
  {
    id: "explainable-efficient",
    title: "Explainable and efficient models",
    kind: "Engineering work",
    body: "A prediction is more useful when it comes with a reason, and a model is more useful when it runs where the data is. UniSentix pairs its classifier with a language model that explains each result, and serves that model in 4-bit and GGUF form through Ollama and llama.cpp.",
    evidence: [{ label: "UniSentix architecture", href: "/projects/unisentix#architecture", note: "ONNX, Qwen, Ollama, llama.cpp" }],
  },
  {
    id: "medical-imaging",
    title: "Medical image intelligence and continual learning",
    kind: "Research assistant work",
    body: "At the DIU AR/VR Lab I built MRI classification pipelines with EfficientNet and YOLO segmentation, and compared EWC and LwF for adding new tasks without losing earlier ones.",
    evidence: [{ label: "Medical AI Pipeline", href: "/projects/medical-ai-pipeline", note: "DIU AR/VR Lab" }],
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageIntro
        title="Research"
        lead="I work on language technology for Bangla as people actually write it online: in Bangla script, in romanized Banglish, and mixed with English."
      />

      {themes.map((t) => (
        <Section key={t.id} id={t.id} title={t.title} aside={t.kind}>
          <p className="measure text-step-1 leading-[1.6] text-ink-2">{t.body}</p>
          <ul className="mt-6 max-w-[44rem] divide-y divide-rule border-y border-rule">
            {t.evidence.map((e) => (
              <li key={e.href} className="grid gap-0.5 py-3 sm:grid-cols-[minmax(0,1fr)_13rem] sm:gap-6">
                <Link href={e.href} className="prose-link">
                  {e.label}
                </Link>
                <span className="text-[0.875rem] text-ink-3 sm:text-right">{e.note}</span>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section title="Current and planned work" id="ongoing">
        <Pending what="Research in progress or planned, each with a one-line description and its status (idea, in preparation, under review)." />
      </Section>

      <Section title="Interests" id="interests">
        <ul className="grid max-w-[44rem] gap-x-8 gap-y-2 text-ink-2 sm:grid-cols-2">
          {profile.researchInterests.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </Section>

      <Section title="Methods" id="methods" aside={<Link href="/academic" className="prose-link">Academic profile</Link>}>
        <dl className="max-w-[44rem] space-y-4">
          {researchMethods.map((m) => (
            <div key={m.name} className="grid gap-0.5 sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-6">
              <dt className="font-medium text-ink">{m.name}</dt>
              <dd className="text-ink-2">{m.detail}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
