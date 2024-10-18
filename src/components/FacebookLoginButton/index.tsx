import React from 'react';
import FacebookLogin from 'react-facebook-login';

interface FacebookLoginButtonProps {
  onLogin: (response: unknown) => void;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onLogin,
}) => {
  return (
    <FacebookLogin
      appId='1200876394326450'
      autoLoad={false}
      fields='name,email,picture'
      scope='email,pages_show_list,pages_manage_posts,pages_read_user_content,pages_manage_engagement,pages_messaging,pages_manage_metadata'
      callback={onLogin}
    />
  );
};

export default FacebookLoginButton;
