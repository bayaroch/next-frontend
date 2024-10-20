import FacebookLoginButton from '@components/FacebookLoginButton'
import { Box } from '@mui/material'
import { loginService } from '@services/auth.services'
import { useAuth } from 'global/AuthContext'
import React from 'react'
import { useMutation } from 'react-query'

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
      <FacebookLoginButton onLogin={handleFacebookLogin} />
      {mutation.isLoading && <p>Logging in...</p>}
      {mutation.isError && <p>Error: {(mutation.error as Error).message}</p>}
    </Box>
  )
}

export default LoginPage
