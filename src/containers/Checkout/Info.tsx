/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { AppInitResponse } from '@services/auth.services'
import { Product } from '@services/payment.services'

export interface InfoProps {
  init?: AppInitResponse
  formData: any
}

export default function Info({ init, formData }: InfoProps) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Selected plan
      </Typography>
      <Typography variant="h4" gutterBottom>
        {formData && formData.product_id ? formData.product_id.name : ''}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {}
      </Typography>
    </React.Fragment>
  )
}
