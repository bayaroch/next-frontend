import React, { ReactNode } from 'react'
import { Box, BoxProps } from '@mui/material'
import { use100vh } from 'react-div-100vh'
import { headerHeight } from './HeaderHome'

interface SectionProps extends BoxProps {
  children: ReactNode
  background?: string
  isFull?: boolean
}

const Section: React.FC<SectionProps> = ({
  children,
  background,
  isFull = true,
  sx,
  ...rest
}) => {
  const height = use100vh()
  const contentHeight = height ? height - headerHeight - 100 : '100%'
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        minHeight: isFull ? contentHeight : 'auto',
        padding: { lg: '2rem' }, // Adjust padding as needed
        backgroundColor: background || 'inherit',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default Section
