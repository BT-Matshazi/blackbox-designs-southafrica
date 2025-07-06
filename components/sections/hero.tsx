"use client";

import Cubes from "@/components/ui/cubes";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MousePointer, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/animated-background";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex items-center min-h-screen overflow-hidden"
    >
      {/* Elegant Animated Background */}
      <AnimatedBackground />
      <div className="absolute inset-0 z-0 hidden md:block">
        <Cubes
          gridSize={12}
          maxAngle={60}
          radius={5}
          borderStyle="2px dashed #e55a6f"
          faceColor="#e55a6f/20"
          rippleColor="#e55a6f"
          rippleSpeed={1.8}
          autoAnimate={true}
          rippleOnClick={true}
        />
      </div>
      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-20"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="space-y-8">
            {/* Premium Badge */}
            <motion.div
              className="lg:inline-flex hidden items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D43F52]/10 to-[#D43F52]/5 border border-[#D43F52]/20 backdrop-blur-sm"
              variants={itemVariants}
            >
              <Star className="h-4 w-4 text-[#D43F52]" />
              <span className="text-sm font-medium bg-gradient-to-r from-[#D43F52] to-[#D43F52]/80 bg-clip-text text-transparent">
                Premium Design Solutions
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl font-bold leading-tight sm:text-6xl md:text-7xl"
              variants={itemVariants}
            >
              <motion.span
                className="inline-block"
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                Black
              </motion.span>
              <motion.span
                className="text-white text-stroke-3 inline-block ml-3"
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                Box
              </motion.span>
              <motion.span
                className="inline-block ml-3"
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                Designs
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
              variants={itemVariants}
            >
              Crafting exceptional digital experiences through innovative design
              and
              <span className="bg-gradient-to-r from-[#D43F52] to-[#E55A6F] bg-clip-text text-transparent font-medium">
                {" "}
                strategic creativity
              </span>{" "}
              that elevate your brand to new heights.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
              variants={itemVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  size="lg"
                  className="group border-2 border-accent bg-gradient-to-r from-[#D43F52] to-[#E55A6F] hover:from-[#C23648] hover:to-[#D43F52] px-8 py-6 text-lg font-semibold shadow-lg shadow-[#D43F52]/25 text-white"
                >
                  <motion.span className="flex items-center">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 hover:border-[#D43F52] hover:bg-[#D43F52]/5 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
                >
                  <motion.span>View Portfolio</motion.span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="pt-16 hidden lg:flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <motion.div
                className="flex flex-col items-center text-muted-foreground cursor-pointer group"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1 }}
              >
                <MousePointer className="h-6 w-6 mb-2 group-hover:text-[#D43F52] transition-colors" />
                <span className="text-sm group-hover:text-[#D43F52] transition-colors">
                  Explore Our Work
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
