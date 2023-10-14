import React from "react";
import Image from "next/image";
import HeroImage from "../../../../public/images/common/order_hero.svg";

export default function Hero() {
  return (
    <>
      <section className="bg-white">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
              Build Your Custom Order Website with Us
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
              At BlackBox Designs, we specialize in crafting tailored online
              experiences that perfectly match your vision. Our dedicated team
              of experts is committed to bringing your unique ideas to life.
              Whether you need a personalized e-commerce platform, a dynamic web
              application, or a user-friendly interface, we are here to create a
              seamless and visually appealing website that caters to your
              specific needs.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-accent rounded-lg border  border-accent hover:bg-accent hover:text-white focus:ring-4 focus:ring-accent focus:ring-opacity-50 transition-all duration-3"
            >
              Contact Us
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
            </a>
            <a
              href="/portfolio"
              className="md:inline-flex hidden  items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
            >
              Our Portfolio
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image src={HeroImage} alt="mockup" width={600} height={600} />
          </div>
        </div>
      </section>
    </>
  );
}
