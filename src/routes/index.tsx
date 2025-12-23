import { Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { Toaster } from '@/components/ui/sonner'
import { ErrorBoundary } from '@/routes/components/error-boundary'
import { LazyLoaded } from '@/routes/lazy-loaded'

const Root = () => (
  <ErrorBoundary>
    <Suspense fallback={<LoaderFour />}>
      <Outlet />
    </Suspense>
    <Toaster />
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
        element: <LazyLoaded.PublicRoute />,
        children: [
          { path: 'login', element: <LazyLoaded.LoginPage /> },
          { path: 'register', element: <LazyLoaded.RegisterPage /> },
          { path: 'forgot-password', element: <LazyLoaded.ForgotPasswordPage /> },
        ],
      },
      {
        element: <LazyLoaded.ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <LazyLoaded.DashboardPage /> },
          { path: 'update-password', element: <LazyLoaded.UpdatePasswordPage /> },
        ],
      },
      { path: '*', element: <LazyLoaded.NotFoundPage /> },
    ],
  },
])
