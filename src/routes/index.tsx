// src/routes/index.tsx
import { Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, type RouteObject } from 'react-router-dom'

import { LoaderFour } from '@/components/ui/loader'
import { ROUTE_LIST, type AppRouteConfig } from '@/routes/config'
import { ProtectedRoute } from '@/routes/guards/protected-route'
import { lazyImport } from '@/routes/helpers/lazy-import'
import { ErrorBoundary } from '@/routes/pages/error-boundary'
import { APP_PATHS } from '@/routes/paths'

// Componente Layout Base
const RootLayout = () => (
  <ErrorBoundary>
    <Suspense fallback={<LoaderFour />}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
)

const NotFound = lazyImport(() => import('@/routes/pages/not-found'), 'NotFoundPage')

// Função recursiva para gerar rotas (suporta aninhamento infinito)
const generateRoutes = (configs: AppRouteConfig[]): RouteObject[] => {
  // Agrupa rotas por tipo de Guard para criar os Wrappers corretos
  const guestRoutes = configs.filter(r => r.guardType === 'guest')
  const privateRoutes = configs.filter(r => r.guardType === 'private')
  const publicRoutes = configs.filter(r => r.guardType === 'public')

  const mapToRouteObj = (route: AppRouteConfig): RouteObject => ({
    path: route.path,
    element: <route.component />,
    children: route.children ? generateRoutes(route.children) : undefined
  })

  return [
    {
      element: <ProtectedRoute type='guest' />,
      children: guestRoutes.map(mapToRouteObj)
    },
    {
      element: <ProtectedRoute type='private' />,
      children: privateRoutes.map(mapToRouteObj)
    },
    {
      element: <ProtectedRoute type='public' />,
      children: publicRoutes.map(mapToRouteObj)
    }
  ]
}

export const router = createBrowserRouter([
  {
    path: APP_PATHS.HOME,
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Redirecionamento da Raiz
      { index: true, element: <Navigate to={APP_PATHS.AUTH.LOGIN} replace /> },

      // Injeta todas as rotas geradas dinamicamente
      ...generateRoutes(ROUTE_LIST),

      // Rota 404
      { path: APP_PATHS.NOT_FOUND, element: <NotFound /> }
    ],
  },
])
