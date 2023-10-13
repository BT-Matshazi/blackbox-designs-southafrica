import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Hero from "./components/hero/hero";
import About from "./components/about/about";
import Services from "./components/services/services";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Footer />
    </>
  );
}
