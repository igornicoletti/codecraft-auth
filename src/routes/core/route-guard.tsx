import { type ReactNode } from 'react'
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

  // Se já está logado e tenta acessar rota de 'guest' (login/cadastro), manda pro Dashboard
  if (guardType === 'guest' && isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.APP.DASHBOARD} replace />
  }

  // Se a rota é privada e usuário não está autenticado
  if (guardType === 'private' && !isAuthenticated) {
    // Casos especiais: Se estiver em recuperação de senha, não manda pro login, deixa fluir
    if (authStatus === 'password_recovery') {
      return <Navigate to={ROUTE_PATHS.AUTH.UPDATE_PASSWORD} replace />
    }

    // Manda para login salvando a origem
    return <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} state={{ from: location }} replace />
  }

  // Rota específica de recuperação de senha
  if (guardType === 'recovery' && authStatus !== 'password_recovery') {
    return <Navigate to={ROUTE_PATHS.AUTH.SIGN_IN} replace />
  }

  return <>{children ?? <Outlet />}</>
}
