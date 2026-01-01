import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { useAuthentication } from '@/modules/authentication/contexts/authentication-context'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import type { RouteGuardType } from '@/routes/types/route-types'

interface RouteGuardProps {
  type: RouteGuardType
  children?: ReactNode
}

export const RouteGuard = ({ type = 'private', children }: RouteGuardProps) => {
  const { user, isLoading } = useAuthentication()
  const location = useLocation()

  if (isLoading) return <LoaderFour />

  if (type === 'private' && !user) {
    return <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} state={{ from: location }} replace />
  }

  if (type === 'guest' && user) {
    const fromPath = (location.state as { from?: { pathname?: string } })?.from?.pathname
    return <Navigate to={fromPath || ROUTE_PATHS.APP.DASHBOARD} replace />
  }

  return children ? children : <Outlet />
}
