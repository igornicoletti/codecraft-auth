import type { RouteObject } from 'react-router-dom'

import { RouteGuard } from '@/routes/core/route-guard'
import type { RouteConfig, RouteGuardType } from '@/routes/types/route.types'

function wrapWithGuard(element: React.ReactNode, guard?: RouteGuardType) {
  if (!guard) return element
  return <RouteGuard guardType={guard}>{element}</RouteGuard>
}

function mapConfigToRoute(config: RouteConfig, parentGuard?: RouteGuardType): RouteObject {
  const { path, index, component: Component, guard, handle, children } = config

  const effectiveGuard = guard ?? parentGuard
  const element = wrapWithGuard(<Component />, effectiveGuard)
  const mappedChildren = children?.map((child) => mapConfigToRoute(child, effectiveGuard))

  if (index) return { index: true, element, handle }

  return { path, element, handle, children: mappedChildren }
}

export function buildGuardedRoutes(configs: RouteConfig[], parentGuard?: RouteGuardType): RouteObject[] {
  return configs.map((config) => mapConfigToRoute(config, parentGuard))
}
