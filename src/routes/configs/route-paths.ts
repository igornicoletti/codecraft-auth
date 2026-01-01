export const ROUTE_PATHS = {
  ROOT: '/',
  AUTH: {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    FORGOT_PASSWORD: '/forgot-password',
    UPDATE_PASSWORD: '/update-password',
  },
  APP: {
    DASHBOARD: '/dashboard',
  },
  ANY: '*',
} as const
