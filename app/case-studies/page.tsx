import { Reveal } from "@/components/reveal";
import { CaseStudyCard } from "@/components/case-study-card";
import { caseStudies } from "@/lib/data/case-studies";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils/metadata";
import { SEO_CONFIG } from "@/lib/config/seo-config";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-b from-muted/40 via-background to-background">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px]" />
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#D43F52]/12 blur-3xl" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#E55A6F]/14 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#D43F52]">
                <span className="h-2 w-2 rounded-full bg-[#D43F52] shadow-[0_0_0_6px_rgba(212,63,82,0.15)]" />
                Case Studies
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Proof that design & engineering deliver business outcomes
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore how we ship high-performing web experiences—improving conversion, speed, and usability for teams that need measurable results.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {[
                  { label: "Success Stories", value: `${caseStudies.length}+` },
                  { label: "Avg Growth", value: "150%" },
                  { label: "Client Satisfaction", value: "98%" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow-[0_20px_60px_-50px_rgba(212,63,82,0.6)]"
                  >
                    <div className="text-3xl font-bold text-[#D43F52]">
                      {item.value}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-[#D43F52] to-[#E55A6F] hover:from-[#C23648] hover:to-[#D43F52] shadow-lg shadow-[#D43F52]/25 px-8">
                  <Link href="/contact">Start a project</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="px-8 border-border/80">
                  <Link href="/portfolio">View portfolio</Link>
                </Button>
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
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Featured builds
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#D43F52]/40 via-border to-transparent" />
                </div>
                <p className="text-muted-foreground max-w-xl">
                  High-impact case studies that showcase conversions, performance gains, and elevated UX across different industries.
                </p>
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
              <div className="flex items-center gap-3 mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">
                  More success stories
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-[#D43F52]/30 via-border to-transparent" />
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
    </div>
  );
}
