import SitemarkIcon from '@components/@public/SitemarkIcon'
import { InfoOutlined } from '@mui/icons-material'
import { Box, styled, Typography } from '@mui/material'
import MuiCard from '@mui/material/Card'
import { loginGoogleService } from '@services/auth.services'
import { useAuth } from 'global/AuthContext'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import Grid from '@mui/material/Grid2'
import GoogleButton from './GoogleButton'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}))
//
const InternalLoginPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { t } = useTranslation()

  const { setToken } = useAuth()
  const mutation = useMutation(loginGoogleService, {
    onSuccess: (data) => {
      // Update client context
      setToken(data.access_token)

      // Set cookie (this should ideally be done on the server side)

      // Redirect to dashboard
      //   router.push('/')
    },
  })

  const handleGoogleLogin = async (response: any) => {
    console.warn(response)
    if (response.google_access_token) {
      mutation.mutate({
        google_access_token: response.google_access_token,
      })
    }
  }

  return (
    <Grid
      container
      sx={{
        height: {
          xs: '100%',
          sm: 'calc(100dvh - var(--template-frame-height, 0px))',
        },
        mt: { xs: 4, sm: 0 },
      }}
    >
      <Grid
        size={{ sm: 12, md: 12, lg: 12 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          width: '100%',
          alignItems: 'start',
          py: { xs: 0, sm: 16 },
          px: { xs: 2, sm: 10 },
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: { sm: '100%', md: '100%' },
            gap: 4,
            height: '100%',
          }}
        >
          <Card variant="outlined">
            <Box sx={{ display: { xs: 'flex' } }}>
              <SitemarkIcon />
            </Box>
            <Typography sx={{ color: '#666' }}>
              <Box component={'span'} sx={{ pr: 0.5, color: '#333' }}>
                <InfoOutlined
                  sx={{ fontSize: 16, position: 'relative', top: 4 }}
                />
              </Box>
              {t('LOGIN.become_partner')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <GoogleButton width="100%" onSuccess={handleGoogleLogin} />
                {mutation.isLoading && <p>{t('LOGIN.loggingIn')}</p>}
                {mutation.isError &&
                  t('LOGIN.loggingIn', {
                    error: (mutation.error as Error).message,
                  })}
              </Box>
            </Box>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}

export default InternalLoginPage
