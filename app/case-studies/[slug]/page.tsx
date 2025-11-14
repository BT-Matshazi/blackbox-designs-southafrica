import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/sections/case-study-detail";
import { caseStudies } from "@/lib/data/case-studies";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils/metadata";
import { SEO_CONFIG } from "@/lib/config/seo-config";
import type { Metadata } from "next";

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all case studies
export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

// Generate metadata for each case study
export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return generateSEOMetadata({
    title: caseStudy.title,
    description: caseStudy.excerpt,
    keywords: [
      caseStudy.industry,
      caseStudy.projectType,
      ...caseStudy.services,
      "case study",
      "success story",
      "client project",
      caseStudy.client,
    ],
    canonical: `${SEO_CONFIG.siteUrl}/case-studies/${caseStudy.slug}`,
    ogImage: caseStudy.heroImage.url,
  });
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetail caseStudy={caseStudy} />;
}
