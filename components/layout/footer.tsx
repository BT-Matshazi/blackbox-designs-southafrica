"use client";

import Link from "next/link";
import Image from "next/image"
import Logo from "@/public/logo.webp";


export function Footer() {
  return (
    <footer className="bg-card py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src={Logo} width={250} alt="BlackBox Designs Logo" />
            </div>
            <p className="text-muted-foreground max-w-xs">
              Crafting exceptional digital experiences that transform businesses
              and engage users.
            </p>
            <div className="flex gap-4">
              {/* <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button> */}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  UX/UI Design
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mobile Applications
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Digital Strategy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {/* <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li> */}
              <li>
                <Link
                  href="#portfolio"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Our Work
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li> */}
              <li>
                <Link
                  href="#contact"
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
              <p>
                {" "}
                <Link href="mailto:info@blackboxdesigns.co.za">
                  info@blackboxdesigns.co.za
                </Link>{" "}
              </p>
              <p>
                <Link href="tel:+27696376056">+27 69 637 6056</Link>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Blackbox Designs. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-sm">
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
