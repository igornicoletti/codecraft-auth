// src/routes/core/route-guard.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { useAuth } from '@/features/auth/contexts/auth.context'
import { PATHS } from '@/routes/config'

type RouteType = 'private' | 'guest' | 'public'

interface RouteGuardProps {
  type?: RouteType
}

export const RouteGuard = ({ type = 'private' }: RouteGuardProps) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoaderFour />
  }

  // 1. Rota Privada (Dashboard): Se não tiver user -> Login
  if (type === 'private' && !user) {
    return <Navigate to={PATHS.AUTH.LOGIN} state={{ from: location }} replace />
  }

  // 2. Rota 'Convidado' (Login/Register): Se tiver user -> Dashboard
  if (type === 'guest' && user) {
    const fromPath = (location.state as { from?: { pathname?: string } })?.from?.pathname
    return <Navigate to={fromPath || PATHS.APP.DASHBOARD} replace />
  }

  // 3. Rota Pública: Acessível por todos
  return <Outlet />
}
