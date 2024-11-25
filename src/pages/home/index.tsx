import * as React from 'react'

import Divider from '@mui/material/Divider'
import Hero from '@components/@public/Hero'
// import Pricing from '@components/@public/Pricing'
import Features from '@components/@public/Features'
import FAQ from '@components/@public/FAQ'
import { lang } from '@constants/content.constants'
import i18next from 'i18next'

export default function HomePage() {
  // This code only runs on the client side, to determine the system color preference

  return (
    <>
      <Hero />
      <div>
        <Features />
        <Divider />
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        <Divider />
        <FAQ lang={`${i18next.language as lang}`} />
        <Divider />
      </div>
    </>
  )
}
