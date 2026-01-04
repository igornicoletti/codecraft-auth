import { lazy } from 'react'

import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import type { RouteConfig } from '@/routes/types/route-types'
import { ChartLineUpIcon } from '@phosphor-icons/react'

const AuthenticationLayout = lazy(() => import('@/modules/authentication/layouts/authentication-layout'))
const ApplicationLayout = lazy(() => import('@/modules/application/layouts/application-layout'))

const AuthSignInPage = lazy(() => import('@/modules/authentication/pages/auth-sign-in.page'))
const AuthSignUpPage = lazy(() => import('@/modules/authentication/pages/auth-sign-up.page'))
const AuthForgotPasswordPage = lazy(() => import('@/modules/authentication/pages/auth-forgot-password.page'))
const AuthUpdatePasswordPage = lazy(() => import('@/modules/authentication/pages/auth-update-password.page'))
const AuthVerifyEmailPage = lazy(() => import('@/modules/authentication/pages/auth-verify-email-page'))

const AppDashboardPage = lazy(() => import('@/modules/application/pages/app-dashboard.page'))

export const ROUTE_CONFIGS: RouteConfig[] = [
  {
    path: '',
    component: AuthenticationLayout,
    guard: 'guest',
    handle: { title: 'Autenticação', hideInSidebar: true },
    children: [
      {
        path: ROUTE_PATHS.AUTH.SIGN_IN,
        component: AuthSignInPage,
        handle: { title: 'Entrar' },
      },
      {
        path: ROUTE_PATHS.AUTH.SIGN_UP,
        component: AuthSignUpPage,
        handle: { title: 'Cadastrar' },
      },
      {
        path: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
        component: AuthForgotPasswordPage,
        handle: { title: 'Esqueceu a senha' },
      },
      {
        path: ROUTE_PATHS.AUTH.VERIFY_EMAIL,
        component: AuthVerifyEmailPage,
        handle: { title: 'Verificar e-mail' },
      },
      {
        path: ROUTE_PATHS.AUTH.UPDATE_PASSWORD,
        component: AuthUpdatePasswordPage,
        handle: { title: 'Atualizar senha' },
      },
    ],
  },
  {
    path: '',
    component: ApplicationLayout,
    guard: 'private',
    handle: { title: 'App' },
    children: [
      {
        path: ROUTE_PATHS.APP.DASHBOARD,
        component: AppDashboardPage,
        handle: { title: 'Dashboard', icon: ChartLineUpIcon },
      },
    ],
  },
]
