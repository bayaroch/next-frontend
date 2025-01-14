import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import ProductCard from '@components/ProductCard'
import { Product, ProductionListResponse } from '@services/payment.services'
import { useAuth } from '@global/AuthContext'
import { Identifier } from '@constants/common.constants'

// turn functtion component Pricing

interface PricingProps {
  data: ProductionListResponse
  onChoose: (data: Product) => void
  selected?: Product | null
}

const Pricing: React.FC<PricingProps> = ({ data, onChoose, selected }) => {
  const { init } = useAuth()

  return (
    <Container
      id="pricing"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {data?.data.map((tier: Product) => {
          const isFreeProduct = tier?.identifier === Identifier.FREE_PRODUCT
          const isDisabled =
            isFreeProduct && !init?.user_info.free_plan_available
          return (
            <>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }} key={tier.name}>
                <ProductCard
                  selected={selected?.product_id === tier.product_id}
                  data={tier}
                  onClick={(item: Product) => onChoose(item)}
                  disabled={isDisabled}
                />
              </Grid>
            </>
          )
        })}
      </Grid>
    </Container>
  )
}
export default Pricing
