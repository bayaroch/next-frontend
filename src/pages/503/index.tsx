import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom' // If you're using React Router, otherwise, use your preferred routing library
import { useTranslation } from 'react-i18next'
import { NotAccessible } from '@mui/icons-material'

const NotAvailable: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ background: '#fff' }}
    >
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <NotAccessible />
      </Box>
      <Typography variant="h1" gutterBottom>
        {t('SYSCOMMON.not_available_code')}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {t('SYSCOMMON.not_available_title')}
      </Typography>
      <Button
        data-test-id="home"
        variant="contained"
        component={Link}
        to="/"
        sx={{ mt: 3 }}
        color="primary"
      >
        {t('SYSCOMMON.go_to_home')}
      </Button>
    </Box>
  )
}

export default NotAvailable
