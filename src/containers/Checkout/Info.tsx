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

export interface InfoProps {
  init?: AppInitResponse
  formData: any
  promoData: Promo | null
}

export default function Info({ init, formData, promoData }: InfoProps) {
  const { t } = useTranslation()
  const product: Product | null = _.get(formData, 'product_id', null)
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Selected plan
      </Typography>
      {product && (
        <>
          <Typography variant="h4" gutterBottom>
            {formData.product_id.name}
          </Typography>
          <List disablePadding>
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
                secondary={'PRODUCT.total_duration_desc'}
              />
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {formData.quantity * product.duration_days} days
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                sx={{ mr: 2 }}
                primary={t('PRODUCT.promo_code')}
                secondary={'PRODUCT.promo_code_desc'}
              />
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {formData.promo_code ? formData.promo_code : 'Not applied'}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                sx={{ mr: 2 }}
                primary={t('PRODUCT.total_price')}
                secondary={'PRODUCT.total_price_desc'}
              />
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {product.price === 0
                  ? 'Free'
                  : formData.quantity * product.price}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                sx={{ mr: 2 }}
                primary={t('PRODUCT.promo_info')}
                secondary={'PRODUCT.promo_desc'}
              />
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {promoData ? promoData.promo_code : 'No promo code applied'}
              </Typography>
            </ListItem>
          </List>
        </>
      )}
    </React.Fragment>
  )
}
