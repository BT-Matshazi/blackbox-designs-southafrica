import Image from "next/image";
import { PortfolioSection } from "@/components/sections/portfolio";
import { getProjectsController } from "@/src/presentation/controllers/product.controller";
import Link from "next/link";

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
      <section className="bg-white">
        <div className="grid container px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Elevate Your Digital Presence with Expert Web Solutions
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              We craft stunning websites and applications tailored to your
              needs. From sleek designs to seamless user experiences, we
              transform visions into engaging digital realities.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-accent rounded-lg border  border-accent hover:bg-accent hover:text-white focus:ring-4 focus:ring-accent focus:ring-opacity-50 transition-all duration-3"
            >
              Explore Our Services
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              href="/contact"
              className="md:inline-flex hidden items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
            >
              Get In Touch
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex lg:justify-center lg:items-center">
            <div className="relative w-full h-96 max-w-lg">
              {/* First image - top left */}
              <div className="absolute top-0 left-0 w-48 h-48 transform rotate-3 shadow-xl rounded-lg overflow-hidden z-30">
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
              <div className="absolute top-12 right-0 w-52 h-52 transform -rotate-6 shadow-xl rounded-lg overflow-hidden z-20">
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
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-2 w-44 h-44 shadow-xl rounded-lg overflow-hidden z-10">
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
