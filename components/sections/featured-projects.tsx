"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { Project } from "@/src/application/domain/project.domain";
import { useMemo, useState } from "react";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    // Filter projects based on selected category
    const filteredProjects = useMemo(() => {
      return projects.filter((project) =>
        project.isFeatured
      );
    }, [projects]);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover how we've helped businesses transform their digital
              presence with innovative solutions.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects
          .slice(0,2)
          .map((project, index) => (
            <Reveal key={project.id} delay={0.05 * index}>
              <motion.div
                className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500"
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Featured Badge */}
                {project.isFeatured && (
                  <div className="absolute top-4 right-4 z-40">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative h-60 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    // whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <img
                      src={project.cardImage.url}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  {/* Categories Overlay */}
                  <div className="absolute top-4 left-4 z-30">
                    <div className="flex flex-wrap gap-1">
                      {project.project_categories
                        .slice(0, 2)
                        .map((category) => (
                          <Badge
                            key={category.id}
                            variant="secondary"
                            className="text-xs bg-white/90 text-gray-800 backdrop-blur-sm border-0 shadow-sm"
                          >
                            {category.name}
                          </Badge>
                        ))}
                      {project.project_categories.length > 2 && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-white/90 text-gray-800 backdrop-blur-sm border-0 shadow-sm"
                        >
                          +{project.project_categories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 space-y-4">
                  {/* Project Title */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                      {project.name}
                    </h3>

                    {/* Project URL Preview */}
                    {project.siteUrl && (
                      <p className="text-sm text-muted-foreground truncate">
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
                        <Button
                          size="sm"
                          className="w-full group/btn bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary border-0 shadow-sm"
                        >
                          Visit Site
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full group/btn bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary border-0 shadow-sm"
                        disabled
                      >
                        No Link Available
                      </Button>
                    )}
                  </motion.div>
                </div>

                {/* Subtle Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Reveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-accent rounded-lg border  border-accent hover:bg-accent hover:text-white focus:ring-4 focus:ring-accent focus:ring-opacity-50 transition-all duration-3"
            >
              Explore Our Portfolio
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}