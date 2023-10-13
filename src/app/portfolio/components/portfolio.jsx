import React from "react";
import Image from "next/image";
import PortfolioData from "./portfolioData";

export default function Portfolio() {
  return (
    <>
      <div className="flex items-center justify-center py-10">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          {PortfolioData.map((portfolio) => {
            return (
              <div
                key={portfolio.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow "
              >
                <a href="#">
                  <Image
                    className="rounded-lg w-full h-72"
                    src={portfolio.image}
                    alt=""
                    width={500}
                    height={200}
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {portfolio.title}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                  <a
                    href={portfolio.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-accent rounded-lg hover:bg-accent_hover focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Visit
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
