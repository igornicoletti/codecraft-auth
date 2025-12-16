import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '@/app/providers/auth-provider'
import { Spinner } from '@/components/ui/spinner'

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Spinner />
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return <Outlet />
}
