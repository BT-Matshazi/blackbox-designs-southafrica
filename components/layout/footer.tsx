"use client";

import Link from "next/link";
import Image from "next/image"
import Logo from "@/public/logo.webp";
import { Github, Instagram, Linkedin, Twitter, Mail, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";


export function Footer() {
  return (
    <footer className="relative bg-card pt-16 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D43F52]/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        {/* CTA banner */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-r from-[#D43F52]/12 via-background to-[#E55A6F]/10 backdrop-blur-xl p-8 md:p-10 mb-12 shadow-[0_20px_60px_-45px_rgba(212,63,82,0.7)]">
          <div className="absolute -top-12 -left-10 h-36 w-36 bg-[#D43F52]/15 blur-3xl" />
          <div className="absolute -bottom-12 -right-10 h-36 w-36 bg-[#E55A6F]/15 blur-3xl" />
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.18em] text-[#D43F52] font-semibold">
                Let’s build something remarkable
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Need a high-performing web experience? Let’s talk.
              </h3>
              <p className="text-muted-foreground max-w-2xl">
                Conversion-focused design, modern engineering, and measurable results for your next product launch or redesign.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 md:ml-auto">
              <Button asChild className="shadow-lg shadow-[#D43F52]/25 w-full sm:w-auto">
                <Link href="/contact">Book a Call</Link>
              </Button>
              <Link
                href="tel:+27615314470"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                <PhoneCall className="h-4 w-4" />
                +27 61 531 4470
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src={Logo} width={200} alt="BlackBox Designs Logo" className="w-[180px] h-auto" />
            </div>
            <p className="text-muted-foreground max-w-xs">
              Crafting exceptional digital experiences that transform businesses and engage users.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
                { href: "https://instagram.com", label: "Instagram", icon: Instagram },
                { href: "https://twitter.com", label: "Twitter", icon: Twitter },
                { href: "https://github.com", label: "GitHub", icon: Github },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  UX/UI Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Headless CMS & E-commerce
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Performance & SEO
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Product Discovery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/portfolio"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Approach
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <address className="not-italic space-y-3 text-muted-foreground">
              <p>142 Elinta Avenue, Northwold</p>
              <p>Johannesburg, South Africa</p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D43F52]" />
                <Link href="mailto:info@blackboxdesigns.co.za">
                  info@blackboxdesigns.co.za
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-[#D43F52]" />
                <Link href="tel:+27615314470">+27 61 531 4470</Link>
              </p>
            </address>
            <div className="mt-4 p-4 rounded-xl border border-border/60 bg-background/60">
              <p className="text-sm font-semibold text-foreground">Office Hours</p>
              <p className="text-sm text-muted-foreground">Mon - Fri, 8:00 - 17:00 SAST</p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center lg:text-left">
            &copy; {new Date().getFullYear()} Blackbox Designs. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-&-conditions"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/popi"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              POPI
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
