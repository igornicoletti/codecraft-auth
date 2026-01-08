import { ChartLineUpIcon } from '@phosphor-icons/react'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import type { RouteConfig } from '@/routes/types/route.types'

// Lazy load layouts and pages to optimize bundle size
const AuthLayout = lazy(() => import('@/modules/authentication/layouts/auth.layout'))
const AuthSignInPage = lazy(() => import('@/modules/authentication/pages/auth-sign-in.page'))
const AuthSignUpPage = lazy(() => import('@/modules/authentication/pages/auth-sign-up.page'))
const AuthForgotPasswordPage = lazy(() => import('@/modules/authentication/pages/auth-forgot-password.page'))
const AuthUpdatePasswordPage = lazy(() => import('@/modules/authentication/pages/auth-update-password.page'))

const AppLayout = lazy(() => import('@/modules/application/layouts/app.layout'))
const AppDashboardPage = lazy(() => import('@/modules/application/pages/app-dashboard.page'))

/**
 * Main route configuration tree.
 * Defines the hierarchy, components, and guards for the application.
 */
export const ROUTE_CONFIGS: RouteConfig[] = [
  {
    path: ROUTE_PATHS.AUTH.ROOT,
    component: AuthLayout,
    guard: 'guest',
    handle: { title: 'Autenticação', hideInSidebar: true },
    children: [
      {
        index: true,
        component: () => <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} replace />
      },
      {
        path: ROUTE_PATHS.AUTH.SIGN_IN,
        component: AuthSignInPage,
        handle: { title: 'Entrar' }
      },
      {
        path: ROUTE_PATHS.AUTH.SIGN_UP,
        component: AuthSignUpPage,
        handle: { title: 'Inscrever-se' }
      },
      {
        path: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
        component: AuthForgotPasswordPage,
        handle: { title: 'Esqueci minha senha' }
      },
      {
        path: ROUTE_PATHS.AUTH.UPDATE_PASSWORD,
        component: AuthUpdatePasswordPage,
        handle: { title: 'Atualizar senha' }
      },
    ],
  },
  {
    path: ROUTE_PATHS.APP.ROOT,
    component: AppLayout,
    guard: 'private',
    handle: { title: 'Aplicativo' },
    children: [
      {
        index: true,
        component: () => <Navigate to={ROUTE_PATHS.APP.DASHBOARD} replace />
      },
      {
        path: ROUTE_PATHS.APP.DASHBOARD,
        component: AppDashboardPage,
        handle: { title: 'Dashboard', icon: ChartLineUpIcon }
      },
    ],
  },
]
