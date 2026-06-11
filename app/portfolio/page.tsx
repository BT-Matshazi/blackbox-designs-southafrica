import Image from "next/image";
import { PortfolioSection } from "@/components/sections/portfolio";
import { getProjectsController } from "@/src/presentation/controllers/product.controller";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils/metadata";
import { PAGE_METADATA, SEO_CONFIG } from "@/lib/config/seo-config";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: PAGE_METADATA.portfolio.title,
  description: PAGE_METADATA.portfolio.description,
  keywords: PAGE_METADATA.portfolio.keywords,
  canonical: `${SEO_CONFIG.siteUrl}/portfolio`,
});

export default async function PortfolioPage() {
  const { success, data } = await getProjectsController();

  if (!success || !data) {
    return (
      <div className="flex flex-col w-full pt-24">
        <div className="container mx-auto px-4 text-center py-24">
          <h1 className="text-2xl font-bold mb-4">Portfolio</h1>
          <p className="text-muted-foreground">
            Unable to load projects at this time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pt-24">
      <section className="bg-background">
        <div className="grid container px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              <span className="box-mark" aria-hidden />
              Our Work
            </p>
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Elevate Your Digital Presence with Expert Web Solutions
            </h1>
            <p className="max-w-2xl mb-8 text-muted-foreground md:text-lg lg:text-xl">
              We craft stunning websites and applications tailored to your
              needs. From sleek designs to seamless user experiences, we
              transform visions into engaging digital realities.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="outline-accent"
                size="lg"
                asChild
                className="h-12 px-7 text-base"
              >
                <Link href="/services">
                  Explore Our Services
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="hidden h-12 px-7 text-base shadow-[3px_3px_0_0_var(--accent)] transition-all hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_0_var(--accent)] md:inline-flex"
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex lg:justify-center lg:items-center">
            <div className="relative w-full h-96 max-w-lg">
              {/* First image - top left */}
              <div className="absolute top-0 left-0 w-48 h-48 transform rotate-3 rounded-xl border border-border shadow-xl overflow-hidden z-30">
                <Image
                  src={
                    data[0]?.cardImage?.url ||
                    "/placeholder.svg?height=300&width=300"
                  }
                  alt={data[0]?.name || "Project image"}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Second image - center right */}
              <div className="absolute top-12 right-0 w-52 h-52 transform -rotate-6 rounded-xl border border-border shadow-xl overflow-hidden z-20">
                <Image
                  src={
                    data[1]?.cardImage?.url ||
                    "/placeholder.svg?height=320&width=320"
                  }
                  alt={data[1]?.name || "Project image"}
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Third image - bottom center */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-2 w-44 h-44 rounded-xl border border-border shadow-xl overflow-hidden z-10">
                <Image
                  src={
                    data[2]?.cardImage?.url ||
                    "/placeholder.svg?height=280&width=280"
                  }
                  alt={data[2]?.name || "Project image"}
                  width={280}
                  height={280}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection projects={data} />
    </div>
  );
}
