import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import ProductCard from '@components/ProductCard'
import { Product, ProductionListResponse } from '@services/payment.services'

// turn functtion component Pricing

interface PricingProps {
  data: ProductionListResponse
  onChoose: (data: Product) => void
  selected?: any
}

const Pricing: React.FC<PricingProps> = ({ data, onChoose, selected }) => {
  return (
    <Container
      id="pricing"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        mt: 4,
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
      >
        {data?.data.map((tier: Product) => (
          <Grid
            size={{ xs: 12, sm: tier.name === 'Enterprise' ? 12 : 6, md: 4 }}
            key={tier.name}
          >
            <ProductCard
              selected={selected?.product_id === tier.product_id}
              data={tier}
              onClick={(item: Product) => onChoose(item)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
export default Pricing
