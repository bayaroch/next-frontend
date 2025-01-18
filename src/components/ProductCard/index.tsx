import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import { Product } from '@services/payment.services'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { formatPrice } from '@utils/helper/common.helper'
import { Identifier } from '@constants/common.constants'
import { Chip } from '@mui/material'
import { AutoAwesome, NotInterestedOutlined } from '@mui/icons-material'

interface ProductCardProps {
  data: Product
  onClick?: (data: Product) => void
  selected?: boolean
  isShowChoose?: boolean
  disabled?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  onClick,
  selected,
  isShowChoose = true,
  disabled = false,
}) => {
  const { name, price, description, additional_settings, duration_days } = data

  const isRecommended = _.get(data, 'identifier') === Identifier.RECOMMENDED

  const { t } = useTranslation()

  return (
    <Card
      elevation={3}
      onClick={() => onClick && !disabled && onClick(data)}
      sx={[
        {
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          border: selected ? `1px solid #555` : '1px solid transparent',
          boxShadow: 1,
        },
        isRecommended &&
          ((theme) => ({
            background:
              'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
            boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
            ...theme.applyStyles('dark', {
              background:
                'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
              boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
            }),
            border: selected
              ? `1px solid ${theme.palette.primary.main}`
              : '1px solid #ccc',
          })),
      ]}
    >
      <CardContent>
        <Box
          sx={[
            {
              mb: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            },
            isRecommended ? { color: 'grey.100' } : { color: '' },
          ]}
        >
          <Typography component="h3" variant="h6">
            {name}
          </Typography>
          {isRecommended && (
            <Chip icon={<AutoAwesome />} label={t('PRODUCT.recommended')} />
          )}
          {disabled && (
            <Chip
              icon={<NotInterestedOutlined />}
              label={t('PRODUCT.already_used')}
            />
          )}
        </Box>
        <Box
          sx={[
            {
              display: 'flex',
              alignItems: 'baseline',
            },
            isRecommended ? { color: 'grey.50' } : { color: null },
          ]}
        >
          <Typography component="h4" sx={{ mb: 1 }} variant="h3">
            {price === 0 ? 'free' : `${formatPrice(price)}`}
          </Typography>
        </Box>
        <Box sx={[isRecommended ? { color: 'grey.50' } : { color: null }]}>
          {t('PRODUCT.duration_days')}: {duration_days}
        </Box>
        <Divider sx={{ my: 1, opacity: 0.8, borderColor: 'divider' }} />
        <Box sx={[isRecommended ? { color: 'grey.50' } : { color: null }]}>
          {description}
        </Box>
        <Divider sx={{ my: 1, opacity: 0.8, borderColor: 'divider' }} />
        {additional_settings.map((line: { key: string; value: string }) => (
          <Box
            key={line.key}
            sx={{
              py: 1,
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <CheckCircleRoundedIcon
              sx={[
                {
                  width: 20,
                },
                isRecommended
                  ? { color: 'primary.light' }
                  : { color: 'primary.main' },
              ]}
            />
            <Typography
              variant="subtitle2"
              component={'span'}
              sx={[isRecommended ? { color: 'grey.50' } : { color: null }]}
            >
              {t(`FEATURES.${line.value}`)}
            </Typography>
          </Box>
        ))}
      </CardContent>
      {isShowChoose && !disabled && (
        <CardActions>
          <Button
            fullWidth
            disabled={selected}
            variant={'outlined'}
            color={'primary'}
          >
            {selected ? t('PRODUCT.selected') : t('PRODUCT.choose')}
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default ProductCard
