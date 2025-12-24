// src/routes/config.tsx
import type { ComponentType } from 'react'

import { lazyImport } from '@/lib/lazyload'
import { APP_PATHS } from '@/routes/paths'

export type AppRouteConfig = {
  path: string
  component: ComponentType<any>
  guardType: 'private' | 'guest' | 'public'
  children?: AppRouteConfig[]
}

// Mapa centralizado de Componentes Lazy
const Pages = {
  Login: lazyImport(() => import('@/features/auth/pages/login'), 'LoginPage'),
  Register: lazyImport(() => import('@/features/auth/pages/register'), 'RegisterPage'),
  ForgotPass: lazyImport(() => import('@/features/auth/pages/forgot-password'), 'ForgotPasswordPage'),
  UpdatePass: lazyImport(() => import('@/features/auth/pages/update-password'), 'UpdatePasswordPage'),
  Dashboard: lazyImport(() => import('@/features/dashboard/pages/dashboard'), 'DashboardPage'),
  NotFound: lazyImport(() => import('@/routes/pages/not-found'), 'NotFoundPage'),
}

export const ROUTE_LIST: AppRouteConfig[] = [
  // Rotas de Autenticação (Guest Only)
  {
    path: APP_PATHS.AUTH.LOGIN,
    component: Pages.Login,
    guardType: 'guest',
  },
  {
    path: APP_PATHS.AUTH.REGISTER,
    component: Pages.Register,
    guardType: 'guest',
  },
  {
    path: APP_PATHS.AUTH.FORGOT_PASSWORD,
    component: Pages.ForgotPass,
    guardType: 'guest',
  },

  // Rotas Protegidas (Private)
  {
    path: APP_PATHS.AUTH.UPDATE_PASSWORD, // Supabase envia pra cá logado
    component: Pages.UpdatePass,
    guardType: 'private',
  },
  {
    path: APP_PATHS.DASHBOARD.ROOT,
    component: Pages.Dashboard,
    guardType: 'private',
    // Exemplo de como funcionaria com filhos aninhados no futuro:
    // children: [ ... ]
  },
]
