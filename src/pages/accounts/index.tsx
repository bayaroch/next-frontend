/* eslint-disable no-console */
// create basic react functional component with name AccountsPages
import { Box } from '@mui/material'
import React from 'react'
import { InstagramLogin } from '@amraneze/react-instagram-login'
import { useMutation } from 'react-query'
import { loginInstagramService } from '@services/auth.services'

const AccountsPage: React.FC = () => {
  const mutation = useMutation(loginInstagramService, {
    onSuccess: (data) => {
      // Update client context
      console.log(data)

      // Set cookie (this should ideally be done on the server side)
      // Redirect to dashboard
      //   router.push('/')
    },
  })

  const handleInstagramLogin = async (response: any) => {
    if (response.code) {
      // eslint-disable-next-line no-console
      console.log('instagram', response)
      mutation.mutate({ code: response.code })
    }
  }

  return (
    <Box>
      Instagram
      <Box>
        <InstagramLogin
          clientId={process.env.REACT_APP_INSTAGRAM_CLIENT_ID as string}
          scope={
            'instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments'
          }
          onSuccess={handleInstagramLogin}
          onFailure={(res: any) => console.log(res)}
        >
          <span> Login with Instagram</span>
        </InstagramLogin>
      </Box>
    </Box>
  )
}

export default AccountsPage
