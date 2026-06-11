"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Code, Palette, Rocket, Search } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-6 w-6" />,
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your business goals, target audience, and market position to create a strategic roadmap.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    number: "02",
    title: "Design",
    description:
      "Our designers craft beautiful, intuitive interfaces that align with your brand and engage your users.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    number: "03",
    title: "Development",
    description:
      "We build robust, scalable solutions using cutting-edge technologies and best practices.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    number: "04",
    title: "Launch",
    description:
      "We ensure a smooth deployment and provide ongoing support to help your business grow.",
  },
];

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="How We Work"
          title="Our Process"
          lede="We follow a proven methodology to deliver exceptional results for every project."
        />

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting rail on large screens */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-border lg:block"
          />

          {steps.map((step, index) => (
            <Reveal key={step.title} width="100%" delay={0.1 * index}>
              <motion.div
                className="group relative h-full rounded-xl border border-border bg-card p-7 transition-colors duration-300 hover:border-accent/50"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                {/* Ghost step number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-5 top-4 font-display text-5xl font-bold text-border transition-colors duration-300 group-hover:text-accent/20"
                >
                  {step.number}
                </span>

                <div className="mb-5 inline-flex rounded-lg bg-accent/10 p-3 text-accent">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Crimson tick that grows on hover */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-7 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-12"
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
