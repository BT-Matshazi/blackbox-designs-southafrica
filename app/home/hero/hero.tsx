import React from "react";
import Image from "next/image";
import HeroImg from "@/public/images/common/hero.svg";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section>
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-5 text-center rounded-sm lg:max-w-lg xl:max-w-xl lg:text-left">
            <h1 className="text-5xl font-bold leadi sm:text-6xl">
              Black
              <span className="text-white text-stroke-3 ">Box</span> Designs
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              Unlock the boundless potential of the Digital Universe with Our
              Web Wizardry and transform your online presence into a mesmerizing
              realm of endless possibilities!
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link
                rel="noopener noreferrer"
                href="/contact"
                className="px-8 py-3 text-lg font-semibold rounded bg-accent text-secondary hover:bg-primary transition-all duration-300 ease-in-out"
              >
                Contact Us
              </Link>
              <Link
                rel="noopener noreferrer"
                href="/portfolio"
                className="px-8 py-3 text-lg font-semibold border rounded border-black hover:border-accent hover:text-accent transition-all duration-300 ease-in-out"
              >
                Our Portfolio
              </Link>
            </div>
          </div>
          <div className="lg:flex hidden items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <Image
              src={HeroImg}
              alt="banner image"
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
        </div>
      </section>
    </>
  );
}
