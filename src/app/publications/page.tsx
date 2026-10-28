import { PageIntro } from "@/components/page-intro";
import { PublicationExplorer } from "@/components/publication-explorer";
import { publications } from "@/content/publications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Publications",
  description:
    "Peer-reviewed papers by Sabrim Mahmud on Bangla political hate speech detection, published by IEEE (NCIM 2025) and Springer (APANConf 2025).",
  path: "/publications",
});

export default function PublicationsPage() {
  return (
    <>
      <PageIntro
        title="Publications"
        lead="Two peer-reviewed papers, both as first author, on detecting political hate speech in Bangla social media. Each entry links to the publisher through its DOI."
      />
      <div className="shell">
        <div className="hang">
          <div className="hang-label hidden lg:block">
            <p>Status labels distinguish published papers from presentations, preprints and work in progress.</p>
          </div>
          <PublicationExplorer publications={publications} />
        </div>
      </div>
    </>
  );
}
