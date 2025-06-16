"use client";

import React, { ReactNode } from "react";
import { motion, Variant } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
};

export function Reveal({
  children,
  width = "fit-content",
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
}: RevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  const variants = {
    hidden: getDirectionVariant(direction, true),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden", width === "100%" ? "w-full" : "", className)}
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        className={width === "100%" ? "w-full" : ""}
      >
        {children}
      </motion.div>
    </div>
  );
}

function getDirectionVariant(direction: Direction, hidden: boolean): Variant {
  const distance = 50;
  switch (direction) {
    case "up":
      return { opacity: hidden ? 0 : 1, y: hidden ? distance : 0 };
    case "down":
      return { opacity: hidden ? 0 : 1, y: hidden ? -distance : 0 };
    case "left":
      return { opacity: hidden ? 0 : 1, x: hidden ? distance : 0 };
    case "right":
      return { opacity: hidden ? 0 : 1, x: hidden ? -distance : 0 };
    default:
      return { opacity: hidden ? 0 : 1, y: hidden ? distance : 0 };
  }
}