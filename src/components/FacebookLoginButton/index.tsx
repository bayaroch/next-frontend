import { FacebookIcon } from '@components/@public/CustomIcons'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import {
  ReactFacebookLoginInfo,
  ReactFacebookFailureResponse,
} from 'react-facebook-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useTranslation } from 'react-i18next'

interface FacebookLoginButtonProps {
  isLoading: boolean
  onLogin: (
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => void
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onLogin,
  isLoading,
}) => {
  const { t } = useTranslation()
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID || ''}
      autoLoad={false}
      fields="name,email,picture"
      scope="email,pages_show_list,pages_manage_posts,business_management,pages_read_user_content,pages_manage_engagement,pages_messaging,pages_manage_metadata"
      callback={onLogin}
      render={(renderProps) => (
        <LoadingButton
          fullWidth
          loading={isLoading}
          sx={{
            boxShadow: 1,
          }}
          variant="outlined"
          onClick={renderProps.onClick}
          startIcon={<FacebookIcon />}
        >
          {t('SYSCOMMON.facebook_login')}
        </LoadingButton>
      )}
    />
  )
}

export default FacebookLoginButton
