import { useMemo } from 'react'
import { useLocation, useMatches } from 'react-router-dom'

import type { BreadcrumbData, NavigationItem, NavigationSection } from '@/modules/application/types/app.types'
import { ROUTE_CONFIGS } from '@/routes/configs/route-definitions'
import type { RouteConfig, RouteHandle } from '@/routes/types/route.types'

export const useRouteMetadata = () => {
  const matches = useMatches()
  const location = useLocation()

  const breadcrumbs = useMemo<BreadcrumbData[]>(() => {
    if (!matches.length) return []

    return matches
      .map((match) => {
        const handle = match.handle as RouteHandle

        if (!handle?.title || handle.hideInBreadcrumbs) return null

        const title = typeof handle.title === 'function'
          ? handle.title(match.loaderData)
          : handle.title

        return {
          title: title ?? 'Sem título',
          url: match.pathname,
        }
      })
      .filter((item): item is BreadcrumbData => Boolean(item))
  }, [matches])

  const navigation = useMemo<NavigationSection[]>(() => {
    const mapRouteToNavItem = (route: RouteConfig, parentPath?: string): NavigationItem | null => {
      // Regras de exclusão
      if (route.handle?.hideInSidebar) return null

      const hasTitle = Boolean(route.handle?.title)
      const hasChildren = route.children && route.children.length > 0

      if (!hasTitle && !hasChildren) return null
      const path = route.path || parentPath || ''

      const children = route.children
        ?.map(child => mapRouteToNavItem(child, path))
        .filter((item): item is NavigationItem => Boolean(item))

      if (!route.handle?.title) {
        return null
      }

      return {
        title: typeof route.handle.title === 'string' ? route.handle.title : 'Menu',
        url: path,
        icon: route.handle.icon,
        items: children && children.length > 0 ? children : undefined,
      }
    }

    const appSections = ROUTE_CONFIGS.filter((route) => route.guard === 'private')

    return appSections.map((section) => ({
      label: typeof section.handle?.title === 'string' ? section.handle.title : undefined,
      items: section.children
        ?.map(child => mapRouteToNavItem(child, section.path))
        .filter((item): item is NavigationItem => Boolean(item)) ?? [],
    })).filter(section => section.items.length > 0)
  }, [])

  return {
    breadcrumbs,
    navigation,
    currentPath: location.pathname,
  }
}
