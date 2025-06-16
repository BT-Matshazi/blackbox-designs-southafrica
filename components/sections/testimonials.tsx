"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechVision",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "Working with Blackbox Designs transformed our online presence. Their team understood our vision perfectly and delivered a website that exceeded our expectations. Our conversion rates have increased by 40% since launch.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, GreenEats",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "The mobile app Blackbox designed for our food delivery service has been a game-changer. The intuitive design and smooth functionality have received overwhelmingly positive feedback from our customers.",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Marketing Director, Boutique Co.",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "The e-commerce solution Blackbox developed for us has revolutionized our online sales. The site is not only beautiful but also incredibly user-friendly, leading to a significant increase in sales and customer satisfaction.",
  },
  {
    id: 4,
    name: "James Rodriguez",
    role: "CTO, FinTech Solutions",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "The team at Blackbox Designs are true professionals. They delivered our complex financial dashboard on time and on budget. Their technical expertise and attention to detail are exceptional.",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
  };

  const handleNext = () => {
    nextTestimonial();
    resetInterval();
  };

  const handlePrev = () => {
    prevTestimonial();
    resetInterval();
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-lg">
              Don't just take our word for it. Here's what some of our clients
              have to say about working with us.
            </p>
          </Reveal>
        </div>

        <div className="relative max-w-4xl mx-auto overflow-hidden py-8">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-card rounded-2xl p-8 md:p-12 border border-border"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 relative">
                  <div className="absolute -top-6 -left-6">
                    <Quote className="h-12 w-12 text-primary/20" />
                  </div>
                  <Avatar className="h-20 w-20 border-4 border-background">
                    <AvatarImage
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                    />
                    <AvatarFallback>
                      {testimonials[current].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p className="text-lg md:text-xl italic mb-6 max-w-2xl">
                  "{testimonials[current].quote}"
                </p>
                <h4 className="font-semibold text-lg">
                  {testimonials[current].name}
                </h4>
                <p className="text-muted-foreground">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2 mx-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === current ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                    resetInterval();
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}