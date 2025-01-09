/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { AppInitResponse } from '@services/auth.services'
import { Product, Promo } from '@services/payment.services'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Box, Divider } from '@mui/material'
import PriceCalculator from './PriceCalculator'
import { calculatePrice } from '@utils/helper/common.helper'

export interface InfoProps {
  init?: AppInitResponse
  formData: any
  promoData: Promo | null
  activeStep: number
}

export default function Info({
  init,
  formData,
  promoData,
  activeStep,
}: InfoProps) {
  const { t } = useTranslation()
  const product: Product | null = _.get(formData, 'product_id', null)
  const { discountAmount, subtotal, total } = calculatePrice({
    basePrice: product?.price ? product?.price : 0,
    quantity: formData.quantity,
    promo: promoData,
  })
  return (
    <React.Fragment>
      {product && (
        <>
          <List disablePadding>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {t('PAYMENT.selected_products')}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {formData.product_id.name}
            </Typography>
            {activeStep >= 1 ? (
              <>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    sx={{ mr: 2 }}
                    primary={t('PRODUCT.amount')}
                    secondary={''}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {formData.quantity}
                  </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    sx={{ mr: 2 }}
                    primary={t('PRODUCT.total_duration')}
                    secondary={t('PRODUCT.total_duration_desc')}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {formData.quantity * product.duration_days} days
                  </Typography>
                </ListItem>

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    sx={{ mr: 2 }}
                    primary={t('PRODUCT.promo_info')}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                    {promoData
                      ? promoData.promo_code
                      : t('PAYMENT.promo_not_applied')}
                  </Typography>
                </ListItem>

                <Divider />

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    sx={{ mr: 2 }}
                    primary={t('PRODUCT.sub_total')}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {subtotal}
                  </Typography>
                </ListItem>

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    sx={{ mr: 2 }}
                    primary={t('PRODUCT.discount')}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {discountAmount ? `- ${discountAmount}` : ''}
                  </Typography>
                </ListItem>

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    sx={{
                      mr: 2,
                      '& .MuiListItemText-primary': { fontSize: 20 },
                    }}
                    primary={t('PRODUCT.total_price')}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'medium', fontSize: 22 }}
                  >
                    {product.price === 0 ? 'Free' : total}
                  </Typography>
                </ListItem>
              </>
            ) : null}
          </List>
        </>
      )}
    </React.Fragment>
  )
}
