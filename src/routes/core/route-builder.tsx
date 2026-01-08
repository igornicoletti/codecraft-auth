import type { RouteObject } from 'react-router-dom'

import { RouteGuard } from '@/routes/core/route-guard'
import type { RouteConfig, RouteGuardType } from '@/routes/types/route.types'

/**
 * Maps a route configuration to a RouteObject with proper guard inheritance.
 * Children inherit the parent's guard unless they specify their own.
 *
 * @param config - The route configuration to map
 * @param parentGuard - The guard type inherited from parent route
 * @returns A RouteObject with proper guard wrapping
 */
const mapConfigToRoute = (config: RouteConfig, parentGuard?: RouteGuardType): RouteObject => {
  const { path, component: Component, guard, children, handle, index } = config

  // Determine the effective guard: explicit guard > inherited guard > undefined
  const effectiveGuard = guard ?? parentGuard

  // Process children with the effective guard as their parent guard
  const processedChildren = children?.map(child => mapConfigToRoute(child, effectiveGuard))

  // Wrap the component with RouteGuard if there's an effective guard
  // This ensures proper authentication checks at every level
  const element = effectiveGuard ? (
    <RouteGuard guardType={effectiveGuard}>
      <Component />
    </RouteGuard>
  ) : (
    <Component />
  )

  const route: RouteObject = index ? {
    index: true,
    element,
    handle,
  } : {
    path,
    element,
    handle,
    children: processedChildren,
  }

  return route
}

/**
 * Builds an array of guarded routes from route configurations.
 *
 * @param configs - Array of route configurations
 * @param parentGuard - Optional parent guard to inherit
 * @returns Array of RouteObjects with guards applied
 */
export const buildGuardedRoutes = (configs: RouteConfig[], parentGuard?: RouteGuardType): RouteObject[] => {
  return configs.map(config => mapConfigToRoute(config, parentGuard))
}
