export const ROUTE_PATHS = {
  ROOT: '/',
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    FORGOT_PASSWORD: '/auth/forgot-password',
    UPDATE_PASSWORD: '/auth/update-password',
  },
  APP: {
    DASHBOARD: '/app/dashboard',
  },
  ANY: '*',
} as const
