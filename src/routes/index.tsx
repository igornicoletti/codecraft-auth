import { Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { Toaster } from '@/components/ui/sonner'
import { ErrorBoundary } from '@/routes/components/error-boundary'
import { NotFoundPage } from '@/routes/components/not-found'
import { ProtectedRoute } from '@/routes/guards/protected-route'
import { PublicRoute } from '@/routes/guards/public-route'
import { LazyLoaded } from '@/routes/lazy-loaded'

const Root = () => (
  <ErrorBoundary>
    <Suspense fallback={<LoaderFour />}>
      <Outlet />
    </Suspense>
    <Toaster richColors />
  </ErrorBoundary>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to='/login' replace /> },
      {
        element: <PublicRoute />,
        children: [
          { path: 'login', element: <LazyLoaded.LoginPage /> },
          { path: 'register', element: <LazyLoaded.RegisterPage /> },
          { path: 'forgot-password', element: <LazyLoaded.ForgotPasswordPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <LazyLoaded.DashboardPage /> },
          { path: 'update-password', element: <LazyLoaded.UpdatePasswordPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
