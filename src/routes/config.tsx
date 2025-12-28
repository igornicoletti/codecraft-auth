// src/routes/config.tsx
import type { ComponentType } from 'react'

import { AuthLayout } from '@/features/auth/layouts/auth-layout'
import { lazyImport } from '@/routes/core/lazy-import'

export type RouteConfig = {
  path: string
  component: ComponentType<any>
  guard: 'private' | 'guest' | 'public'
  children?: RouteConfig[]
}

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

export const Pages = {
  Login: lazyImport(() => import('@/features/auth/pages/login'), 'LoginPage'),
  Register: lazyImport(() => import('@/features/auth/pages/register'), 'RegisterPage'),
  ForgotPass: lazyImport(() => import('@/features/auth/pages/forgot-password'), 'ForgotPasswordPage'),
  UpdatePass: lazyImport(() => import('@/features/auth/pages/update-password'), 'UpdatePasswordPage'),
  Dashboard: lazyImport(() => import('@/features/dashboard/pages/dashboard'), 'DashboardPage'),
  NotFound: lazyImport(() => import('@/routes/components/not-found'), 'NotFoundPage'),
}

export const ROUTE_LIST: RouteConfig[] = [
  {
    path: '',
    component: AuthLayout,
    guard: 'guest',
    children: [
      { path: PATHS.AUTH.LOGIN, component: Pages.Login, guard: 'guest' },
      { path: PATHS.AUTH.REGISTER, component: Pages.Register, guard: 'guest' },
      { path: PATHS.AUTH.FORGOT_PASSWORD, component: Pages.ForgotPass, guard: 'guest' },
    ],
  },
  {
    path: '',
    component: AuthLayout,
    guard: 'private',
    children: [
      { path: PATHS.AUTH.UPDATE_PASSWORD, component: Pages.UpdatePass, guard: 'private' },
    ],
  },
  {
    path: PATHS.DASHBOARD.ROOT,
    component: Pages.Dashboard,
    guard: 'private',
  },
]
