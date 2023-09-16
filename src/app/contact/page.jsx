import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import ContactForm from './components/form/contactForm';

export default function page() {
  return (
    <>
      <Header />
      <div className="flex flex-row w-3/4 m-auto gap-4">
        <div className="w-1/2">
          <ContactForm />
        </div>
        <div className="w-1/2">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
