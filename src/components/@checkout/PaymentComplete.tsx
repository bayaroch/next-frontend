import React from 'react'
import { Stack, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CheckResponse } from '@services/payment.services'
import { useQueryClient } from 'react-query'

interface PaymentCompleteProps {
  data: CheckResponse
}

const PaymentComplete: React.FC<PaymentCompleteProps> = ({ data }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  // Assuming CheckResponse has a property for order number.
  // Adjust this based on your actual data structure
  const orderNumber = data.transaction?.transaction_id || '' // Fallback to a default if not available
  const productNumber = data.transaction?.product_id || '' // Fallback to a default if not available

  return (
    <Stack spacing={2} useFlexGap>
      <Typography variant="h1">📦</Typography>
      <Typography variant="h5">{t('PAYMENT.thank_you_order')}</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {t('PAYMENT.order_number_is')}#{orderNumber}.
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {t('PAYMENT.product_id_is')}#{productNumber}.
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          queryClient.invalidateQueries('appInit')
        }}
        sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
      >
        {t('PAYMENT.go_to_app')}
      </Button>
    </Stack>
  )
}

export default PaymentComplete
