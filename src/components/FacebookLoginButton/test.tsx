/* eslint-disable prefer-const */
import { FB } from '@containers/FacebookOauth'
import React, { useEffect, useState } from 'react'

interface FacebookLoginProps {
  appId: string
  configId: string
  onSuccess: (response: any) => void
  onFailure: (error: any) => void
  buttonText?: string
}

declare global {
  interface Window {
    FB: FB
    fbAsyncInit: any
  }
}

const FacebookLogin: React.FC<FacebookLoginProps> = ({
  appId,
  configId,
  onSuccess,
  onFailure,
  buttonText = 'Login with Facebook',
}) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false)

  useEffect(() => {
    // Load the SDK
    ;(function (d, s, id) {
      let js: HTMLScriptElement,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s) as HTMLScriptElement
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs?.parentNode?.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')

    // Initialize the SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v22.0',
      })
      setIsSdkLoaded(true)
    }
  }, [appId])

  const handleLogin = () => {
    if (!isSdkLoaded) {
      onFailure(new Error('Facebook SDK not loaded'))
      return
    }

    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          onSuccess(response)
        } else {
          onFailure(response)
        }
      },
      {
        config_id: configId,
        auth_type: 'rerequest',
        return_scopes: true,
      }
    )
  }

  return (
    <button
      onClick={handleLogin}
      disabled={!isSdkLoaded}
      className="fb-login-button"
      data-width=""
      data-size=""
      data-button-type=""
      data-layout=""
      data-auto-logout-link="false"
      data-use-continue-as="false"
    >
      {buttonText}
    </button>
  )
}

export default FacebookLogin
