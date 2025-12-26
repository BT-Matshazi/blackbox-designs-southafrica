"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { Code, Palette, Rocket, Search } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and market position to create a strategic roadmap.",
    duration: "1-2 weeks",
    output: "Clarity report + roadmap",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Design",
    description: "Our designers craft beautiful, intuitive interfaces that align with your brand and engage your users.",
    duration: "2-3 weeks",
    output: "Hi-fi UI kit + UX flows",
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Development",
    description: "We build robust, scalable solutions using cutting-edge technologies and best practices.",
    duration: "4-6 weeks",
    output: "Production-ready build",
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Launch",
    description: "We ensure a smooth deployment and provide ongoing support to help your business grow.",
    duration: "Ongoing",
    output: "Deployment + support",
  },
];

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-muted/20">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <motion.div
        className="absolute -top-40 -right-32 w-[420px] h-[420px] bg-[#D43F52]/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute -bottom-48 -left-40 w-[420px] h-[420px] bg-[#E55A6F]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#D43F52]">
              <span className="h-2 w-2 rounded-full bg-[#D43F52] shadow-[0_0_0_6px_rgba(212,63,82,0.15)]" />
              Precision Process
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl md:text-4xl font-bold">
              Every stage designed to move you forward
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-lg">
              A premium, transparent journey from first call to launch—so you always know what’s happening, why it matters, and what’s next.
            </p>
          </Reveal>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Central spine */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D43F52]/30 to-transparent" />
          <div className="hidden md:block absolute left-1/2 top-8 w-40 -translate-x-1/2 h-20 bg-gradient-to-b from-[#D43F52]/15 to-transparent blur-2xl" />
          <div className="space-y-12 md:space-y-20">
            {steps.map((step, index) => {
              const isRight = index % 2 === 1;
              return (
                <Reveal key={step.title} delay={0.08 * index}>
                  <motion.div
                    className={`relative md:flex md:items-center md:gap-12 ${isRight ? "md:flex-row-reverse" : ""}`}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  >
                    {/* Node */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-card/80 border border-border/60 backdrop-blur shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)]" />
                        <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-[#D43F52] to-[#E55A6F] shadow-[0_0_0_10px_rgba(212,63,82,0.18)]" />
                        <div className="absolute inset-0 animate-ping rounded-full bg-[#D43F52]/12" />
                      </div>
                    </div>

                    <div className={`relative md:w-1/2 ${isRight ? "md:pl-12" : "md:pr-12"}`}>
                      <motion.div
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-8 shadow-[0_20px_70px_-40px_rgba(212,63,82,0.5)]"
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 180, damping: 18 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D43F52]/6 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex items-center justify-between gap-3 mb-6">
                          <div className="inline-flex items-center gap-2 rounded-full bg-[#D43F52]/12 text-[#D43F52] px-4 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase">
                            <span className="h-2 w-2 rounded-full bg-[#D43F52]" />
                            Phase {index + 1}
                          </div>
                          <span className="text-xs text-muted-foreground bg-background/60 border border-border/60 rounded-full px-3 py-1">
                            {step.duration}
                          </span>
                        </div>

                        <div className="flex items-start gap-4">
                          <motion.div
                            className="p-4 rounded-xl bg-gradient-to-br from-[#D43F52]/10 to-[#E55A6F]/6 text-[#D43F52] shadow-inner"
                            whileHover={{ rotate: 6 }}
                            transition={{ duration: 0.3 }}
                          >
                            {step.icon}
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-2 text-sm text-muted-foreground">
                            <Rocket className="h-4 w-4 text-[#D43F52]" />
                            {step.output}
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-r from-[#D43F52]/30 via-[#E55A6F]/30 to-transparent" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
