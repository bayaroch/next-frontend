export const URI = {
  API: process.env.NEXT_PUBLIC_BACKEND_API,
  LOGIN: '/auth/login',
  FACEBOOK_LOGIN: '/auth/login',
  // Add other endpoints as needed
};

export const excludeURI = [URI.LOGIN, URI.FACEBOOK_LOGIN];
