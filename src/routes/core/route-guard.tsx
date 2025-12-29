// src/routes/core/route-guard.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { useAuth } from '@/features/auth/contexts/auth.context'
import { PATHS } from '@/routes/constants/paths'
import type { RouteGuardType } from '@/routes/types'

interface RouteGuardProps {
  type?: RouteGuardType
}

export const RouteGuard = ({ type = 'private' }: RouteGuardProps) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoaderFour />
  }

  if (type === 'private' && !user) {
    return <Navigate to={PATHS.AUTH.LOGIN} state={{ from: location }} replace />
  }

  if (type === 'guest' && user) {
    const fromPath = (location.state as { from?: { pathname?: string } })?.from?.pathname
    return <Navigate to={fromPath || PATHS.APP.DASHBOARD} replace />
  }

  return <Outlet />
}
