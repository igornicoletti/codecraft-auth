// src/routes/constants/paths.ts
export const PATHS = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    UPDATE_PASSWORD: '/update-password',
  },
  APP: {
    DASHBOARD: '/dashboard',
  },
  ANY: '*',
} as const
