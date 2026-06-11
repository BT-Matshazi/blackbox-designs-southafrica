"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";
import { Project } from "@/src/application/domain/project.domain";
import { useMemo, useState } from "react";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => project.isFeatured);
  }, [projects]);

  return (
    <section className="border-t border-border bg-muted/40 py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Projects"
          lede="Discover how we've helped businesses transform their digital presence with innovative solutions."
        />

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.slice(0, 2).map((project, index) => (
            <Reveal key={project.id} width="100%" delay={0.05 * index}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-accent/5"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Featured Badge */}
                {project.isFeatured && (
                  <div className="absolute right-4 top-4 z-40">
                    <Badge className="border-0 bg-accent text-accent-foreground shadow-md">
                      <Star className="mr-1 h-3 w-3 fill-current" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative h-60 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <img
                      src={project.cardImage.url}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>

                  {/* Categories Overlay */}
                  <div className="absolute left-4 top-4 z-30">
                    <div className="flex flex-wrap gap-1">
                      {project.project_categories.slice(0, 2).map((category) => (
                        <Badge
                          key={category.id}
                          variant="secondary"
                          className="border-0 bg-background/90 text-xs text-foreground shadow-sm backdrop-blur-sm"
                        >
                          {category.name}
                        </Badge>
                      ))}
                      {project.project_categories.length > 2 && (
                        <Badge
                          variant="secondary"
                          className="border-0 bg-background/90 text-xs text-foreground shadow-sm backdrop-blur-sm"
                        >
                          +{project.project_categories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div className="space-y-4 p-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-accent">
                      {project.name}
                    </h3>

                    {project.siteUrl && (
                      <p className="truncate text-sm text-muted-foreground">
                        {new URL(project.siteUrl).hostname}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex gap-2 pt-2"
                    initial={{ opacity: 0.7, y: 10 }}
                    animate={
                      hoveredIndex === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0.7, y: 10 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {project.siteUrl ? (
                      <Link
                        href={project.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button size="sm" className="group/btn w-full">
                          Visit Site
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                        </Button>
                      </Link>
                    ) : (
                      <Button size="sm" className="w-full" disabled>
                        No Link Available
                      </Button>
                    )}
                  </motion.div>
                </div>

                {/* Subtle Hover Glow Effect */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Reveal width="100%">
            <Button
              variant="outline-accent"
              size="lg"
              asChild
              className="h-12 px-8 text-base"
            >
              <Link href="/portfolio">
                Explore Our Portfolio
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
