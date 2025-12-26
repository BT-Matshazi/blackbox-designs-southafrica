"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.webp";
import { Menu, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
// import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/portfolio" },
  { name: "Case Studies", href: "/case-studies" },
// { name: "About", href: "/about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 z-50">
          <Image src={Logo} width={200} alt="BlackBox Designs Logo" className="w-[170px] sm:w-[200px] h-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex gap-4 xl:gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-full",
                    pathname === item.href
                      ? "text-primary bg-primary/5 border border-primary/20"
                      : "text-muted-foreground hover:bg-muted/40"
                  )}
                >
                  <span>{item.name}</span>
                  {pathname === item.href && (
                    <motion.span
                      className="absolute inset-0 rounded-full ring-1 ring-primary/20"
                      layoutId="nav-active"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          {/* <ThemeToggle /> */}
          <div className="flex items-center gap-3">
            <Link
              href="tel:+27615314470"
              className="hidden xl:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
              +27 61 531 4470
            </Link>
            <Button asChild className="shadow-lg shadow-[#D43F52]/20">
              <Link href="/contact">Book a Call</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full bg-gradient-to-r from-[#D43F52] to-[#E55A6F] text-white shadow-md shadow-[#D43F52]/25"
          >
            Let’s Talk
          </Link>
          {/* <ThemeToggle /> */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col items-center gap-8 mt-8">
                <ul className="flex flex-col items-center gap-6 w-full">
                  {navItems.map((item) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * navItems.indexOf(item) }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "text-xl font-medium transition-colors hover:text-primary block text-center w-full py-2 rounded-full",
                          pathname === item.href
                            ? "text-primary bg-primary/5 border border-primary/10"
                            : "text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="w-full space-y-3">
                  <Button asChild className="w-full shadow-lg shadow-[#D43F52]/20">
                    <Link href="/contact">Book a Call</Link>
                  </Button>
                  <Link
                    href="tel:+27615314470"
                    className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <PhoneCall className="h-4 w-4" />
                    +27 61 531 4470
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
