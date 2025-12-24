import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export const lazyImport = <M extends Record<string, ComponentType<any>>, K extends keyof M>(
  factory: () => Promise<M>,
  name: K,
  delay = 800
): LazyExoticComponent<M[K]> =>
  lazy(async () => {
    try {
      const [module] = await Promise.all([
        factory(),
        new Promise((resolve) => setTimeout(resolve, delay)),
      ])
      return { default: module[name] }
    } catch (error) {
      console.error(`[LazyImport Error] Failed to load component: ${String(name)}`, error)
      throw error
    }
  })

export const LazyLoaded = {
  LoginPage: lazyImport(() => import('@/features/auth/pages/login'), 'LoginPage'),
  RegisterPage: lazyImport(() => import('@/features/auth/pages/register'), 'RegisterPage'),
  ForgotPasswordPage: lazyImport(() => import('@/features/auth/pages/forgot-password'), 'ForgotPasswordPage'),
  UpdatePasswordPage: lazyImport(() => import('@/features/auth/pages/update-password'), 'UpdatePasswordPage'),
  DashboardPage: lazyImport(() => import('@/features/dashboard/pages/dashboard'), 'DashboardPage'),
}
