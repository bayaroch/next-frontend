import React from 'react'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ContactAdminProps {
  reason?: string
  onLogout: () => void
}
const ContactAdmin: React.FC<ContactAdminProps> = ({ reason, onLogout }) => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        background: '#fff',
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
        flexDirection: 'column',
        zIndex: 9999,
        visibility: 'visible',
        opacity: 1,
        transition: 'transform 0.6s ease',
        '&.loaded': {
          visibility: 'hidden',
          opacity: 0,
          transform: 'translate(0)',
        },
      }}
    >
      <Typography variant="h1" gutterBottom>
        {t('SYSCOMMON.failed_to_init_app')}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {t('SYSCOMMON.contact_admin')}
        <a href="#" style={{ color: '#007bff', paddingLeft: 10 }}>
          Email
        </a>
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        {reason ? reason : t('SYSCOMMON.user_data')}
      </Typography>
      <Button
        variant="contained"
        onClick={() => onLogout()}
        sx={{ mt: 3 }}
        color="primary"
      >
        {t('SYSCOMMON.sign_out_to_home')}
      </Button>
    </Box>
  )
}

export default ContactAdmin
