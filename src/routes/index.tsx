import { Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { useAuth } from '@/modules/authentication/contexts/auth.context'
import { ROUTE_CONFIGS } from '@/routes/configs/route-definitions'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import { buildGuardedRoutes } from '@/routes/core/route-builder'
import { RouteErrorBoundary } from '@/routes/core/route-error-boundary'
import { RouteNotFound } from '@/routes/core/route-not-found'

const RootRedirect = () => {
  const { isAuthenticated, authStatus } = useAuth()

  if (authStatus === 'loading') return <LoaderFour />

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.APP.DASHBOARD} replace />
  }

  return <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} replace />
}

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
        element: <RootRedirect />
      },
      ...buildGuardedRoutes(ROUTE_CONFIGS),
      {
        path: ROUTE_PATHS.ANY,
        element: <RouteNotFound />
      },
    ],
  },
])
