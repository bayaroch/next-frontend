/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, useMediaQuery } from '@mui/material'
import theme from '@theme/index'
import React, { useContext } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PublicLayoutContext } from './PublicProvider'
import AppAppBar from '@components/@public/AppBar'
import Footer from '@components/@public/Footer'

const PublicLayout: React.FC = () => {
  const { menuOpen, setMenuOpen } = useContext(PublicLayoutContext)
  const location = useLocation()
  const navigate = useNavigate()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box>
      <AppAppBar />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default PublicLayout
