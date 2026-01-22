import { ChartLineUpIcon } from '@phosphor-icons/react'

import { ROUTE_PATHS } from '@/routes/configs/route-paths'
import type { RouteHandle } from '@/routes/types/route.types'

export const ROUTE_METADATA: Record<string, RouteHandle> = {
  [ROUTE_PATHS.AUTH.ROOT]: { title: 'Autenticação' },
  [ROUTE_PATHS.AUTH.SIGN_IN]: { title: 'Entrar' },
  [ROUTE_PATHS.AUTH.SIGN_UP]: { title: 'Criar conta' },
  [ROUTE_PATHS.AUTH.FORGOT_PASSWORD]: { title: 'Recuperar senha' },
  [ROUTE_PATHS.AUTH.VERIFY_EMAIL]: { title: 'Verificação de segurança' },
  [ROUTE_PATHS.AUTH.UPDATE_PASSWORD]: { title: 'Redefinir senha' },
  [ROUTE_PATHS.APP.ROOT]: { title: 'Aplicação' },
  [ROUTE_PATHS.APP.DASHBOARD]: {
    title: 'Dashboard',
    icon: ChartLineUpIcon
  },
}
