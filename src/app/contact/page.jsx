import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import ContactForm from './components/form/contactForm';
import Hero from './components/hero/hero';

export default function page() {
  return (
    <>
      <Header />
      <Hero />
      <ContactForm />
      <Footer />
    </>
  );
}
