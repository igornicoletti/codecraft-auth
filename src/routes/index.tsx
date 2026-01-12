import { Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { ROUTE_CONFIGS } from '@/routes/configs/route-definitions'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import { buildGuardedRoutes } from '@/routes/core/route-builder'
import { RouteErrorBoundary } from '@/routes/core/route-error-boundary'
import { RouteNotFound } from '@/routes/core/route-not-found'

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    element: (
      <RouteErrorBoundary>
        <Suspense fallback={<LoaderFour />}>
          <Outlet />
        </Suspense>
      </RouteErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <Outlet />
      },
      ...buildGuardedRoutes(ROUTE_CONFIGS),
      {
        path: ROUTE_PATHS.ANY,
        element: <RouteNotFound />
      },
    ],
  },
])
