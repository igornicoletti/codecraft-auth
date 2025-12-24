// src/routes/guards/protected-route.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { useAuth } from '@/features/auth/contexts/auth.context'
import { APP_PATHS } from '@/routes/paths'

type RouteType = 'private' | 'guest' | 'public'

interface ProtectedRouteProps {
  type?: RouteType
}

export const ProtectedRoute = ({ type = 'private' }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="h-screen flex items-center justify-center"><LoaderFour /></div>

  // 1. Rota Privada (Dashboard): Se não tiver user -> Login
  if (type === 'private' && !user) {
    return <Navigate to={APP_PATHS.AUTH.LOGIN} state={{ from: location }} replace />
  }

  // 2. Rota "Convidado" (Login/Register): Se tiver user -> Dashboard
  if (type === 'guest' && user) {
    const from = (location.state as any)?.from?.pathname || APP_PATHS.DASHBOARD.ROOT
    return <Navigate to={from} replace />
  }

  // 3. Rota Pública (Sobre/Contato): Acessível por todos, sem redirecionamento
  return <Outlet />
}
