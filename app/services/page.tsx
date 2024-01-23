import React from "react";
import Services from "./services";
import Header from "@/common/header/header";
import Footer from "@/common/footer/footer";
import Hero from "./hero";

export default function page() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Footer />
    </>
  );
}
