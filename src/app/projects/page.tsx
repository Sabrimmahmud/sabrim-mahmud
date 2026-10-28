import { PageIntro } from "@/components/page-intro";
import { ProjectExplorer } from "@/components/project-explorer";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Engineering case studies by Sabrim Mahmud: UniSentix multilingual sentiment platform, a YouTube transcript analyzer, and a medical imaging pipeline with continual learning.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        title="Projects"
        lead="Systems I have built for Bangla and multilingual text, and for medical images: what each one does, how it is put together, and my part in it."
      />
      <div className="shell">
        <div className="hang">
          <div aria-hidden className="hidden lg:block" />
          <ProjectExplorer projects={projects} />
        </div>
      </div>
    </>
  );
}
