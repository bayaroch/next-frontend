import { Box, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        backgroundColor: 'linear-gradient(135deg, #fff 0%, #f3f6f8 100%)',
        '&:before': {
          content: "''",
          position: 'fixed',
          left: '-22%',
          top: '60%',
          right: 0,
          width: '125%',
          height: ' 100%',
          background: 'linear-gradient(135deg, #f3f6f8 0%, #fff 100%)',
          transform: 'rotate(15deg)',
        },
      }}
    >
      {children}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
        }}
      >
        <Typography sx={{ color: '#777', fontSize: 12 }}>
          {t('SYSCOMMON.copyright')}
        </Typography>
      </Box>
    </Box>
  )
}

export default AuthLayout
