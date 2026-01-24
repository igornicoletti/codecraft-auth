import { type ReactNode, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
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
  const [isTimeout, setIsTimeout] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (authStatus === 'loading') {
      timer = setTimeout(() => {
        setIsTimeout(true)
      }, 10000)
    }

    return () => clearTimeout(timer)
  }, [authStatus])

  if (isTimeout) {
    return (
      <main className='flex min-h-svh flex-col p-6'>
        <div className='flex flex-1 items-center justify-center'>
          <h1 className='text-nowrap'>Verifique sua conexão</h1>
          <div className='ml-4 pl-4 border-l-2'>
            <p className='text-sm text-muted-foreground'>
              O carregamento está demorando muito.{' '}
              <Button
                variant='link'
                className='p-0 h-auto'
                onClick={() => window.location.reload()}>
                Recarregar página
              </Button>
            </p>
          </div>
        </div>
      </main>
    )
  }

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
