'use client'

import React from "react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState(0);

  return (
    <>
      <section class="py-20 font-poppins ">
        <div class="max-w-6xl px-4 mx-auto">
          <div class="flex flex-wrap mb-24 -mx-4">
            <div class="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div class="sticky top-0 z-50 overflow-hidden ">
                <div class="relative mb-6 lg:mb-10 ">
                  <a
                    class="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="w-5 h-5 text-blue-500 bi bi-chevron-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                      ></path>
                    </svg>
                  </a>
                  <img
                    class="object-cover w-full lg:h-1/2"
                    src="https://i.postimg.cc/prW7DGkK/R-14.png"
                    alt=""
                  />
                  <a
                    class="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="w-5 h-5 text-blue-500 bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div class="flex-wrap hidden -mx-2 md:flex">
                  <div class="w-1/2 p-2 sm:w-1/4">
                    <a
                      class="block border border-transparent hover:border-blue-400"
                      href="#"
                    >
                      <img
                        class="object-cover w-full lg:h-32"
                        src="https://i.postimg.cc/prW7DGkK/R-14.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="w-1/2 p-2 sm:w-1/4">
                    <a
                      class="block border border-transparent hover:border-blue-400"
                      href="#"
                    >
                      <img
                        class="object-cover w-full lg:h-32"
                        src="https://i.postimg.cc/prW7DGkK/R-14.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="w-1/2 p-2 sm:w-1/4">
                    <a
                      class="block border border-transparent hover:border-blue-400"
                      href="#"
                    >
                      <img
                        class="object-cover w-full lg:h-32"
                        src="https://i.postimg.cc/prW7DGkK/R-14.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="w-1/2 p-2 sm:w-1/4">
                    <a
                      class="block border border-transparent hover:border-blue-400"
                      href="#"
                    >
                      <img
                        class="object-cover w-full lg:h-32"
                        src="https://i.postimg.cc/prW7DGkK/R-14.png"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <div class="px-6 pb-6 mt-6 border-t border-gray-300">
                  <div class="flex items-center justify-center mt-6">
                    <span class="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="w-5 h-5 text-blue-700  bi bi-chat-left-dots-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                      </svg>
                    </span>
                    <div>
                      <h2 class="text-sm font-bold text-gray-700 lg:text-lg">
                        Have question about buying an Oneplus
                      </h2>
                      <a class="text-xs text-blue-400 lg:text-sm" href="#">
                        Chat with an Oneplus specialist
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/2">
              <div class="lg:pl-20">
                <div class="mb-6 ">
                  <span class="text-red-500   ">New</span>
                  <h2 class="max-w-xl mt-2 mb-4 text-5xl font-bold md:text-6xl font-heading">
                    CMS Business Website
                  </h2>
                  <p class="max-w-md mb-4 text-gray-500 ">
                    Get $100-$500 off when you trade in an one plus 6 or newer.
                  </p>
                  <a href="#" class="text-blue-500 hover:underline ">
                    See how trade-in works
                  </a>
                </div>
                {/* <div class="">
                  <p class="mb-4 text-lg font-semibold ">
                    Choose your finish
                  </p>
                  <div class="grid grid-cols-2 gap-4 pb-4 border-b-2 border-gray-300 lg:grid-cols-3 ">
                    <div>
                      <button class="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                        <div>
                          <div class="w-8 h-8 mx-auto mb-2 rounded-full bg-emerald-400"></div>
                          <p class="text-xs text-center text-gray-700 ">
                            Pearl Green
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button class="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                        <div>
                          <div class="w-8 h-8 mx-auto mb-2 bg-gray-700 rounded-full"></div>
                          <p class="text-xs text-center text-gray-700 ">
                            Mattee Black
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button class="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                        <div>
                          <div class="w-8 h-8 mx-auto mb-2 bg-red-500 rounded-full"></div>
                          <p class="text-xs text-center text-gray-700">
                            Red
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button class="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                        <div>
                          <div class="w-8 h-8 mx-auto mb-2 rounded-full bg-stone-200"></div>
                          <p class="text-xs text-center text-gray-700 ">
                            Silver
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button class="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                        <div>
                          <div class="w-8 h-8 mx-auto mb-2 bg-blue-200 rounded-full"></div>
                          <p class="text-xs text-center text-gray-700">
                            Sierra Blue
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div> */}
                <div class="mt-6">
                  <p class="mb-2 text-lg font-semibold">Choose your Capacity</p>
                  <a href="#" class="text-blue-500 hover:underline">
                    How much capacity is right for you?
                  </a>
                  <div class="grid grid-cols-2 gap-4 pb-4 mt-2 mb-4 border-b-2 border-gray-300 lg:grid-cols-3">
                    <div>
                      <button class="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                        <div>
                          <div class="mb-2 font-semibold">
                            1 - 3 <span class="text-xs">Pages</span>
                          </div>
                          <p class="px-2 text-xs font-medium text-center text-gray-700">
                            From $99 0r $41.62/mo. for 24 mo.
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button class="flex items-center justify-center w-full h-full py-4 border-2 border-gray-30o hover:border-blue-400">
                        <div>
                          <div class="mb-2 font-semibold">
                            4 - 6 <span class="text-xs">Pages</span>
                          </div>
                          <p class="px-2 text-xs font-medium text-center text-gray-700">
                            From $99 0r $41.62/mo. for 24 mo.
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button class="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                        <div>
                          <div class="mb-2 font-semibold">
                            7 - 10 <span class="text-xs">Pages</span>
                          </div>
                          <p class="px-2 text-xs font-medium text-center text-gray-700 ">
                            From $99 0r $41.62/mo. for 24 mo.
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button class="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                        <div>
                          <div class="mb-2 font-semibold">
                            11 - 15 <span class="text-xs">pages</span>
                          </div>
                          <p class="px-2 text-xs font-medium text-center text-gray-700">
                            From $99 0r $41.62/mo. for 24 mo.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6">
                  <p class="mb-4 text-lg font-semibold ">
                    Choose a payment option
                  </p>
                  <div class="grid grid-cols-2 gap-4 pb-4 mt-2 mb-4 border-b-2 border-gray-300 lg:grid-cols-3">
                    <div>
                      <button class="flex items-center justify-center w-full h-full px-2 py-6 border-2 border-gray-300 hover:border-blue-400">
                        <div>
                          <p class="px-2 text-base font-semibold text-center text-gray-700 ">
                            Pay in full
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button class="flex items-center justify-center w-full h-full px-2 py-6 border-2 border-gray-300 hover:border-blue-400">
                        <div>
                          <p class="px-2 text-base font-semibold text-center text-gray-700">
                            Pay monthly
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6 ">
                  <div class="flex flex-wrap items-center">
                    <span class="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#D43F52"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <h2 class="text-lg font-bold text-gray-700">
                      Duration: {days} days
                    </h2>
                  </div>
                </div>
                <div class="mt-6 ">
                  <button class="w-full px-4 py-2 font-bold text-white bg-accent lg:w-96 hover:bg-accent_hover">
                    R{price}.00 Order & Pay
                  </button>
                </div>
                <div class="flex items-center mt-6 ">
                  <div>
                    <h2 class="mb-2 text-lg font-bold text-gray-700 ">
                      Still deciding?
                    </h2>
                    <p class="mb-2 text-sm ">
                      {" "}
                      Add this item to a list and easily come back to it later{" "}
                    </p>
                  </div>
                  <span class="ml-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-600 bi bi-bookmark "
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
