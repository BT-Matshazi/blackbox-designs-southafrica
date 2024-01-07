import React from 'react'
import Header from '@/common/header/header'
import Hero from './components/hero'
import Footer from '@/common/footer/footer'
import Portfolio from './components/portfolio'

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
