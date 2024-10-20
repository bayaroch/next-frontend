import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

// Define types for menu items

const PublicFooter: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      sx={{
        minHeight: 'auto',
        backgroundImage: 'url(images/background-strip.svg)',
        backgroundPosition: '30% 43%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '120%',
        overflow: 'hidden',
        position: 'relative',
        pb: { md: 2, sm: 2 },
        backgroundColor: (theme) => theme.palette.secondary.main,
        pt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {t('SYSCOMMON.copyright')}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default PublicFooter
