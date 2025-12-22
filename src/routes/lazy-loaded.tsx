import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

const lazyImport = <M extends Record<string, ComponentType<any>>, K extends keyof M>(
  factory: () => Promise<M>,
  name: K
): LazyExoticComponent<M[K]> => {
  return lazy(() => factory().then((module) => ({ default: module[name] })))
}

export const LazyLoaded = {
  LoginPage: lazyImport(() => import('@/features/auth/pages/login'), 'LoginPage'),
  RegisterPage: lazyImport(() => import('@/features/auth/pages/register'), 'RegisterPage'),
  ForgotPasswordPage: lazyImport(() => import('@/features/auth/pages/forgot-password'), 'ForgotPasswordPage'),
  UpdatePasswordPage: lazyImport(() => import('@/features/auth/pages/update-password'), 'UpdatePasswordPage'),
  DashboardPage: lazyImport(() => import('@/features/dashboard/pages/dashboard'), 'DashboardPage'),
  ProtectedRoute: lazyImport(() => import('@/routes/guards/protected-route'), 'ProtectedRoute'),
  PublicRoute: lazyImport(() => import('@/routes/guards/public-route'), 'PublicRoute'),
  NotFoundPage: lazyImport(() => import('@/routes/components/not-found'), 'NotFoundPage'),
}
