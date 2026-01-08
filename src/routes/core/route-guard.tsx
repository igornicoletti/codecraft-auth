import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { useAuth } from '@/modules/authentication/contexts/auth.context'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import type { RouteGuardType } from '@/routes/types/route.types'

interface RouteGuardProps {
  children?: ReactNode
  guardType?: RouteGuardType
}

/**
 * Protects routes based on authentication status and guard type.
 * Handles redirection for both unauthenticated users accessing private routes
 * and authenticated users accessing guest routes.
 */
export const RouteGuard = ({ children, guardType = 'public' }: RouteGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <LoaderFour />

  // Scenario: Unauthenticated user tries to access a private route
  if (guardType === 'private' && !isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} state={{ from: location }} replace />
  }

  // Scenario: Authenticated user tries to access a guest route (e.g., Login)
  if (guardType === 'guest' && isAuthenticated) {
    const state = location.state as { from?: { pathname: string } } | undefined
    const previousPath = state?.from?.pathname

    // Validate if the previous path is a valid app path to avoid loops or external redirects
    const isValidRedirect = previousPath && previousPath.startsWith(ROUTE_PATHS.APP.ROOT)

    return <Navigate to={isValidRedirect ? previousPath : ROUTE_PATHS.APP.DASHBOARD} replace />
  }

  // Allow access
  return <>{children ?? <Outlet />}</>
}
