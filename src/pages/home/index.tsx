import * as React from 'react'

import Divider from '@mui/material/Divider'
import Hero from '@components/@public/Hero'
// import Pricing from '@components/@public/Pricing'
// import Features from '@components/@public/Features'
import FAQ from '@components/@public/FAQ'
import { lang } from '@constants/content.constants'
import i18next from 'i18next'
import Pricing from '@components/@public/Pricing'
import {
  ProductionListResponse,
  ProductService,
} from '@services/payment.services'
import { useQuery } from 'react-query'

export default function HomePage() {
  const { data: tiers } = useQuery<ProductionListResponse, Error>(
    ['products'],
    () => ProductService.getProductsByPage(),
    {
      refetchOnWindowFocus: false,
    }
  )
  // This code only runs on the client side, to determine the system color preference

  return (
    <>
      <Hero />
      <div>
        {/* <Features /> */}
        <Divider sx={{ mb: 5 }} />
        <Pricing data={tiers} isShowChoose={false} />
        <Divider sx={{ mt: 5 }} />
        <FAQ lang={`${i18next.language as lang}`} />
      </div>
    </>
  )
}
