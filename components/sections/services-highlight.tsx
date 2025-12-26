"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { Code2, Smartphone, Palette, Megaphone, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Web Development",
    description:
      "Custom websites and web applications built with cutting-edge technologies for optimal performance.",
    color: "from-[#D43F52] to-[#E55A6F]",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that deliver seamless user experiences.",
    color: "from-[#D43F52] to-[#E55A6F]",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces that engage users and drive conversions.",
    color: "from-[#D43F52] to-[#E55A6F]",
  },
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "Custom Software",
    description:
      "Tailored software solutions designed to solve your unique business challenges.",
    color: "from-[#D43F52] to-[#E55A6F]",
  },
  {
    icon: <Megaphone className="h-8 w-8" />,
    title: "Digital Marketing",
    description:
      "Strategic marketing campaigns that boost your online presence and drive growth.",
    color: "from-[#D43F52] to-[#E55A6F]",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Brand Strategy",
    description:
      "Comprehensive branding solutions that make your business stand out from the crowd.",
    color: "from-[#D43F52] to-[#E55A6F]",
  },
];

export function ServicesHighlight() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        className="absolute -top-48 -right-48 w-96 h-96 bg-[#D43F52]/5 rounded-full blur-3xl"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From concept to launch, we provide comprehensive digital solutions
              tailored to your business needs.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={0.05 * index}>
              <motion.div
                className="group relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-[#D43F52]/50 transition-all duration-500 shadow-lg hover:shadow-xl"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Icon container */}
                <div className="mb-6 relative">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-2xl rounded-full transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#D43F52] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative gradient bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`} />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Reveal delay={0.3}>
            <Link href="/services">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-[#D43F52] to-[#E55A6F] hover:from-[#C23648] hover:to-[#D43F52] px-8 py-6 text-lg font-semibold shadow-lg shadow-[#D43F52]/25"
              >
                View All Services
                <motion.svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
              </Button>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
