import { HeroSection } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ProcessSection } from "@/components/sections/process";
import { CTASection } from "@/components/sections/cta";

import { ServicesHighlight } from "@/components/sections/services-highlight";
import { getProjectsController } from "@/src/presentation/controllers/product.controller";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils/metadata";
import { PAGE_METADATA, SEO_CONFIG } from "@/lib/config/seo-config";
import {
  getServiceSchema,
  getBreadcrumbSchema,
  getHomePageFAQs,
  getAggregateRatingSchema,
  getProfessionalServiceSchema,
  getServicesItemListSchema,
} from "@/lib/utils/structured-data";
import Script from "next/script";
import type { Metadata } from "next";

// Generate metadata for home page
export const metadata: Metadata = generateSEOMetadata({
  title: PAGE_METADATA.home.title,
  description: PAGE_METADATA.home.description,
  keywords: PAGE_METADATA.home.keywords,
  canonical: SEO_CONFIG.siteUrl,
});

export default async function Home() {
  const { success, data } = await getProjectsController();

  // Generate structured data
  const serviceSchema = getServiceSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SEO_CONFIG.siteUrl },
  ]);
  const faqSchema = getHomePageFAQs();
  const ratingSchema = getAggregateRatingSchema();
  const professionalServiceSchema = getProfessionalServiceSchema();
  const servicesItemListSchema = getServicesItemListSchema();

  return (
    <>
      {/* Structured Data Schemas for Home Page */}
      <Script
        id="home-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Script
        id="home-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Script
        id="home-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="home-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ratingSchema),
        }}
      />
      <Script
        id="home-professional-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <Script
        id="home-services-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesItemListSchema),
        }}
      />

      <div className="flex flex-col w-full">
        <HeroSection />
        <ServicesHighlight />
        {!success || !data ? <></> : <FeaturedProjects projects={data} />}
        <ProcessSection />
        <CTASection />
        {/* <TestimonialsSection /> */}
      </div>
    </>
  );
}
