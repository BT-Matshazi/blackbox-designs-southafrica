import React from "react";
import Image from "next/image";
import Logo from "public/images/logo/logo.png";
import Copyright from "./copyright";

export default function Footer() {

  const quickLinks = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Portfolio",
      url: "/portfolio",
    },
    {
      name: "Order Now",
      url: "/order",
    },
    {
      name: "Contact",
      url: "/contact",
    },
  ]

  const legalLinks = [
    {
      name: "POPI",
      url: "/#",
    },
    {
      name: "Privacy Policy",
      url: "/#",
    },
    {
      name: "Terms & Conditions",
      url: "/#",
    }
  ]

  const contactDetails = [
    {
      name: "081 514 5508",
      url: "tel:27815145508",
    },
    {
      name: "info@blackboxdesigns.co.za",
      url: "mailto:info@blackboxdesigns.co.za",
    },
    {
      name: "bekithemba@blackboxdesigns.co.za",
      url: "mailto:bekithemba@blackboxdesigns.co.za",
    },
  ];

  return (
    <>
      <footer className="bg-white ">
        <div className="mx-auto w-full p-10 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <Image src={Logo} width={250} alt="FlowBite Logo" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-md font-semibold text-gray-900 uppercase ">
                  Quick Links
                </h2>
                <ul className="text-gray-500  font-medium">
                  {quickLinks.map((link, i) => {
                    return (
                      <li key={i} className="mb-4">
                        <a href={link.url} className="hover:underline">
                          {link.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-md font-semibold text-gray-900 uppercase ">
                  Legal
                </h2>
                <ul className="text-gray-500 font-medium">
                  {legalLinks.map((link, i) => {
                    return (
                      <li key={i} className="mb-4">
                        <a href={link.url} className="hover:underline">
                          {link.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-md font-semibold text-gray-900 uppercase ">
                  Contact us
                </h2>
                <ul className="text-gray-500 font-medium">
                  {contactDetails.map((link, i) => {
                    return (
                      <li key={i} className="mb-4">
                        <a href={link.url} className="hover:underline">
                          {link.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <Copyright />
        </div>
      </footer>
    </>
  );
}
