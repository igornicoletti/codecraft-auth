import { Suspense } from 'react'
import {
  createStaticHandler,
  createStaticRouter,
  Navigate,
  Outlet,
  type StaticHandler,
  type StaticHandlerContext,
} from 'react-router-dom'

import { Spinner } from '@/components/ui/spinner'
import { ErrorBoundary } from '@/features/route/error-boundary'
import { LazyLoaded } from '@/features/route/lazy-loaded'

const Loading = () => (
  <main className="grid min-h-svh place-content-center p-4">
    <Spinner />
  </main>
)

const Root = () => (
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
)

export const createAppServerRouter = (context: StaticHandlerContext | null = null) => {
  const routes = [
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <Navigate to="/login" replace /> },
        {
          element: <LazyLoaded.PublicRoute />,
          children: [
            { path: 'login', element: <LazyLoaded.LoginPage /> },
            { path: 'register', element: <LazyLoaded.RegisterPage /> },
            { path: 'forgot-password', element: <LazyLoaded.ForgotPasswordPage /> },
            { path: 'update-password', element: <LazyLoaded.UpdatePasswordPage /> },
          ],
        },
        {
          element: <LazyLoaded.ProtectedRoute />,
          children: [
            { path: 'dashboard', element: <LazyLoaded.DashboardPage /> },
          ],
        },
        { path: '*', element: <LazyLoaded.NotFoundPage /> },
      ],
    },
  ]

  const handler: StaticHandler = createStaticHandler(routes)
  const dataRoutes = handler.dataRoutes

  return createStaticRouter(dataRoutes, context ?? ({} as StaticHandlerContext))
}
