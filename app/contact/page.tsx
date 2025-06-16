import Link from "next/link";
import Image from "next/image";
import { ContactSection } from "@/components/sections/contact";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full pt-24">
      <section className="bg-white">
        <div className="grid container px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
              Get in Touch with Our Expert Team
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
              At BlackBox Designs, we believe in the power of innovative ideas
              and creative solutions. Our team of passionate professionals is
              dedicated to transforming your dreams into a digital reality.
              Whether you are looking to enhance your online presence, develop a
              cutting-edge app, or create visually stunning designs, we have got
              you covered.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-accent rounded-lg border  border-accent hover:bg-accent hover:text-white focus:ring-4 focus:ring-accent focus:ring-opacity-50 transition-all duration-3"
            >
              Explore Our Portfolio
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
            {/* <a
              href="/portfolio"
              className="md:inline-flex hidden  items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 "
            >
              Our Portfolio
            </a> */}
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
