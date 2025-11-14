import { Reveal } from "@/components/reveal";
import { CaseStudyCard } from "@/components/case-study-card";
import { caseStudies } from "@/lib/data/case-studies";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils/metadata";
import { SEO_CONFIG } from "@/lib/config/seo-config";
import type { Metadata } from "next";

// Generate metadata for case studies page
export const metadata: Metadata = generateSEOMetadata({
  title: "Case Studies | Success Stories & Results",
  description:
    "Explore our portfolio of successful web development and design projects. Real case studies with measurable results: 40% conversion increases, 200% revenue growth, and more. See how we've helped businesses transform their digital presence.",
  keywords: [
    "web development case studies",
    "design portfolio South Africa",
    "client success stories",
    "website redesign results",
    "e-commerce case studies",
    "mobile app success stories",
    "Johannesburg web projects",
    "digital transformation examples",
  ],
  canonical: `${SEO_CONFIG.siteUrl}/case-studies`,
});

export default function CaseStudiesPage() {
  const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);
  const otherCaseStudies = caseStudies.filter((cs) => !cs.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Case Studies
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-xl text-muted-foreground mb-8">
                Real results from real projects. Explore how we've helped
                businesses across South Africa transform their digital presence
                and achieve measurable success.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D43F52]">
                    {caseStudies.length}+
                  </div>
                  <div className="text-muted-foreground">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D43F52]">150%</div>
                  <div className="text-muted-foreground">Avg Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D43F52]">98%</div>
                  <div className="text-muted-foreground">
                    Client Satisfaction
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      {featuredCaseStudies.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Featured Projects
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCaseStudies.map((caseStudy, index) => (
                <CaseStudyCard
                  key={caseStudy.id}
                  caseStudy={caseStudy}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Case Studies */}
      {otherCaseStudies.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">
                  More Success Stories
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherCaseStudies.map((caseStudy, index) => (
                <CaseStudyCard
                  key={caseStudy.id}
                  caseStudy={caseStudy}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#D43F52]/5 to-muted/30 rounded-3xl p-12 border border-border">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Be Our Next Success Story?
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how we can help you achieve similar results. Get a
                free consultation and project quote today.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#D43F52] to-[#E55A6F] hover:from-[#C23648] hover:to-[#D43F52] rounded-lg shadow-lg shadow-[#D43F52]/25 transition-all duration-300 hover:scale-105"
              >
                Start Your Project
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
