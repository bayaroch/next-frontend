import SitemarkIcon from '@components/@public/SitemarkIcon'
import FacebookLoginButton from '@components/FacebookLoginButton'
import { InfoOutlined } from '@mui/icons-material'
import { Box, Stack, styled, Typography } from '@mui/material'
import MuiCard from '@mui/material/Card'
import { loginService } from '@services/auth.services'
import { useAuth } from 'global/AuthContext'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

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

const LoginPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { t } = useTranslation()

  const { setToken } = useAuth()
  const mutation = useMutation(loginService, {
    onSuccess: (data) => {
      // Update client context
      setToken(data.access_token)

      // Set cookie (this should ideally be done on the server side)

      // Redirect to dashboard
      //   router.push('/')
    },
  })

  const handleFacebookLogin = async (response: any) => {
    if (response.accessToken) {
      mutation.mutate({ fb_access_token: response.accessToken })
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Column */}
      <Box
        sx={{
          flex: '0 0 60%',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          p: 4,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Stack
          direction="column"
          sx={{
            justifyContent: 'center',
            gap: 3,
            maxWidth: '600px',
            margin: 'auto',
          }}
        >
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box component="img" width="240px" src="images/logo-full.png" />
          </Box>
          <Typography variant="h2" sx={{ mb: 0, p: 0 }}>
            {t('LOGIN.welcomeTitle')}
          </Typography>
          <Typography variant="h5">{t('HOME.slogan_two')}</Typography>
          <Typography>{t('LOGIN.welcomeDescription')}</Typography>
        </Stack>
      </Box>

      {/* Right Column */}
      <Box
        sx={{
          flex: { xs: '1', md: '0 0 40%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, sm: 4 },
          background: "url('images/hero-illustration.svg') top right no-repeat",
        }}
      >
        <Card variant="outlined">
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <SitemarkIcon />
          </Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(1.5rem, 10vw, 1.85rem)' }}
          >
            {t('LOGIN.signIn')}
          </Typography>
          <Typography>
            <Box component={'span'} sx={{ pr: 0.5 }}>
              <InfoOutlined
                sx={{ fontSize: 16, position: 'relative', top: 4 }}
              />
            </Box>
            {t('LOGIN.permissionInfo')}
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
              <FacebookLoginButton onLogin={handleFacebookLogin} />
              {mutation.isLoading && <p>{t('LOGIN.loggingIn')}</p>}
              {mutation.isError &&
                t('LOGIN.loggingIn', {
                  error: (mutation.error as Error).message,
                })}
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default LoginPage
