import type { RouteObject } from 'react-router-dom'

import { RouteGuard } from '@/routes/core/route-guard'
import type { RouteConfig, RouteGuardType } from '@/routes/types/route.types'

const mapConfigToRoute = (config: RouteConfig, parentGuard?: RouteGuardType): RouteObject => {
  const { path, component: Component, guard, children, handle } = config

  const effectiveGuard = guard || parentGuard

  const processedChildren = children?.map(child => mapConfigToRoute(child, effectiveGuard))

  const element = guard ? (
    <RouteGuard guardType={guard}>
      <Component />
    </RouteGuard>
  ) : (
    <Component />
  )

  return {
    path,
    element,
    handle,
    children: processedChildren,
  }
}

export const buildGuardedRoutes = (configs: RouteConfig[], parentGuard?: RouteGuardType): RouteObject[] => {
  return configs.map(config => mapConfigToRoute(config, parentGuard))
}
