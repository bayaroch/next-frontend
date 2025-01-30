import { FacebookIcon } from '@components/@public/CustomIcons'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import FacebookLogin, {
  SuccessResponse,
} from '@greatsumini/react-facebook-login'
import { useTranslation } from 'react-i18next'

interface FacebookLoginButtonProps {
  isLoading: boolean
  onLogin: (response: SuccessResponse) => void
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onLogin,
  isLoading,
}) => {
  const { t } = useTranslation()
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID || ''}
      fields="name,email,picture"
      initParams={{
        version: 'v21.0',
        xfbml: true,
        cookie: true,
      }}
      loginOptions={{
        auth_type: 'rerequest',
        config_id: '1179935390403786',
      }}
      onSuccess={onLogin}
      dialogParams={{
        response_type: 'code',
        redirect_uri: '/',
        state: 'facebookdirect',
      }}
      // eslint-disable-next-line no-console
      onFail={(err) => console.log('fb-error', err)}
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
