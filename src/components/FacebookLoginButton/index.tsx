import { FacebookIcon } from '@components/@public/CustomIcons'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import FacebookLogin, {
  SuccessResponse,
} from '@greatsumini/react-facebook-login'
import { useTranslation } from 'react-i18next'
import password from 'secure-random-password'

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
      }}
      loginOptions={{
        auth_type: 'reauthenticate',
        auth_nonce: password.randomPassword({
          length: 12,
          characters: [
            password.lower,
            password.upper,
            password.digits,
            password.symbols,
          ],
        }),
      }}
      scope="email,pages_show_list,business_management,pages_read_user_content,pages_manage_engagement,pages_manage_metadata,pages_read_engagement"
      onSuccess={onLogin}
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
