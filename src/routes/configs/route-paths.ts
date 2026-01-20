export const ROUTE_PATHS = {
  ROOT: '/',
  AUTH: {
    ROOT: '/auth',
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    UPDATE_PASSWORD: '/auth/update-password',
  },
  APP: {
    ROOT: '/app',
    DASHBOARD: '/app/dashboard',
  },
  ANY: '*',
} as const
