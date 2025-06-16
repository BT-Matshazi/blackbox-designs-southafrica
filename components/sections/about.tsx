"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const skills = [
  { name: "Web Development", progress: 95 },
  { name: "UI/UX Design", progress: 90 },
  { name: "Mobile Development", progress: 85 },
  { name: "Branding & Strategy", progress: 88 },
];

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "100+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "15", label: "Industry Awards" },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

  return (
    <section id="about" className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About Blackbox Designs
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground mb-6">
                Founded in 2015, Blackbox Designs is a forward-thinking digital
                agency dedicated to creating exceptional digital experiences
                that drive business growth and user engagement.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground mb-8">
                Our team of designers, developers, and strategists work
                collaboratively to deliver innovative solutions that help our
                clients stand out in today's competitive digital landscape.
              </p>
            </Reveal>

            <div className="space-y-6 mb-8">
              {skills.map((skill, i) => (
                <Reveal key={skill.name} delay={0.2 + i * 0.1}>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">
                        {skill.progress}%
                      </span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.6}>
              <Button className="group">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Reveal>
          </div>

          <div ref={ref} className="relative">
            <motion.div
              className="relative z-20 rounded-xl overflow-hidden"
              style={{ scale: imageScale, opacity: imageOpacity }}
            >
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Our team collaborating"
                className="w-full rounded-xl"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-xl" />
            </motion.div>

            <div className="absolute -bottom-8 -right-8 -z-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -top-8 -left-8 -z-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 * i}>
                <div className="text-center p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}