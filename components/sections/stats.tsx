"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { TrendingUp, Target, Clock, ThumbsUp } from "lucide-react";

const stats = [
  {
    icon: <Target className="h-8 w-8" />,
    value: "98%",
    label: "Client Satisfaction",
    description: "Our clients love working with us",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    value: "150%",
    label: "Average ROI",
    description: "Return on investment for clients",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    value: "2 Weeks",
    label: "Avg. Delivery Time",
    description: "Fast turnaround for projects",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: <ThumbsUp className="h-8 w-8" />,
    value: "100%",
    label: "On-Time Delivery",
    description: "We always meet deadlines",
    gradient: "from-purple-500 to-pink-500",
  },
];

export function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#D43F52]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
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
              Proven Track Record
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our commitment to excellence is reflected in these impressive
              metrics that showcase our dedication to client success.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={0.1 * index}>
              <motion.div
                className="relative group"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-lg relative overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white mb-4 shadow-lg`}>
                    {stat.icon}
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <motion.h3
                      className="text-4xl font-bold mb-1"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </span>
                    </motion.h3>
                  </div>

                  {/* Label */}
                  <h4 className="text-lg font-semibold mb-2">{stat.label}</h4>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>

                  {/* Decorative line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
