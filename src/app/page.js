import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Hero from "./home/hero/hero";
import About from "./home/about/about";
import Services from "./home/services/services";
 
export const metadata = {
  title: "BlackBox Designs - Web Design & Development",
  description:
    "BlackBox Designs is a web design and development company based in the South Africa, Johannesburg. We specialise in creating bespoke websites for small to large businesses and individuals.",
  applicationName: "BlackBox Designs",
  referrer: "origin-when-cross-origin",
  keywords: [
    "web design",
    "website design",
    "web development",
    "web design johannesburg",
    "WordPress",
    "CMS",
  ],
  authors: [
    { name: "Bekithemba Matshazi", url: "https://bekithembamatshazi.co.za" },
  ],
  creator: "Bekithemba Matshazi",
  publisher: "Bekithemba Matshazi",
};

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
