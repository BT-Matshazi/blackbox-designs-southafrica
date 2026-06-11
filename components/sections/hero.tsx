"use client";

import { Hero } from "@/components/ui/hero";
import type { HeroAction } from "@/components/ui/hero";

const heroActions: HeroAction[] = [
  { label: "Start Your Project", href: "/contact", variant: "default" },
  { label: "View Portfolio", href: "/portfolio", variant: "outline" },
];

const heroTags = [
  "Web Development",
  "UX/UI Design",
  "Mobile Apps",
  "E-Commerce",
];

export function HeroSection() {
  return (
    <Hero
      eyebrow="Digital Studio — Johannesburg"
      title={
        <>
          Black{" "}
          <span className="relative -rotate-2 inline-block rounded-xl bg-primary px-4 py-1 text-primary-foreground shadow-[6px_6px_0_0_var(--accent)]">
            Box
          </span>{" "}
          Designs
        </>
      }
      subtitle="Crafting exceptional digital experiences through innovative design and strategic creativity that elevate your brand to new heights."
      actions={heroActions}
      tags={heroTags}
      subtitleClassName="max-w-[640px]"
    />
  );
}
