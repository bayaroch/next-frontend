import React from 'react'
import { Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom' // If you're using React Router, otherwise, use your preferred routing library
import { useTranslation } from 'react-i18next'

const PermissionDenied: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight={300}
    >
      <Typography variant="h1" gutterBottom>
        {t('SYSCOMMON.permission_denied_code')}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {t('SYSCOMMON.denied_title')}
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        {t('SYSCOMMON.denied_desc')}
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

export default PermissionDenied
