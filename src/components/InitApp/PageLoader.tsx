import React from 'react'
import Box from '@mui/material/Box'
import { HEADER } from '@constants/layouts.constants'
import { Skeleton } from '@mui/material'

const PageLoader: React.FC = () => {
  const spacingX = { xl: 8, lg: 4, md: 2, xs: 2, sm: 2 }
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          width: '100%',
          background: (theme) => theme.palette.secondary.main,
          pt: `${HEADER.height}px`,
          backgroundSize: 'cover',
          position: 'relative',
          '&:after': {
            display: 'none',
            position: 'absolute',
            content: '""',
            inset: '0px',
            backgroundColor: 'rgba(39, 38, 38, 0.8)',
            pointerEvents: 'none',
          },
        }}
        className="content-header"
      >
        <Box
          sx={{
            px: spacingX,
            position: 'relative',
            zIndex: 100,
            pt: 2,
            pb: '60px',
          }}
        >
          <Box sx={{ height: 27, pb: 2 }}>
            <Skeleton variant="text" width={100} height={24} />
          </Box>
          <Box sx={{ pt: 2 }}>
            <Skeleton variant="text" width={200} height={26} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          px: { xl: 8, lg: 4, md: 2, xs: 2, sm: 2 },
          top: -40,
          position: 'relative',
          minHeight: 200,
        }}
      >
        <Box
          sx={{
            background: 'transparent',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            visibility: 'visible',
            pointerEvents: 'none',
            transition: 'transform 0.6s ease',
            '&.loaded': {
              visibility: 'hidden',
              opacity: 0,
              transform: 'translate(0)',
            },
          }}
        ></Box>
      </Box>
    </Box>
  )
}

export default PageLoader
