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
  // eslint-disable-next-line no-console
  console.log(
    process.env.REACT_APP_FACEBOOK_CLIENT_ID,
    process.env.FACEBOOK_CLIENT_SECRET
  )

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID || ''}
      autoLoad={false}
      fields="name,email,picture"
      scope="email,pages_show_list,pages_manage_posts,pages_read_user_content,pages_manage_engagement,pages_messaging,pages_manage_metadata"
      callback={onLogin}
      render={(renderProps) => (
        <button onClick={renderProps.onClick}>
          This is my custom FB button
        </button>
      )}
    />
  )
}

export default FacebookLoginButton
