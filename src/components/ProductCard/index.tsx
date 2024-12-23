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

interface ProductCardProps {
  data: Product
  onClick: (data: Product) => void
  selected?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  onClick,
  selected,
}) => {
  const isProfessional = false

  const { name, price, description, additional_settings, duration_days } = data

  const { t } = useTranslation()

  return (
    <Card
      onClick={() => onClick(data)}
      sx={[
        {
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          border: selected ? `1px solid #555` : '1px solid #ccc',
        },
        isProfessional &&
          ((theme) => ({
            border: 'none',
            background:
              'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
            boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
            ...theme.applyStyles('dark', {
              background:
                'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
              boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
            }),
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
            isProfessional ? { color: 'grey.100' } : { color: '' },
          ]}
        >
          <Typography component="h3" variant="h6">
            {name}
          </Typography>
          {/* {isProfessional && (
            <Chip icon={<AutoAwesomeIcon />} label={subheader} />
          )} */}
        </Box>
        <Box
          sx={[
            {
              display: 'flex',
              alignItems: 'baseline',
            },
            isProfessional ? { color: 'grey.50' } : { color: null },
          ]}
        >
          <Typography component="h3" sx={{ mb: 1 }} variant="h2">
            {price}₮
          </Typography>
        </Box>
        <Box>Duration: {duration_days}</Box>
        <Divider sx={{ my: 1, opacity: 0.8, borderColor: 'divider' }} />
        <Box>{description}</Box>
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
                isProfessional
                  ? { color: 'primary.light' }
                  : { color: 'primary.main' },
              ]}
            />
            <Typography
              variant="subtitle2"
              component={'span'}
              sx={[isProfessional ? { color: 'grey.50' } : { color: null }]}
            >
              {line.value}
            </Typography>
          </Box>
        ))}
      </CardContent>
      <CardActions>
        <Button fullWidth variant={'outlined'} color={'primary'}>
          {t('PRODUCT.choose')}
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
