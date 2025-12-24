import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { useAuth } from '@/features/auth/contexts/auth.context'

export const PublicRoute = () => {
  const location = useLocation()
  const { user, loading } = useAuth()

  if (loading) return <LoaderFour text='Authenticating...' />
  if (user) return <Navigate to={(location.state as any)?.from?.pathname || '/dashboard'} replace />

  return <Outlet />
}
