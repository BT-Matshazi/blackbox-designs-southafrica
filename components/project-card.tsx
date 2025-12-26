"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles, Star } from "lucide-react";
import Link from "next/link";

type ProjectCategory = {
  id?: string | number;
  name: string;
};

type ProjectCardProps = {
  title: string;
  image: string;
  href?: string;
  featured?: boolean;
  categories?: ProjectCategory[];
  meta?: string;
  ctaLabel?: string;
  className?: string;
};

export function ProjectCard({
  title,
  image,
  href,
  featured,
  categories = [],
  meta,
  ctaLabel = "View Project",
  className = "",
}: ProjectCardProps) {
  return (
    <motion.article
      className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-[0_20px_70px_-50px_rgba(212,63,82,0.8)] ${className}`}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* glow overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#D43F52]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="pointer-events-none absolute -top-16 -left-10 h-32 w-32 rounded-full bg-[#D43F52]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-10 h-28 w-28 rounded-full bg-[#E55A6F]/12 blur-3xl" />

      {featured && (
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-gradient-to-r from-[#D43F52] to-[#E55A6F] text-white border-0 shadow-lg">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Featured
          </Badge>
        </div>
      )}

      <div className="relative h-60 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        {categories.length > 0 && (
          <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2">
            {categories.slice(0, 3).map((category) => (
              <Badge
                key={category.id ?? category.name}
                variant="secondary"
                className="text-[11px] bg-white/90 text-gray-800 backdrop-blur-sm border-0 shadow-sm"
              >
                {category.name}
              </Badge>
            ))}
            {categories.length > 3 && (
              <Badge
                variant="secondary"
                className="text-[11px] bg-white/90 text-gray-800 backdrop-blur-sm border-0 shadow-sm"
              >
                +{categories.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="p-6 space-y-4 relative z-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#D43F52] font-semibold">
          <Sparkles className="h-4 w-4" />
          Case Study
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold leading-tight">{title}</h3>
          {meta && (
            <p className="text-sm text-muted-foreground">{meta}</p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-1">
          {href ? (
            <Link href={href} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button
                size="sm"
                className="w-full group/btn bg-gradient-to-r from-[#D43F52] to-[#E55A6F] hover:from-[#C23648] hover:to-[#D43F52] text-white border-0 shadow-md"
              >
                {ctaLabel}
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            </Link>
          ) : (
            <Button
              size="sm"
              className="w-full bg-muted/60 text-muted-foreground"
              disabled
            >
              Preview unavailable
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
