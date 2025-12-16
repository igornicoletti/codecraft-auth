import { createBrowserRouter, Navigate } from 'react-router-dom'

import { LazyLoadedRoute } from '@/app/router/lazyloaded-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace />,
  },
  {
    path: '/login',
    element: <LazyLoadedRoute.LoginPage />,
  },
  {
    path: '/register',
    element: <LazyLoadedRoute.RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <LazyLoadedRoute.ForgotPasswordPage />,
  },
  {
    path: '/update-password',
    element: <LazyLoadedRoute.UpdatePasswordPage />,
  },
  {
    element: <LazyLoadedRoute.ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <LazyLoadedRoute.DashboardPage />,
      },
    ]
  },
  {
    path: '*',
    element: <LazyLoadedRoute.NotFoundPage />,
  },
])
