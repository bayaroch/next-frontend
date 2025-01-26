import React from 'react'
import { Stack, Typography, Button, Box, Paper, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CheckResponse } from '@services/payment.services'
import { useQueryClient } from 'react-query'
import { StyledNavigationBox } from '@containers/Checkout'
import { CheckCircleOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom'

interface PaymentCompleteProps {
  data: CheckResponse
  customButton?: {
    link: string
    text: string
  }
}

const PaymentComplete: React.FC<PaymentCompleteProps> = ({
  data,
  customButton,
}) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { transaction } = data

  return (
    <Stack spacing={3} alignItems="center">
      <CheckCircleOutline sx={{ color: 'success.main', fontSize: 54 }} />
      <Typography variant="h5">{t('PAYMENT.thank_you_order')}</Typography>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 400 }}>
        <Stack spacing={2}>
          <Typography variant="h6" gutterBottom>
            {t('PAYMENT.order_details')}
          </Typography>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              {t('PAYMENT.order_number_is')}
            </Typography>
            <Typography variant="body2">
              {transaction?.transaction_id}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              {t('PAYMENT.product_id_is')}
            </Typography>
            <Typography variant="body2">{transaction?.product_id}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              {t('PRODUCT.total_price')}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {transaction?.final_amount.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
      </Paper>
      <StyledNavigationBox>
        <Box />
        {customButton ? (
          <Link
            to={customButton.link}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button
              variant="contained"
              sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
            >
              {customButton.text}
            </Button>
          </Link>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              queryClient.invalidateQueries('appInit')
            }}
            sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
          >
            {t('PAYMENT.go_to_app')}
          </Button>
        )}
      </StyledNavigationBox>
    </Stack>
  )
}

export default PaymentComplete
