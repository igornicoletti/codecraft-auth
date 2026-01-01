import type { RouteObject } from 'react-router-dom'

import { RouteGuard } from '@/routes/core/route-guard'
import type { RouteConfig } from '@/routes/types/route-types'

const mapConfigToRoute = (config: RouteConfig): RouteObject => {
  const { path, component: Component, guard, children, handle } = config

  const processedChildren = children?.map(mapConfigToRoute)

  const element = guard ? (
    <RouteGuard type={guard}>
      <Component />
    </RouteGuard>
  ) : (
    <Component />
  )

  return { path, element, handle, children: processedChildren }
}

export const buildGuardedRoutes = (configs: RouteConfig[]) => {
  return configs.map(mapConfigToRoute)
}
