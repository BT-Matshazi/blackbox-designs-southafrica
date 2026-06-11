import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServicesSection } from "@/components/sections/services";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils/metadata";
import { PAGE_METADATA, SEO_CONFIG } from "@/lib/config/seo-config";
import { Metadata } from "next";
import Script from "next/script";
import { getServiceSchema } from "@/lib/utils/structured-data";

export const metadata: Metadata = generateSEOMetadata({
  title: PAGE_METADATA.services.title,
  description: PAGE_METADATA.services.description,
  keywords: PAGE_METADATA.services.keywords,
  canonical: `${SEO_CONFIG.siteUrl}/services`,
});

export default function ServicesPage() {
  const serviceSchema = getServiceSchema();
  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <div className="flex flex-col w-full pt-24">
        <section className="bg-background">
        <div className="grid container px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <span className="box-mark" aria-hidden />
              What We Do
            </p>
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Explore Our Expert Services
            </h1>
            <p className="max-w-2xl mb-8 text-muted-foreground md:text-lg lg:text-xl">
              At BlackBox Designs. We are committed to harnessing the potential
              of innovative ideas and providing creative solutions. Our team of
              dedicated professionals is here to bring your digital aspirations
              to life. Whether you&apos;re seeking to elevate your online
              presence, develop cutting-edge applications, or craft visually
              stunning designs, we&apos;ve got the expertise to meet your needs.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline-accent"
                size="lg"
                asChild
                className="h-12 px-7 text-base"
              >
                <Link href="/contact">
                  Need Something Custom
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="hidden h-12 px-7 text-base shadow-[3px_3px_0_0_var(--accent)] transition-all hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_0_var(--accent)] md:inline-flex"
              >
                <Link href="/portfolio">Our Portfolio</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src="/assets/images/services.svg"
              alt="mockup"
              width={700}
              height={700}
            />
          </div>
        </div>
      </section>
        <ServicesSection />
      </div>
    </>
  );
}
