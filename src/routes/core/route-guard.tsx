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

export const RouteGuard = ({ children, guardType = 'private' }: RouteGuardProps) => {
  const { isAuthenticated, isEmailVerified, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <LoaderFour />

  if (guardType === 'private') {
    if (!isAuthenticated) {
      return <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} state={{ from: location }} replace />
    }

    if (!isEmailVerified) {
      return <Navigate to={ROUTE_PATHS.AUTH.VERIFY_EMAIL} state={{ from: location }} replace />
    }
  }

  if (guardType === 'guest' && isAuthenticated && isEmailVerified) {
    const fromPath = (location.state as { from?: { pathname?: string } })?.from?.pathname
    return <Navigate to={fromPath || ROUTE_PATHS.APP.DASHBOARD} replace />
  }

  return children ? <>{children}</> : <Outlet />
}
