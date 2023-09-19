"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "public/images/logo/logo.png";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Services",
      url: "/services",
    },
    {
      name: "Portfolio",
      url: "/portfolio",
    },
    {
      name: "Pricing",
      url: "/pricing",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ];

  return (
    <>
      <nav className="bg-white border-gray-200 w-full">
        <div className="flex flex-wrap items-center justify-between mx-auto p-10">
            <a href="/" className="flex items-center">
              <Image src={Logo} width={250} alt="BlackBox Designs Logo" />
            </a>
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-accent rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-multi-level"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-5 h-5 ${mobileMenuOpen ? "hidden" : ""}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
            <svg
              className={`w-5 h-5 ${mobileMenuOpen ? "" : "hidden"}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5l-6 6m0 0l6-6"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${
              mobileMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-multi-level"
          >
            {/* Your menu items here */}
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              {menuItems.map((item) => {
                return (
                  <li key={item.name}>
                    <Link
                      href={item.url}
                      className="block text-lg py-2 pl-3 pr-4 text-black rounded md:hover:bg-transparent md:border-0 lg:hover:text-accent md:p-0 transition duration-200 ease-in-out"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
