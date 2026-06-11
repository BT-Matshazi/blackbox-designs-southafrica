"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeroAction {
  label: string;
  href: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: HeroAction[];
  tags?: string[];
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 * i,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      eyebrow,
      title,
      subtitle,
      actions,
      tags,
      titleClassName,
      subtitleClassName,
      actionsClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative flex min-h-[92vh] w-full flex-col items-center justify-center overflow-hidden bg-background pt-28 pb-20",
          className,
        )}
        {...props}
      >
        {/* Hairline grid fading down from the top */}
        <div
          aria-hidden
          className="absolute inset-0 bg-grid bg-grid-fade opacity-70"
        />

        {/* Soft crimson aura behind the headline */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[38%] h-[30rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        />

        {/* Floating "boxes" — echoes of the logo mark */}
        <motion.div
          aria-hidden
          className="absolute left-[12%] top-[26%] hidden h-5 w-5 rotate-12 bg-primary md:block"
          animate={{ y: [0, -14, 0], rotate: [12, 24, 12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[14%] top-[34%] hidden h-7 w-7 -rotate-6 border-2 border-accent md:block"
          animate={{ y: [0, 16, 0], rotate: [-6, -18, -6] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-[24%] left-[20%] hidden h-3 w-3 rotate-45 bg-accent md:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center">
          {eyebrow && (
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
            >
              <span className="box-mark" aria-hidden />
              {eyebrow}
              <span className="box-mark" aria-hidden />
            </motion.p>
          )}

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className={cn(
              "font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl",
              titleClassName,
            )}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={cn(
                "max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl",
                subtitleClassName,
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {actions && actions.length > 0 && (
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={cn(
                "mt-4 flex flex-wrap items-center justify-center gap-4",
                actionsClassName,
              )}
            >
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  size="lg"
                  asChild
                  className={cn(
                    "h-12 px-8 text-base",
                    (action.variant ?? "default") === "default" &&
                      "shadow-[4px_4px_0_0_var(--accent)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--accent)]",
                  )}
                >
                  <Link href={action.href}>
                    {action.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ))}
            </motion.div>
          )}

          {tags && tags.length > 0 && (
            <motion.ul
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
            >
              {tags.map((tag, index) => (
                <React.Fragment key={tag}>
                  {index > 0 && (
                    <li aria-hidden className="text-border">
                      /
                    </li>
                  )}
                  <li className="text-sm font-medium tracking-wide text-muted-foreground">
                    {tag}
                  </li>
                </React.Fragment>
              ))}
            </motion.ul>
          )}
        </div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Scroll
          </span>
          <span className="h-10 w-px overflow-hidden bg-border">
            <motion.span
              className="block h-4 w-px bg-accent"
              animate={{ y: [-16, 40] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeIn" }}
            />
          </span>
        </motion.div>
      </section>
    );
  },
);
Hero.displayName = "Hero";

export { Hero };
export type { HeroProps, HeroAction };
