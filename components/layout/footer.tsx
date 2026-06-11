"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.webp";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

const serviceLinks = [
  { name: "Web Development", href: "/services" },
  { name: "UX/UI Design", href: "/services" },
  { name: "Mobile Applications", href: "/services" },
  { name: "E-commerce Solutions", href: "/services" },
  { name: "Digital Strategy", href: "/services" },
];

const companyLinks = [
  { name: "Our Work", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Image
                src={Logo}
                width={200}
                alt="BlackBox Designs Logo"
                className="h-auto w-[180px]"
              />
            </div>
            <p className="max-w-xs text-muted-foreground">
              Crafting exceptional digital experiences that transform businesses
              and engage users.
            </p>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              <span className="box-mark" aria-hidden />
              Johannesburg, ZA
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Contact</h3>
            <address className="space-y-3 not-italic text-muted-foreground">
              <p>142 Elinta Avenue, Northwold</p>
              <p>Johannesburg, South Africa</p>
              <p>
                <ObfuscatedEmail className="transition-colors hover:text-accent" />
              </p>
              <p>
                <Link
                  href="tel:+27615314470"
                  className="transition-colors hover:text-accent"
                >
                  +27 61 531 4470
                </Link>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Blackbox Designs. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-&-conditions"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              Terms of Service
            </Link>
            <Link
              href="/popi"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              POPI
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
