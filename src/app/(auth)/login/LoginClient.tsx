'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

import { useClientContext } from '@/hooks/useClientContext';

import FacebookLoginButton from '@/components/FacebookLoginButton';

import { sendFacebookTokenToBackend } from '@/services/auth.service';

export default function LoginClient() {
  const router = useRouter();
  const { updateClientCtx } = useClientContext();
  const mutation = useMutation(sendFacebookTokenToBackend, {
    onSuccess: (data) => {
      // Update client context
      updateClientCtx({ isLoggedIn: true, user: data.user });

      // Set cookie (this should ideally be done on the server side)
      document.cookie = `auth_token=${data.token}; path=/; max-age=604800; secure; samesite=strict`;

      // Redirect to dashboard
      router.push('/');
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFacebookLogin = async (response: any) => {
    if (response.accessToken) {
      mutation.mutate(response.accessToken);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Sign in to your account</p>
      <FacebookLoginButton onLogin={handleFacebookLogin} />
      {mutation.isLoading && <p>Logging in...</p>}
      {mutation.isError && <p>Error: {(mutation.error as Error).message}</p>}
    </div>
  );
}
