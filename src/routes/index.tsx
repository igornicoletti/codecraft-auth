// src/routes/index.tsx
import { Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, type RouteObject } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { ErrorBoundary } from '@/routes/components/error-boundary'
import { Pages, PATHS, ROUTE_LIST, type RouteConfig } from '@/routes/config'
import { RouteGuard } from '@/routes/core/route-guard'

const RootLayout = () => (
  <ErrorBoundary>
    <Suspense fallback={<LoaderFour />}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
)

const mapConfigToRoute = (config: RouteConfig): RouteObject => ({
  path: config.path,
  element: <config.component />,
  children: config.children ? config.children.map(mapConfigToRoute) : undefined,
})

const buildRoutes = (configs: RouteConfig[]): RouteObject[] => {
  const guards: Array<RouteConfig['guard']> = ['guest', 'private', 'public']
  return guards.map((guard) => ({
    element: <RouteGuard type={guard} />,
    children: configs.filter((r) => r.guard === guard).map(mapConfigToRoute),
  }))
}

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.AUTH.LOGIN} replace />,
      },
      ...buildRoutes(ROUTE_LIST),
      {
        path: PATHS.ANY,
        element: <Pages.NotFound />,
      },
    ],
  },
])
