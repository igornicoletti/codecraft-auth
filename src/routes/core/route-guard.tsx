import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { useAuth } from '@/modules/authentication/contexts/auth.context'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import type { RouteGuardType } from '@/routes/types/route.types'

export interface RouteGuardProps {
  guardType?: RouteGuardType
  children?: ReactNode
}

export const RouteGuard = ({ guardType = 'public', children }: RouteGuardProps) => {
  const { authStatus, isAuthenticated } = useAuth()
  const location = useLocation()

  if (authStatus === 'loading') {
    return <LoaderFour />
  }

  if (guardType === 'guest') {
    if (isAuthenticated) {
      return <Navigate to={ROUTE_PATHS.APP.DASHBOARD} replace />
    }
    if (authStatus === 'password_recovery') {
      return <Navigate to={ROUTE_PATHS.AUTH.UPDATE_PASSWORD} replace />
    }
  }

  if (guardType === 'private') {
    if (!isAuthenticated) {
      return <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} state={{ from: location }} replace />
    }
  }

  if (guardType === 'recovery') {
    if (authStatus !== 'password_recovery') {
      return <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} replace />
    }
  }

  return <>{children ?? <Outlet />}</>
}
