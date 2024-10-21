import * as React from 'react'

import Divider from '@mui/material/Divider'
import AppAppBar from '@components/@public/AppBar'
import Hero from '@components/@public/Hero'
import Pricing from '@components/@public/Pricing'
import Features from '@components/@public/Features'
import Testimonials from '@components/@public/Testimonials'
import FAQ from '@components/@public/FAQ'
import Footer from '@components/@public/Footer'

export default function HomePage() {
  // This code only runs on the client side, to determine the system color preference

  return (
    <>
      <AppAppBar />
      <Hero />
      <div>
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </>
  )
}
