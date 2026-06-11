"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-4">
        {/* The black box — brand motif as a full CTA band */}
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-primary-foreground md:px-16 md:py-24">
          {/* Hairline grid on ink */}
          <div
            aria-hidden
            className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px]"
          />

          {/* Crimson glows */}
          <motion.div
            aria-hidden
            className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />

          {/* Floating box marks */}
          <motion.span
            aria-hidden
            className="absolute right-[12%] top-[18%] hidden h-4 w-4 rotate-12 bg-accent md:block"
            animate={{ y: [0, -10, 0], rotate: [12, 30, 12] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute bottom-[20%] left-[10%] hidden h-3 w-3 -rotate-6 border border-primary-foreground/40 md:block"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal width="100%">
              <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">
                <span className="box-mark" aria-hidden />
                Let&apos;s Build Together
                <span className="box-mark" aria-hidden />
              </p>
            </Reveal>
            <Reveal width="100%" delay={0.05}>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                Ready to Transform Your Digital Presence?
              </h2>
            </Reveal>
            <Reveal width="100%" delay={0.1}>
              <p className="mb-10 text-lg text-primary-foreground/70">
                Let&apos;s collaborate to create something extraordinary. Our
                team is ready to bring your vision to life.
              </p>
            </Reveal>
            <Reveal width="100%" delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  variant="accent"
                  size="lg"
                  asChild
                  className="h-12 px-8 text-base"
                >
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  asChild
                  className="h-12 border border-primary-foreground/25 bg-transparent px-8 text-base text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href="/portfolio">See Our Work</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
