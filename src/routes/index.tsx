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

const buildRoutes = (configs: RouteConfig[]): RouteObject[] => {
  const groups = {
    guest: configs.filter(r => r.guard === 'guest'),
    private: configs.filter(r => r.guard === 'private'),
    public: configs.filter(r => r.guard === 'public'),
  }

  const mapToRoute = (r: RouteConfig): RouteObject => ({
    path: r.path,
    element: <r.component />,
    children: r.children ? buildRoutes(r.children) : undefined
  })

  return [
    { element: <RouteGuard type='guest' />, children: groups.guest.map(mapToRoute) },
    { element: <RouteGuard type='private' />, children: groups.private.map(mapToRoute) },
    { element: <RouteGuard type='public' />, children: groups.public.map(mapToRoute) },
  ]
}

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to={PATHS.AUTH.LOGIN} replace /> },
      ...buildRoutes(ROUTE_LIST),
      { path: PATHS.ANY, element: <Pages.NotFound /> }
    ],
  },
])
