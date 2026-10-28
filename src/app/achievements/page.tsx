import { PageIntro } from "@/components/page-intro";
import { CertificateGallery } from "@/components/certificate-gallery";
import { achievements } from "@/content/achievements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Achievements",
  description:
    "Conference presentation and competition results for Sabrim Mahmud, with certificates: NCIM 2025, Crack Dataset 2024 (fifth place) and NDAC 2025.",
  path: "/achievements",
});

export default function AchievementsPage() {
  const sorted = [...achievements].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  return (
    <>
      <PageIntro
        title="Achievements"
        lead="A conference presentation and two university competitions, each shown with its certificate. Each entry says exactly what was awarded: a placing, a presentation, or participation."
      />
      <div className="shell">
        <div className="hang">
          <div className="hang-label hidden lg:block">
            <p>Select a certificate to see it full size. Student ID numbers are blurred.</p>
          </div>
          <CertificateGallery achievements={sorted} />
        </div>
      </div>
    </>
  );
}
