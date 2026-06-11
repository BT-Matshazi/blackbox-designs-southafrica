"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { Project } from "@/src/application/domain/project.domain";
import { useMemo } from "react";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
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
              <ProjectCard project={project} />
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
