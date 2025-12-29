// src/routes/config/app.routes.ts
import { AppLayout } from '@/features/app/layouts/app-layout'
import { PATHS } from '@/routes/constants/paths'
import { lazyImport } from '@/routes/core/lazy-import'
import type { RouteConfig } from '@/routes/types'

const Pages = {
  Dashboard: lazyImport(() => import('@/features/app/pages/dashboard'), 'DashboardPage'),
}

export const appRoutes: RouteConfig = {
  path: '',
  component: AppLayout,
  guard: 'private',
  handle: { title: 'App' },
  children: [{
    path: PATHS.APP.DASHBOARD, component: Pages.Dashboard, guard: 'private', handle: { title: 'Dashboard' }
  }],
}
