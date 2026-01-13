import { useMemo } from 'react'
import { useLocation, useMatches } from 'react-router-dom'

import type { NavigationItem, NavigationSection } from '@/modules/application/types/app.types'
import { ROUTE_CONFIGS } from '@/routes/configs/route-definitions'
import type { RouteConfig, RouteHandle } from '@/routes/types/route.types'

/**
 * Extracts route metadata (breadcrumbs & navigation)
 * from React Router matches and RouteConfig.
 */
export const useRouteMetadata = () => {
  const matches = useMatches()
  const location = useLocation()

  const breadcrumbs = useMemo(() => {
    return matches
      .map((match) => {
        const handle = match.handle as RouteHandle
        if (!handle?.title || handle.hideInBreadcrumbs) return null

        const title = typeof handle.title === 'function'
          ? handle.title(match.loaderData)
          : handle.title

        return {
          title: title ?? '',
          url: match.pathname,
        }
      })
      .filter(Boolean)
      .slice(1)
  }, [matches, location.pathname])

  const navigation = useMemo<NavigationSection[]>(() => {
    const mapRouteToNavItem = (route: RouteConfig): NavigationItem | null => {
      if (route.handle?.hideInSidebar) return null
      if (!route.handle?.title && !route.children) return null

      const children = route.children
        ?.map(mapRouteToNavItem)
        .filter((item): item is NavigationItem => Boolean(item))

      if (!route.handle?.title) return null

      return {
        title: typeof route.handle.title === 'string'
          ? route.handle.title
          : 'Link',
        url: route.path ?? '',
        icon: route.handle.icon,
        items: children && children.length > 0 ? children : undefined,
      }
    }

    const appSections = ROUTE_CONFIGS.filter((route) => route.guard === 'private')

    return appSections.map((section) => ({
      label: typeof section.handle?.title === 'string'
        ? section.handle.title
        : undefined,
      items: section.children
        ?.map(mapRouteToNavItem)
        .filter((item): item is NavigationItem => Boolean(item)) ?? [],
    }))
  }, [])

  return {
    breadcrumbs,
    navigation,
    currentPath: location.pathname,
  }
}
