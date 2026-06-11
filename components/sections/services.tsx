"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import {
  Code,
  Palette,
  Smartphone,
  ShoppingCart,
  Lightbulb,
  Layers,
  PieChart,
  UsersRound,
  Trophy,
} from "lucide-react";

const services = [
  {
    icon: <Code className="h-10 w-10" />,
    title: "Web Development",
    description:
      "Custom websites and web applications built with the latest technologies and best practices for performance and security.",
  },
  {
    icon: <Palette className="h-10 w-10" />,
    title: "UX/UI Design",
    description:
      "User-centered designs that create intuitive, accessible, and engaging digital experiences across all platforms.",
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications designed for seamless user experiences on iOS and Android.",
  },
  {
    icon: <ShoppingCart className="h-10 w-10" />,
    title: "E-Commerce Solutions",
    description:
      "Custom online stores with secure payment gateways, inventory management, and optimized conversion funnels.",
  },
  {
    icon: <Lightbulb className="h-10 w-10" />,
    title: "Digital Strategy",
    description:
      "Strategic planning to align your digital presence with business goals and maximize your online potential.",
  },
  {
    icon: <PieChart className="h-10 w-10" />,
    title: "Analytics & SEO",
    description:
      "Data-driven optimization to improve search visibility and track performance across all digital channels.",
  },
];

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="border-t border-border bg-muted/40 py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              className="h-full"
              delay={0.1 * index}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <motion.div
                className="group h-full rounded-xl border border-border bg-card p-8 transition-colors duration-300 hover:border-accent/50"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="mb-6 inline-flex rounded-lg bg-accent/10 p-3 text-accent"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Reveal>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Why Choose Blackbox Designs?
                  </h3>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-muted-foreground mb-6">
                    We combine strategic thinking, technical expertise, and
                    creative design to deliver exceptional results for our
                    clients.
                  </p>
                </Reveal>

                <div className="space-y-4">
                  {[
                    {
                      icon: <Layers className="h-5 w-5" />,
                      text: "Personalized approach for every project",
                    },
                    {
                      icon: <UsersRound className="h-5 w-5" />,
                      text: "Experienced team of specialists",
                    },
                    {
                      icon: <Trophy className="h-5 w-5" />,
                      text: "Award-winning designs and implementations",
                    },
                  ].map((item, i) => (
                    <Reveal key={i} delay={0.2 + i * 0.1}>
                      <div className="flex items-center">
                        <div className="mr-3 rounded-md bg-accent/10 p-1.5 text-accent">
                          {item.icon}
                        </div>
                        <p>{item.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Reveal direction="right">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Team working together"
                      className="w-full object-cover rounded-lg"
                      style={{ height: "400px" }}
                    />
                    <div className="absolute inset-0 rounded-lg bg-primary/15" />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
