"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { CaseStudy } from "@/src/application/domain/case-study.domain";
import {
  ArrowRight,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

export function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <Badge className="bg-[#D43F52] text-white px-4 py-1">
                  {caseStudy.industry}
                </Badge>
                <Badge variant="outline" className="px-4 py-1">
                  {caseStudy.projectType}
                </Badge>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {caseStudy.title}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-muted-foreground mb-8">
                {caseStudy.excerpt}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>
                    <strong>Client:</strong> {caseStudy.client}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    <strong>Duration:</strong> {caseStudy.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    <strong>Completed:</strong> {caseStudy.completedDate}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {caseStudy.metrics.map((metric, index) => (
              <Reveal key={metric.label} delay={0.1 * index}>
                <motion.div
                  className="bg-card p-6 rounded-2xl border border-border text-center"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#D43F52] mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-green-600 font-semibold">
                    {metric.change}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      {caseStudy.beforeImage && caseStudy.afterImage && (
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Before & After
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    See the transformation for yourself. Drag the slider to
                    compare.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <BeforeAfterSlider
                  beforeImage={caseStudy.beforeImage.url}
                  afterImage={caseStudy.afterImage.url}
                />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Challenge */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  The Challenge
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="text-2xl font-semibold mb-4">
                {caseStudy.challenge.title}
              </h3>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {caseStudy.challenge.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#D43F52]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#D43F52]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Our Solution
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="text-2xl font-semibold mb-4">
                {caseStudy.solution.title}
              </h3>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {caseStudy.solution.description}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-card border border-border rounded-2xl p-8">
                <h4 className="text-xl font-semibold mb-6">Key Features</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {caseStudy.solution.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#D43F52] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Technologies Used
              </h3>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-wrap justify-center gap-3">
                {caseStudy.technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-4 py-2 text-sm font-medium"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                The Results
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6">
              {caseStudy.results.map((result, index) => (
                <Reveal key={result.metric} delay={0.1 * index}>
                  <motion.div
                    className="bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl p-8"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-4xl font-bold text-[#D43F52] mb-2">
                      {result.value}
                    </div>
                    <h4 className="text-xl font-semibold mb-3">
                      {result.metric}
                    </h4>
                    <p className="text-muted-foreground">
                      {result.description}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-gradient-to-br from-[#D43F52]/5 to-muted/30 relative overflow-hidden">
        <div className="absolute top-10 right-10 opacity-10">
          <Quote className="w-64 h-64" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
                <Quote className="w-12 h-12 text-[#D43F52]/20 mb-6" />

                <p className="text-xl md:text-2xl italic mb-8 leading-relaxed">
                  "{caseStudy.testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-[#D43F52]">
                    {caseStudy.testimonial.avatar && (
                      <AvatarImage
                        src={caseStudy.testimonial.avatar}
                        alt={caseStudy.testimonial.author}
                      />
                    )}
                    <AvatarFallback>
                      {caseStudy.testimonial.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="font-bold text-lg">
                      {caseStudy.testimonial.author}
                    </div>
                    <div className="text-muted-foreground">
                      {caseStudy.testimonial.role},{" "}
                      {caseStudy.testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready for Similar Results?
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how we can help transform your digital presence
                and drive real business results.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#D43F52] to-[#E55A6F] hover:from-[#C23648] hover:to-[#D43F52] px-8"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                {caseStudy.websiteUrl && (
                  <Link
                    href={caseStudy.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="outline" className="px-8">
                      View Live Site
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
