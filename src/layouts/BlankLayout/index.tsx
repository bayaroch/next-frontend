import { Box } from '@mui/material'
import React, { PropsWithChildren } from 'react'

const BlankLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Box>{children}</Box>
}

export default BlankLayout
