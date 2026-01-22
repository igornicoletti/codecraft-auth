import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import { ROUTE_METADATA } from '@/routes/configs/route-metadata'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import type { RouteConfig } from '@/routes/types/route.types'

const AuthLayout = lazy(() => import('@/modules/authentication/layouts/auth.layout'))
const AuthSignInPage = lazy(() => import('@/modules/authentication/pages/auth-sign-in.page'))
const AuthSignUpPage = lazy(() => import('@/modules/authentication/pages/auth-sign-up.page'))
const AuthVerifyEmailPage = lazy(() => import('@/modules/authentication/pages/auth-verify-email.page'))
const AuthForgotPasswordPage = lazy(() => import('@/modules/authentication/pages/auth-forgot-password.page'))
const AuthUpdatePasswordPage = lazy(() => import('@/modules/authentication/pages/auth-update-password.page'))

const AppLayout = lazy(() => import('@/modules/application/layouts/app.layout'))
const AppDashboardPage = lazy(() => import('@/modules/application/pages/app-dashboard.page'))

export const ROUTE_CONFIGS: RouteConfig[] = [
  {
    path: ROUTE_PATHS.AUTH.ROOT,
    component: AuthLayout,
    guard: 'guest',
    children: [
      {
        index: true,
        component: () => <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} replace />,
      },
      {
        path: ROUTE_PATHS.AUTH.SIGN_IN,
        component: AuthSignInPage,
        handle: ROUTE_METADATA[ROUTE_PATHS.AUTH.SIGN_IN],
      },
      {
        path: ROUTE_PATHS.AUTH.SIGN_UP,
        component: AuthSignUpPage,
        handle: ROUTE_METADATA[ROUTE_PATHS.AUTH.SIGN_UP],
      },
      {
        path: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
        component: AuthForgotPasswordPage,
        handle: ROUTE_METADATA[ROUTE_PATHS.AUTH.FORGOT_PASSWORD],
      },
      {
        path: ROUTE_PATHS.AUTH.VERIFY_EMAIL,
        component: AuthVerifyEmailPage,
        handle: ROUTE_METADATA[ROUTE_PATHS.AUTH.VERIFY_EMAIL],
      },
    ],
  },
  {
    path: ROUTE_PATHS.AUTH.UPDATE_PASSWORD,
    component: AuthLayout,
    guard: 'recovery',
    children: [
      {
        index: true,
        component: AuthUpdatePasswordPage,
        handle: ROUTE_METADATA[ROUTE_PATHS.AUTH.UPDATE_PASSWORD],
      },
    ],
  },
  {
    path: ROUTE_PATHS.APP.ROOT,
    component: AppLayout,
    guard: 'private',
    children: [
      {
        index: true,
        component: () => <Navigate to={ROUTE_PATHS.APP.DASHBOARD} replace />,
      },
      {
        path: ROUTE_PATHS.APP.DASHBOARD,
        component: AppDashboardPage,
        handle: ROUTE_METADATA[ROUTE_PATHS.APP.DASHBOARD],
      },
    ],
  },
]
