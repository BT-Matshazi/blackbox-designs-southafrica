"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.webp";
import {
  Menu,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { whatsappLink, PHONE_NUMBER, PHONE_DISPLAY } from "@/lib/contact";
import { trackContactClick } from "@/lib/analytics";
import { SEO_CONFIG } from "@/lib/config/seo-config";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/portfolio" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: SEO_CONFIG.companyInfo.social.linkedin,
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: SEO_CONFIG.companyInfo.social.instagram,
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: SEO_CONFIG.companyInfo.social.facebook,
    icon: Facebook,
  },
  {
    name: "X",
    href: SEO_CONFIG.companyInfo.social.twitter,
    icon: Twitter,
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="z-50 flex items-center gap-2">
          <Image
            src={Logo}
            width={180}
            alt="BlackBox Designs Logo"
            priority
            className="h-auto w-[150px] md:w-[180px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-7">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative py-1 text-sm font-medium transition-colors hover:text-accent",
                    "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300",
                    isActive(item.href)
                      ? "text-accent after:w-full"
                      : "after:w-0 hover:after:w-full"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="shadow-[3px_3px_0_0_var(--accent)] transition-all hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_0_var(--accent)]"
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[320px] flex-col gap-0 p-0 sm:w-[380px]"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              {/* Header */}
              <div className="border-b border-border px-6 py-5">
                <Image
                  src={Logo}
                  width={150}
                  alt="BlackBox Designs Logo"
                  className="h-auto w-[150px]"
                />
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 px-4 py-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * index, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-3 text-lg font-semibold tracking-tight transition-colors",
                        isActive(item.href)
                          ? "bg-accent/10 text-accent"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {isActive(item.href) && (
                          <span className="box-mark" aria-hidden />
                        )}
                        {item.name}
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                    </Link>
                  </motion.div>
                ))}

                <Button
                  asChild
                  size="lg"
                  className="mt-4 h-12 w-full text-base shadow-[3px_3px_0_0_var(--accent)] transition-all hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_0_var(--accent)]"
                >
                  <Link href="/contact" onClick={closeMenu}>
                    Get in Touch
                  </Link>
                </Button>
              </nav>

              {/* Contact + social, pinned to the bottom */}
              <div className="mt-auto space-y-5 border-t border-border px-6 py-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="box-mark" aria-hidden />
                  Get in touch
                </p>

                <div className="space-y-3 text-sm">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackContactClick("whatsapp", "mobile_menu");
                      closeMenu();
                    }}
                    className="flex items-center gap-3 font-medium text-foreground transition-colors hover:text-accent"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                    Chat on WhatsApp
                  </a>

                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    onClick={() => {
                      trackContactClick("phone", "mobile_menu");
                      closeMenu();
                    }}
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-accent"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Phone className="h-4 w-4" />
                    </span>
                    {PHONE_DISPLAY}
                  </a>

                  <ObfuscatedEmail
                    location="mobile_menu"
                    onClick={closeMenu}
                    prefix={
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Mail className="h-4 w-4" />
                      </span>
                    }
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-accent"
                  />

                  <p className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <MapPin className="h-4 w-4" />
                    </span>
                    Johannesburg, South Africa
                  </p>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-2 pt-1">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      <social.icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
