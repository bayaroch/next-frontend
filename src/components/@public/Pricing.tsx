import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import ProductCard from '@components/ProductCard'
import { Product, ProductionListResponse } from '@services/payment.services'
import { useAuth } from '@global/AuthContext'
import { Identifier } from '@constants/common.constants'
import Animated from '@components/Animated'
import { useInView } from '@react-spring/web'
import { Box } from '@mui/material'

interface PricingProps {
  data: ProductionListResponse
  onChoose?: (data: Product) => void
  selected?: Product | null
  isShowChoose?: boolean
}

const Pricing: React.FC<PricingProps> = ({
  data,
  onChoose,
  selected,
  isShowChoose,
}) => {
  const { init, isLoggedIn } = useAuth()
  const [ref, inView] = useInView({ once: true })

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
        {data?.data.map((tier: Product, index: number) => {
          const isFreeProduct = tier?.identifier === Identifier.FREE_PRODUCT
          const isDisabled =
            isFreeProduct && !init?.user_info.free_plan_available && isLoggedIn
          return (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }} key={tier.name}>
              {inView && (
                <Animated key={`product-${index}`} order={index + 1}>
                  <ProductCard
                    selected={selected?.product_id === tier.product_id}
                    data={tier}
                    isShowChoose={isShowChoose}
                    onClick={(item: Product) => onChoose && onChoose(item)}
                    disabled={isDisabled}
                  />
                </Animated>
              )}
            </Grid>
          )
        })}
      </Grid>
      <Box ref={ref} />
    </Container>
  )
}

export default Pricing
