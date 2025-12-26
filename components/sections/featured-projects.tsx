"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { Project } from "@/src/application/domain/project.domain";
import { useMemo } from "react";
import { ProjectCard } from "@/components/project-card";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const getDomain = (url?: string | null) => {
    if (!url) return undefined;
    try {
      return new URL(url).hostname;
    } catch {
      return undefined;
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => project.isFeatured);
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
          .slice(0,3)
          .map((project, index) => (
            <Reveal key={project.id} delay={0.05 * index}>
              <ProjectCard
                title={project.name}
                image={project.cardImage.url}
                href={project.siteUrl ?? undefined}
                featured={project.isFeatured}
                categories={project.project_categories}
                meta={project.siteUrl ? new URL(project.siteUrl).hostname : undefined}
                className="h-full"
              />
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
