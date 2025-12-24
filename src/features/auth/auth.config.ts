// src/features/auth/auth.config.ts
export const AUTH_CONFIG = {
  routes: {
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    forgotPassword: '/forgot-password',
    updatePassword: '/update-password',
  },
  storage: {
    redirectKey: 'auth_redirect_to',
  }
} as const
