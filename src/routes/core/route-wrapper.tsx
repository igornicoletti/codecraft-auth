import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { RouteErrorBoundary } from '@/routes/core/route-error-boundary'

export const RouteWrapper = () => (
  <RouteErrorBoundary>
    <Suspense fallback={<LoaderFour />}>
      <Outlet />
    </Suspense>
  </RouteErrorBoundary>
)
