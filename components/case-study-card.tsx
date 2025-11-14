"use client";

import { motion } from "framer-motion";
import { CaseStudy } from "@/src/application/domain/case-study.domain";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

export function CaseStudyCard({ caseStudy, index = 0 }: CaseStudyCardProps) {
  return (
    <motion.div
      className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Featured Badge */}
      {caseStudy.featured && (
        <div className="absolute top-4 right-4 z-30">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
            Featured
          </Badge>
        </div>
      )}

      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={caseStudy.heroImage.url}
            alt={caseStudy.heroImage.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>

        {/* Industry Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-[#D43F52] text-white border-0 shadow-lg">
            {caseStudy.industry}
          </Badge>
        </div>

        {/* Key Metric Overlay */}
        {caseStudy.metrics.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[#D43F52]">
                  {caseStudy.metrics[0].value}
                </div>
                <div className="text-xs text-gray-600">
                  {caseStudy.metrics[0].label}
                </div>
              </div>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {caseStudy.metrics[0].change}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold leading-tight group-hover:text-[#D43F52] transition-colors duration-300 line-clamp-2">
            {caseStudy.client} - {caseStudy.projectType}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {caseStudy.duration} • {caseStudy.completedDate}
          </p>
        </div>

        {/* Excerpt */}
        <p className="text-muted-foreground line-clamp-3">
          {caseStudy.excerpt}
        </p>

        {/* Results Preview */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {caseStudy.results.slice(0, 3).map((result, idx) => (
            <div
              key={idx}
              className="text-center p-2 bg-muted/50 rounded-lg"
            >
              <div className="text-sm font-bold text-[#D43F52]">
                {result.value}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {result.metric}
              </div>
            </div>
          ))}
        </div>

        {/* Services Tags */}
        <div className="flex flex-wrap gap-2">
          {caseStudy.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="outline" className="text-xs">
              {service}
            </Badge>
          ))}
          {caseStudy.services.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{caseStudy.services.length - 3} more
            </Badge>
          )}
        </div>

        {/* CTA Button */}
        <Link href={`/case-studies/${caseStudy.slug}`} className="block">
          <Button
            className="w-full group/btn bg-gradient-to-r from-[#D43F52] to-[#E55A6F] hover:from-[#C23648] hover:to-[#D43F52]"
            size="lg"
          >
            View Case Study
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D43F52]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
