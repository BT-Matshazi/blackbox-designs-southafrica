"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/src/application/domain/project.domain";

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ProjectCard({ project }: { project: Project }) {
  const hasLink = Boolean(project.siteUrl);
  const categories = project.project_categories ?? [];

  const card = (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[box-shadow,border-color] duration-500 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={project.cardImage?.url}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {/* Legibility wash + crimson tint on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10" />

        {/* Featured ribbon (top-left, clear of the hover arrow) */}
        {project.isFeatured && (
          <Badge className="absolute left-4 top-4 border-0 bg-accent text-accent-foreground shadow-md">
            <Star className="mr-1 h-3 w-3 fill-current" />
            Featured
          </Badge>
        )}

        {/* Hover affordance — the "open" cue */}
        {hasLink && (
          <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-accent text-accent-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {categories.slice(0, 3).map((category) => (
              <span
                key={category.id}
                className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted-foreground"
              >
                {category.name}
              </span>
            ))}
            {categories.length > 3 && (
              <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted-foreground">
                +{categories.length - 3}
              </span>
            )}
          </div>
        )}

        <h3 className="text-lg font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-accent">
          {project.name}
        </h3>

        <div className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium">
          {hasLink ? (
            <>
              <span className="truncate text-muted-foreground transition-colors group-hover:text-accent">
                {getHostname(project.siteUrl)}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          ) : (
            <span className="text-muted-foreground">Case study coming soon</span>
          )}
        </div>
      </div>
    </motion.article>
  );

  if (!hasLink) return card;

  return (
    <Link
      href={project.siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.name}`}
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      {card}
    </Link>
  );
}
