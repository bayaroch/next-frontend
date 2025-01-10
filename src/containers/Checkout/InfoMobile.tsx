import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import Info, { InfoProps } from './Info'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { calculatePrice } from '@utils/helper/common.helper'

function InfoMobile(props: InfoProps) {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation()
  const product = _.get(props.formData, 'product_id')

  const { total } = calculatePrice({
    basePrice: product?.price ? product?.price : 0,
    quantity: props.formData.quantity,
    promo: props.promoData,
  })

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={{ width: 'auto', px: 3, pb: 3, pt: 8 }} role="presentation">
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Info {...props} />
    </Box>
  )

  return (
    <>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          {t('PAYMENT.selected_products')}
        </Typography>
        {product && (
          <>
            {' '}
            <Typography variant="body1">{product.name}</Typography>
            <Typography variant="body1">{total}</Typography>
          </>
        )}
      </Box>
      <div>
        <Button
          variant="text"
          endIcon={<ExpandMoreRoundedIcon />}
          onClick={toggleDrawer(true)}
        >
          {t('PAYMENT.more_info')}
        </Button>
        <Drawer
          open={open}
          anchor="top"
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              top: 'var(--template-frame-height, 0px)',
              backgroundImage: 'none',
              backgroundColor: 'background.paper',
            },
          }}
        >
          {DrawerList}
        </Drawer>
      </div>
    </>
  )
}

export default InfoMobile
