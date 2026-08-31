import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/sections/contact";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils/metadata";
import { PAGE_METADATA, SEO_CONFIG } from "@/lib/config/seo-config";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: PAGE_METADATA.contact.title,
  description: PAGE_METADATA.contact.description,
  keywords: PAGE_METADATA.contact.keywords,
  canonical: `${SEO_CONFIG.siteUrl}/contact`,
});

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full pt-24">
      <section className="bg-background">
        <div className="grid container px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <span className="box-mark" aria-hidden />
              Contact Us
            </p>
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Get in Touch with Our Expert Team
            </h1>
            <p className="max-w-2xl mb-8 text-muted-foreground md:text-lg lg:text-xl">
              At BlackBox Designs, we believe in the power of innovative ideas
              and creative solutions. Our team of passionate professionals is
              dedicated to transforming your dreams into a digital reality.
              Whether you are looking to enhance your online presence, develop a
              cutting-edge app, or create visually stunning designs, we have got
              you covered.
            </p>
            <Button
              variant="outline-accent"
              size="lg"
              asChild
              className="h-12 px-7 text-base"
            >
              <Link href="/portfolio">
                Explore Our Portfolio
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src="/assets/images/common/contact_hero.svg"
              alt="mockup"
              width={700}
              height={700}
            />
          </div>
        </div>
      </section>
      <ContactSection />
    </div>
  );
}
