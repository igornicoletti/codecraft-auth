// src/routes/config/auth.routes.ts
import { AuthLayout } from '@/features/auth/layouts/auth-layout'
import { PATHS } from '@/routes/constants/paths'
import { lazyImport } from '@/routes/core/lazy-import'
import type { RouteConfig } from '@/routes/types'

const Pages = {
  Login: lazyImport(() => import('@/features/auth/pages/login'), 'LoginPage'),
  Register: lazyImport(() => import('@/features/auth/pages/register'), 'RegisterPage'),
  ForgotPass: lazyImport(() => import('@/features/auth/pages/forgot-password'), 'ForgotPasswordPage'),
  UpdatePass: lazyImport(() => import('@/features/auth/pages/update-password'), 'UpdatePasswordPage'),
}

export const authRoutes: RouteConfig = {
  path: '',
  component: AuthLayout,
  guard: 'guest',
  children: [
    { path: PATHS.AUTH.LOGIN, component: Pages.Login, guard: 'guest' },
    { path: PATHS.AUTH.REGISTER, component: Pages.Register, guard: 'guest' },
    { path: PATHS.AUTH.FORGOT_PASSWORD, component: Pages.ForgotPass, guard: 'guest' },
    { path: PATHS.AUTH.UPDATE_PASSWORD, component: Pages.UpdatePass, guard: 'private' },
  ]
}
