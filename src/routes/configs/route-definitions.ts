import { ChartLineUpIcon } from '@phosphor-icons/react'
import { lazy } from 'react'

import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import type { RouteConfig } from '@/routes/types/route.types'


const AuthenticationLayout = lazy(() => import('@/modules/authentication/layouts/auth.layout'))
const AuthSignInPage = lazy(() => import('@/modules/authentication/pages/auth-sign-in.page'))
const AuthSignUpPage = lazy(() => import('@/modules/authentication/pages/auth-sign-up.page'))
const AuthForgotPasswordPage = lazy(() => import('@/modules/authentication/pages/auth-forgot-password.page'))
const AuthUpdatePasswordPage = lazy(() => import('@/modules/authentication/pages/auth-update-password.page'))

const ApplicationLayout = lazy(() => import('@/modules/application/layouts/app.layout'))
const AppDashboardPage = lazy(() => import('@/modules/application/pages/app-dashboard.page'))

export const ROUTE_CONFIGS: RouteConfig[] = [
  {
    path: 'auth',
    component: AuthenticationLayout,
    guard: 'guest',
    handle: { title: 'Autenticação', hideInSidebar: true },
    children: [
      { path: ROUTE_PATHS.AUTH.SIGN_IN, component: AuthSignInPage, handle: { title: 'Entrar' } },
      { path: ROUTE_PATHS.AUTH.SIGN_UP, component: AuthSignUpPage, handle: { title: 'Inscrever-se' } },
      { path: ROUTE_PATHS.AUTH.FORGOT_PASSWORD, component: AuthForgotPasswordPage, handle: { title: 'Esqueci minha senha' } },
    ],
  },
  {
    path: 'auth',
    component: AuthenticationLayout,
    guard: 'public',
    handle: { title: 'Autenticação', hideInSidebar: true },
    children: [
      { path: ROUTE_PATHS.AUTH.UPDATE_PASSWORD, component: AuthUpdatePasswordPage, handle: { title: 'Atualizar senha' } },
    ],
  },
  {
    path: 'app',
    component: ApplicationLayout,
    guard: 'private',
    handle: { title: 'Aplicação' },
    children: [
      {
        path: ROUTE_PATHS.APP.DASHBOARD,
        component: AppDashboardPage,
        handle: { title: 'Dashboard', icon: ChartLineUpIcon }
      },
    ],
  },
]
