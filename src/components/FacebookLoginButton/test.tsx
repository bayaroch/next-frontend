/* eslint-disable prefer-const */
import React, { useEffect } from 'react'

const FacebookLogin = ({
  appId,
  configId,
  onSuccess,
  onFailure,
}: {
  appId: string
  configId: string
  onSuccess: (v: any) => void
  onFailure: (v: any) => void
}) => {
  useEffect(() => {
    ;(function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s) as any
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs?.parentNode?.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v22.0',
      })
    }
  }, [appId])

  const handleLogin = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          onSuccess(response)
        } else {
          onFailure(response)
        }
      },
      { config_id: configId }
    )
  }

  return (
    <>
      <div id="fb-root"></div>
      <button
        onClick={handleLogin}
        className="fb-login-button"
        data-width=""
        data-size=""
        data-button-type=""
        data-layout=""
        data-auto-logout-link="false"
        data-use-continue-as="false"
      >
        Login with Facebook
      </button>
    </>
  )
}

export default FacebookLogin
