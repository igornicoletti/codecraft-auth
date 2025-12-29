// src/routes/index.tsx
import { Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, type RouteObject } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { ErrorBoundary } from '@/routes/components/error-boundary'
import { NotFound } from '@/routes/components/not-found'
import { appRoutes } from '@/routes/config/app.routes'
import { authRoutes } from '@/routes/config/auth.routes'
import { PATHS } from '@/routes/constants/paths'
import { RouteGuard } from '@/routes/core/route-guard'
import type { RouteConfig, RouteGuardType } from '@/routes/types'

const mapConfigToRoute = (config: RouteConfig): RouteObject => ({
  path: config.path,
  element: <config.component />,
  handle: config.handle,
  children: config.children?.map(mapConfigToRoute),
})

const buildGuardedRoutes = (configs: RouteConfig[]) => {
  const guards: RouteGuardType[] = ['guest', 'private', 'public']

  return guards.map((guard) => ({
    element: <RouteGuard type={guard} />,
    children: configs
      .filter((route) => route.guard === guard)
      .map(mapConfigToRoute),
  }))
}

const ROUTE_LIST = [authRoutes, appRoutes]

export const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoaderFour />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <Navigate to={PATHS.AUTH.LOGIN} replace /> },
      ...buildGuardedRoutes(ROUTE_LIST),
      { path: PATHS.ANY, element: <NotFound /> },
    ],
  },
])
