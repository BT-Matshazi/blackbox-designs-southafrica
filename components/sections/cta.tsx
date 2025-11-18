"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ArrowRight, CheckCircle, Sparkles, Calendar } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D43F52]/5 via-background to-background" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Premium badge */}
          <Reveal>
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  Limited Offer - 5 Spots Remaining This Month
                </span>
              </div>
            </div>
          </Reveal>

          {/* Main CTA Content */}
          <div className="text-center mb-8">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Get a Free Website Audit
              </h2>
              <div className="inline-flex items-baseline gap-2 mb-6">
                <span className="text-2xl md:text-3xl font-bold text-[#D43F52]">
                  Worth R5,000
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  R5,000
                </span>
                <span className="px-3 py-1 bg-[#D43F52]/10 text-[#D43F52] text-sm font-semibold rounded-full">
                  FREE
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Discover exactly what's holding your website back from generating more leads.
                Get a comprehensive analysis with actionable recommendations to boost conversions by 30%+.
              </p>
            </Reveal>

            {/* Benefits list */}
            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-5 w-5 text-[#D43F52] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Conversion Analysis</p>
                    <p className="text-xs text-muted-foreground">Identify drop-off points</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-5 w-5 text-[#D43F52] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">SEO Opportunities</p>
                    <p className="text-xs text-muted-foreground">Boost search rankings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-5 w-5 text-[#D43F52] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Performance Report</p>
                    <p className="text-xs text-muted-foreground">Speed & mobile UX</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-[#D43F52] to-[#E55A6F] hover:from-[#C23648] hover:to-[#D43F52] px-8 py-6 text-lg font-semibold shadow-lg shadow-[#D43F52]/25 text-white"
                  >
                    Claim Your Free Audit
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href="/case-studies">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 hover:border-[#D43F52] hover:bg-[#D43F52]/5 px-8 py-6 text-lg font-semibold"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    See Sample Report
                  </Button>
                </Link>
              </div>
            </Reveal>

            {/* Trust indicator */}
            <Reveal delay={0.4}>
              <p className="text-sm text-muted-foreground mt-6">
                🔒 No credit card required • Response within 24 hours • 100% confidential
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Animated background blobs */}
      <motion.div
        className="absolute -bottom-48 -left-48 w-96 h-96 bg-[#D43F52]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -top-48 -right-48 w-96 h-96 bg-[#E55A6F]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
    </section>
  );
}