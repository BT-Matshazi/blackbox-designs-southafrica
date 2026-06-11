"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/src/application/domain/project.domain";

export function PortfolioSection({ projects }: { projects: Project[] }) {
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
    <section id="portfolio" className="pb-28">
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
              <Reveal key={project.id} width="100%" delay={0.05 * index}>
                <ProjectCard project={project} />
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
