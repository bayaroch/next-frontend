import { ButtonProps } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import { GoogleLoginParams } from '@services/auth.services'

type GoogleLoginProps = {
  onSuccess?: (response: GoogleLoginParams) => void
  onFailure?: (error: any) => void
  width: string
} & ButtonProps

const GoogleButton: React.FC<GoogleLoginProps> = ({
  onSuccess,
  onFailure,
  width,
}) => {
  const handleResponse = async (response: any) => {
    !!onSuccess &&
      onSuccess({
        access_token: response.credential,
      })
  }

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        handleResponse(credentialResponse)
      }}
      theme={'outline'}
      size="large"
      width={width}
      useOneTap
      onError={() => {
        // eslint-disable-next-line no-console
        onFailure && onFailure('failed')
      }}
    />
  )
}
export default GoogleButton
