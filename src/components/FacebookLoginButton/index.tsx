import { FacebookIcon } from '@components/@public/CustomIcons'
import { Button } from '@mui/material'
import React from 'react'
import {
  ReactFacebookLoginInfo,
  ReactFacebookFailureResponse,
} from 'react-facebook-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

interface FacebookLoginButtonProps {
  onLogin: (
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => void
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onLogin,
}) => {
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID || ''}
      autoLoad={false}
      fields="name,email,picture"
      scope="email,pages_show_list,pages_manage_posts,business_management,pages_read_user_content,pages_manage_engagement,pages_messaging,pages_manage_metadata"
      callback={onLogin}
      render={(renderProps) => (
        <Button
          fullWidth
          variant="outlined"
          onClick={renderProps.onClick}
          startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button>
      )}
    />
  )
}

export default FacebookLoginButton
