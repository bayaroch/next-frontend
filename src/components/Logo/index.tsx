import React from 'react'
import { Box, BoxProps } from '@mui/material'
import { Link } from 'react-router-dom'

interface LogoProps extends BoxProps {
  colorless?: boolean
}

const Logo: React.FC<LogoProps> = ({ sx }) => {
  return (
    <Box sx={{ display: 'inline-flex', ...sx }}>
      <Link to={'/'}>
        <img src={'/images/logo-full.png'} alt="PMT" />
      </Link>
    </Box>
  )
}

export default Logo
