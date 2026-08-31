import { AboutSection } from "@/components/sections/about";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils/metadata";
import { PAGE_METADATA, SEO_CONFIG } from "@/lib/config/seo-config";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: PAGE_METADATA.about.title,
  description: PAGE_METADATA.about.description,
  keywords: PAGE_METADATA.about.keywords,
  canonical: `${SEO_CONFIG.siteUrl}/about`,
});

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full pt-24">
      <AboutSection />
    </div>
  );
}