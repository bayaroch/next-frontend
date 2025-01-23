const API = process.env.REACT_APP_AUTH_API

export const URI = {
  API,
  LOGIN: '/auth/login',
  INIT: '/page/app-init',
  ADMIN_PAGES: '/page/admin',
  CONNECT: '/page/connect',
  DISCONNECT: '/page/disconnect',
  SWITCH: '/page/switch',
  AUTOMATIONS: 'automation',
  PAGE: '/page',
  SURVEY: '/user/:id/survey',
  PRODUCT: '/product',
  TRANSACTION: '/user/transaction',
  GOOGLE_LOGIN: '/auth/google/login',
  PROMO: '/promo',
  PROFILE: '/user/profile',
  USER: '/user',
}

export const excludeURI = [URI.LOGIN]
