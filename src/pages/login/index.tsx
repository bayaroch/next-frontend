import LoginContent from '@components/@public/LoginContent'
import SitemarkIcon from '@components/@public/SitemarkIcon'
import FacebookLoginButton from '@components/FacebookLoginButton'
import { Box, Stack, styled, Typography } from '@mui/material'
import MuiCard from '@mui/material/Card'
import { loginService } from '@services/auth.services'
import { useAuth } from 'global/AuthContext'
import React from 'react'
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
    <Box>
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <LoginContent />
            <Card variant="outlined">
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <SitemarkIcon />
              </Box>
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
              >
                Sign in
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: 2,
                }}
              >
                <Box>Accept all permission to use our feature</Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FacebookLoginButton onLogin={handleFacebookLogin} />
                  {mutation.isLoading && <p>Logging in...</p>}
                  {mutation.isError && (
                    <p>Error: {(mutation.error as Error).message}</p>
                  )}
                </Box>
              </Box>
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default LoginPage
