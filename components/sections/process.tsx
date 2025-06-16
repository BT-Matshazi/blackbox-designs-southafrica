"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { Code, Palette, Rocket, Search } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and market position to create a strategic roadmap.",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Design",
    description: "Our designers craft beautiful, intuitive interfaces that align with your brand and engage your users.",
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Development",
    description: "We build robust, scalable solutions using cutting-edge technologies and best practices.",
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Launch",
    description: "We ensure a smooth deployment and provide ongoing support to help your business grow.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We follow a proven methodology to deliver exceptional results for
              every project.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={0.1 * index}>
              <motion.div
                className="relative bg-card p-6 rounded-xl border border-border text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}