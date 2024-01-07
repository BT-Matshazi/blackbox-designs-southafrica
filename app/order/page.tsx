import React from "react";
import Hero from "./components/hero";
import Footer from "@/common/footer/footer";
import Header from "@/common/header/header";
import Products from "./components/products";

export default function page() {
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <Footer />
    </>
  );
}
