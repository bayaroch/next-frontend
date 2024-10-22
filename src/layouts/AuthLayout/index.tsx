import { Box } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC<PropsWithChildren> = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  )
}

export default AuthLayout
