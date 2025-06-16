"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { Project } from "@/src/application/domain/project.domain";
import Link from "next/link";

export function PortfolioSection({ projects }: { projects: Project[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Extract unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    projects.forEach((project) => {
      project.project_categories.forEach((category) => {
        uniqueCategories.add(category.name);
      });
    });
    return ["All", ...Array.from(uniqueCategories)];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }
    return projects.filter((project) =>
      project.project_categories.some(
        (category) => category.name === activeCategory
      )
    );
  }, [projects, activeCategory]);

  return (
    <section id="portfolio" className="py-1.2">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
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
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              No projects match the selected category. Try selecting a different
              category.
            </p>
          </motion.div>
        )}

        {filteredProjects.length > 0 && filteredProjects.length < projects.length && (
          <div className="text-center mt-16">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 rounded-full border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
              onClick={() => setActiveCategory("All")}
            >
              Show All Projects
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
