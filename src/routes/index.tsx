import { createBrowserRouter, Navigate } from 'react-router-dom'

import { ROUTE_CONFIGS } from '@/routes/configs/route-definitions'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import { buildGuardedRoutes } from '@/routes/core/route-builder'
import { RouteNotFound } from '@/routes/core/route-not-found'
import { RouteWrapper } from '@/routes/core/route-wrapper'

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    element: <RouteWrapper />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} replace />
      },
      ...buildGuardedRoutes(ROUTE_CONFIGS),
      {
        path: ROUTE_PATHS.ANY,
        element: <RouteNotFound />
      }
    ],
  },
])
