/* eslint-disable no-console */
// create basic react functional component with name AccountsPages
import { Box } from '@mui/material'
import React from 'react'
import { InstagramLogin } from '@amraneze/react-instagram-login'

const AccountsPage: React.FC = () => {
  return (
    <Box>
      Instagram
      <Box>
        <InstagramLogin
          clientId={process.env.REACT_APP_INSTAGRAM_CLIENT_ID as string}
          scope={
            'instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments'
          }
          onSuccess={(res: any) => console.log(res)}
          onFailure={(res: any) => console.log(res)}
        >
          <span> Login with Instagram</span>
        </InstagramLogin>
      </Box>
    </Box>
  )
}

export default AccountsPage
