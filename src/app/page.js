import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Hero from "./home/hero/hero";
import About from "./home/about/about";
import Services from "./home/services/services";

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
