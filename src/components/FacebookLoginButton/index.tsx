import { FacebookIcon } from '@components/@public/CustomIcons'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import FacebookLogin, { SuccessResponse } from '@containers/FacebookOauth'
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
    <>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID || ''}
        initParams={{
          version: 'v21.0',
          xfbml: true,
          cookie: true,
        }}
        loginOptions={{
          auth_type: 'rerequest',
          config_id: '1508167539877556',
        }}
        dialogParams={{
          response_type: 'code',
          redirect_uri: '/',
          state: 'facebookdirect',
        }}
        onSuccess={onLogin}
        // eslint-disable-next-line no-console
        onFail={(err) => console.log('fb-error', err)}
        scope="email,public_profile"
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
    </>
  )
}

export default FacebookLoginButton
