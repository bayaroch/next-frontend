const API = process.env.REACT_APP_AUTH_API

export const URI = {
  API,
  LOGIN: '/auth/login',
}

export const excludeURI = [URI.LOGIN]
