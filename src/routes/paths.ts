// src/config/paths.ts
export const APP_PATHS = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    UPDATE_PASSWORD: '/update-password',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
  },
  NOT_FOUND: '*',
} as const
