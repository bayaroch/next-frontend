import React from 'react';
import FacebookLogin from 'react-facebook-login';

interface FacebookLoginButtonProps {
  onLogin: (response: unknown) => void;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onLogin,
}) => {
  // eslint-disable-next-line no-console
  console.log(
    process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
    process.env.FACEBOOK_CLIENT_SECRET
  );
  return (
    <FacebookLogin
      appId={
        process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID
          ? process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID
          : ''
      }
      autoLoad={false}
      fields='name,email,picture'
      scope='email,pages_show_list,pages_manage_posts,pages_read_user_content,pages_manage_engagement,pages_messaging,pages_manage_metadata'
      callback={onLogin}
    />
  );
};

export default FacebookLoginButton;
