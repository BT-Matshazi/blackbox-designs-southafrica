"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function Page() {
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (newPrice, newDays) => {
    setPrice(newPrice);
    setDays(newDays);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://images.pexels.com/photos/12486830/pexels-photo-12486830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6985003/pexels-photo-6985003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4319805/pexels-photo-4319805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6648497/pexels-photo-6648497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1616516/pexels-photo-1616516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <>
    <Header/>
      <section className="py-20 font-poppins ">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 z-50 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 ">
                  <div
                    id="controls-carousel"
                    className="relative w-full"
                    data-carousel="static"
                  >
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className={`${
                            index === currentSlide ? "block" : "hidden"
                          } duration-700 ease-in-out`}
                          data-carousel-item={
                            index === currentSlide ? "active" : ""
                          }
                        >
                          <Image
                            src={image}
                            width={500}
                            height={500}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-xl"
                            alt={`Slide ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                      onClick={prevSlide}
                      data-carousel-prev
                    >
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full  group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                          className="w-4 h-4 text-white dark:text-gray-800"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                        <span className="sr-only">Previous</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                      onClick={nextSlide}
                      data-carousel-next
                    >
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full  group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                          className="w-4 h-4 text-white dark:text-gray-800"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                        <span className="sr-only">Next</span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="px-6 pb-6 mt-6 border-t border-gray-300">
                  <div className="flex items-center justify-center mt-6">
                    <span className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-5 h-5 text-accent  bi bi-chat-left-dots-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                      </svg>
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-gray-700 lg:text-lg">
                        Have question about Our E-Commerce Websites
                      </h2>
                      <a
                        href="/contact"
                        className="text-xs text-accent_hover lg:text-sm"
                      >
                        Chat with us.
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <h2 className="max-w-xl mt-2 mb-4 text-5xl font-bold md:text-6xl font-heading">
                    E-Commerce Website
                  </h2>
                  <p className="max-w-md mb-4 text-gray-500 ">
                    WordPress for ecommerce ensures a User-Friendly Interface,
                    allowing both site owners and customers to navigate the
                    platform effortlessly. This intuitive interface enhances the
                    overall user experience, making online shopping convenient
                    and enjoyable. <br/>Additionally, the ease of Content Creation
                    and Editing in WordPress empowers store owners to update
                    product information, images, and other content without the
                    need for advanced technical skills. This simplicity fosters
                    efficient management of product catalogs and ensures that
                    the website content remains up-to-date and engaging.
                  </p>
                </div>
                <section>
                  <div className="mt-6">
                    <p className="mb-2 text-lg font-semibold">
                      Choose your website size
                    </p>
                    <div className="grid grid-cols-2 gap-4 pb-4 mt-2 mb-4 border-b-2 border-gray-300 lg:grid-cols-3">
                      <div>
                        <button
                          className={`${
                            activeButton === 1
                              ? "border-accent_hover"
                              : "border-gray-300"
                          } flex items-center justify-center w-full h-full py-4 border-2 rounded-md hover:border-accent_hover`}
                          onClick={() => {
                            handleButtonClick(3000, 12);
                            setActiveButton(1);
                          }}
                        >
                          <div>
                            <div className="mb-2 font-semibold">
                              1 - 3 <span className="text-xs">Pages</span>
                            </div>
                            <p className="px-2 text-xs font-medium text-center text-gray-700">
                              R3 000.00
                            </p>
                          </div>
                        </button>
                      </div>
                      <div>
                        <button
                          className={`${
                            activeButton === 2
                              ? "border-accent_hover"
                              : "border-gray-300"
                          } flex items-center justify-center w-full h-full py-4 border-2 rounded-md hover:border-accent_hover`}
                          onClick={() => {
                            handleButtonClick(5000, 16);
                            setActiveButton(2);
                          }}
                        >
                          {" "}
                          <div>
                            <div className="mb-2 font-semibold">
                              4 - 6 <span className="text-xs">Pages</span>
                            </div>{" "}
                            <p className="px-2 text-xs font-medium text-center text-gray-700">
                              R5 000.00
                            </p>
                          </div>
                        </button>
                      </div>
                      <div>
                        <button
                          className={`${
                            activeButton === 3
                              ? "border-accent_hover"
                              : "border-gray-300"
                          } flex items-center justify-center w-full h-full py-4 border-2 rounded-md hover:border-accent_hover`}
                          onClick={() => {
                            handleButtonClick(7000, 23);
                            setActiveButton(3);
                          }}
                        >
                          {" "}
                          <div>
                            <div className="mb-2 font-semibold">
                              7 - 10 <span className="text-xs">Pages</span>
                            </div>
                            <p className="px-2 text-xs font-medium text-center text-gray-700 ">
                              R7 000.00
                            </p>
                          </div>
                        </button>
                      </div>
                      <div>
                        <button
                          className={`${
                            activeButton === 4
                              ? "border-accent_hover"
                              : "border-gray-300"
                          } flex items-center justify-center w-full h-full py-4 border-2 rounded-md hover:border-accent_hover`}
                          onClick={() => {
                            handleButtonClick(9500, 30);
                            setActiveButton(4);
                          }}
                        >
                          {" "}
                          <div>
                            <div className="mb-2 font-semibold">
                              11 - 15 <span className="text-xs">pages</span>
                            </div>
                            <p className="px-2 text-xs font-medium text-center text-gray-700">
                              R9 500.00
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="mt-6 ">
                  <div className="flex flex-wrap items-center">
                    <span className="mr-2">
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
                    <h2 className="text-lg font-bold text-gray-700">
                      Duration: {days} days
                    </h2>
                  </div>
                </div>
                <div className="mt-6 ">
                  <form
                    action="https://sandbox.payfast.co.za/eng/process"
                    method="post"
                  >
                    <input type="hidden" name="merchant_id" value="10000100" />
                    <input
                      type="hidden"
                      name="merchant_key"
                      value="46f0cd694581a"
                    />
                    <input type="hidden" name="amount" value={price} />
                    <input
                      type="hidden"
                      name="item_name"
                      value="Test Product"
                    />

                    <button
                      type="submit"
                      disabled={price === 0}
                      className="w-full px-4 py-2 font-bold text-white bg-accent lg:w-96 hover:bg-accent_hover"
                    >
                      R{price}.00 Order & Pay
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
