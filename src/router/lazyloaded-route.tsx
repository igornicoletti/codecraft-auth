import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

const lazyImport = <
  M extends Record<string, ComponentType<any>>,
  K extends keyof M
>(factory: () => Promise<M>, name: K): LazyExoticComponent<M[K]> => {
  return lazy(() =>
    factory().then((module) => ({
      default: module[name],
    }))
  )
}

export const LazyLoadedRoute = {
  DashboardPage: lazyImport(() => import('@/features/dashboard/dashboard'), 'DashboardPage'),
  RegisterPage: lazyImport(() => import('@/features/auth/pages/register'), 'RegisterPage'),
  LoginPage: lazyImport(() => import('@/features/auth/pages/login'), 'LoginPage'),
  ForgotPasswordPage: lazyImport(() => import('@/features/auth/pages/forgot-password'), 'ForgotPasswordPage'),
  UpdatePasswordPage: lazyImport(() => import('@/features/auth/pages/update-password'), 'UpdatePasswordPage'),
  NotFoundPage: lazyImport(() => import('@/components/common/not-found'), 'NotFoundPage'),
  ProtectedRoute: lazyImport(() => import('@/router/protected-route'), 'ProtectedRoute'),
}
