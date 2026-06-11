"use client";

import { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      {eyebrow && (
        <Reveal width="100%">
          <p
            className={cn(
              "mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground",
              centered && "justify-center",
            )}
          >
            <span className="box-mark" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal width="100%" delay={0.05}>
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal width="100%" delay={0.1}>
          <p
            className={cn(
              "mt-4 max-w-2xl text-lg text-muted-foreground",
              centered && "mx-auto",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
