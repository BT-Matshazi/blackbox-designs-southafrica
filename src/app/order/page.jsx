import React from "react";
import Hero from "./components/hero";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Products from "./components/products";

export default function page() {
  return (
    <>
    <Header/>
    <Hero/>
    <Products/>
    <Footer/>
    </>
  );
}
