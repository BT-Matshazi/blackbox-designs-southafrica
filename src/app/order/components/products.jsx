import React from "react";
import Image from "next/image";
import ProductData from "./productData";

export default function products() {
  return (
    <>
      <div className="flex items-center justify-center py-10">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          {ProductData.map((product) => {
            return (
              <div
                key={product.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <div className="m-2 overflow-hidden">
                    <Image
                      className="object-cover w-full mx-auto transition-all ease-in-out rounded h-72 hover:scale-110"
                      src={product.image}
                      alt=""
                      width={500}
                      height={200}
                    />
                  </div>
                  <div className="absolute px-4 py-1 text-xs font-semibold text-white rounded top-3 left-3 sale bg-accent">
                    From R{product.price}.00 + VAT
                  </div>
                </div>
                <div className="p-5">
                  <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {product.name}
                    </h5>
                  </div>
                  <p className="mb-3 font-normal text-gray-700">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                  <a
                    href={product.link}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-accent rounded-lg hover:bg-accent_hover focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Build Your Order
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
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
