import React from 'react'
import Header from '@/components/header/header'
import Hero from './components/hero'
import Footer from '@/components/footer/footer'
import Portfolio from './components/portfolio'

export const metadata = {
  title: "BlackBox Designs | Portfolio",
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

export default function Page () {
  return (
    <>
        <Header />
        <Hero />
        <Portfolio />
        <Footer />
    </>
  )
}
