import { URI } from '@/constants/uri.constants';

import api from './api';
interface FacebookLoginPayload {
  fb_access_token: string;
}

interface FacebookLoginResponse {
  // Define the response structure here
  // For now, we'll use 'any' as requested
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export async function sendFacebookTokenToBackend(
  token: string
): Promise<FacebookLoginResponse> {
  const payload: FacebookLoginPayload = { fb_access_token: token };

  const response = await api.post(URI.LOGIN, payload);

  if (!response) {
    throw new Error('Failed to authenticate with the backend');
  }

  return response;
}
