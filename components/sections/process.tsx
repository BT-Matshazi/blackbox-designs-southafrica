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
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <motion.div
        className="absolute -bottom-48 -left-48 w-96 h-96 bg-[#D43F52]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
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

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D43F52]/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={0.1 * index}>
                <motion.div
                  className="relative group"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-[#D43F52]/50 text-center shadow-lg hover:shadow-xl transition-all duration-500 relative">
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#D43F52] to-[#E55A6F] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        className="p-4 rounded-xl bg-gradient-to-br from-[#D43F52]/10 to-[#E55A6F]/5 text-[#D43F52] group-hover:scale-110 transition-transform duration-300 shadow-md"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {step.icon}
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#D43F52] transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D43F52]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D43F52] to-[#E55A6F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
                  </div>

                  {/* Arrow connector (hidden on mobile) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/3 -right-4 w-8 h-8 text-[#D43F52]/30 z-20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}