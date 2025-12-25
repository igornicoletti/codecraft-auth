// src/routes/config.tsx
import type { ComponentType } from 'react'

import { lazyImport } from '@/routes/core/lazy-import'

export type RouteConfig = {
  path: string
  component: ComponentType<any>
  guard: 'private' | 'guest' | 'public'
  children?: RouteConfig[]
}

// 1. Definição Única de Caminhos
export const PATHS = {
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
  ANY: '*',
} as const

// 2. Definição Única de Lazy Pages
export const Pages = {
  Login: lazyImport(() => import('@/features/auth/pages/login'), 'LoginPage'),
  Register: lazyImport(() => import('@/features/auth/pages/register'), 'RegisterPage'),
  ForgotPass: lazyImport(() => import('@/features/auth/pages/forgot-password'), 'ForgotPasswordPage'),
  UpdatePass: lazyImport(() => import('@/features/auth/pages/update-password'), 'UpdatePasswordPage'),
  Dashboard: lazyImport(() => import('@/features/dashboard/pages/dashboard'), 'DashboardPage'),
  NotFound: lazyImport(() => import('@/routes/components/not-found'), 'NotFoundPage'),
}

// 3. Lista de Rotas
export const ROUTE_LIST: RouteConfig[] = [
  { path: PATHS.AUTH.LOGIN, component: Pages.Login, guard: 'guest' },
  { path: PATHS.AUTH.REGISTER, component: Pages.Register, guard: 'guest' },
  { path: PATHS.AUTH.FORGOT_PASSWORD, component: Pages.ForgotPass, guard: 'guest' },
  { path: PATHS.AUTH.UPDATE_PASSWORD, component: Pages.UpdatePass, guard: 'private' },
  { path: PATHS.DASHBOARD.ROOT, component: Pages.Dashboard, guard: 'private' },
]
