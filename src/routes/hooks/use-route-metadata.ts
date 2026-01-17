import { useMemo } from 'react'
import { useLocation, useMatches } from 'react-router-dom'

import type { BreadcrumbData, NavigationItem, NavigationSection } from '@/modules/application/types/app.types'
import { ROUTE_CONFIGS } from '@/routes/configs/route-definitions'
import type { RouteConfig, RouteHandle } from '@/routes/types/route.types'

export const useRouteMetadata = () => {
  const matches = useMatches()
  const location = useLocation()

  const breadcrumbs = useMemo<BreadcrumbData[]>(() =>
    matches
      .filter((match) => {
        const handle = match.handle as RouteHandle
        return handle?.title && !handle.hideInBreadcrumbs
      })
      .map((match) => ({
        title: typeof (match.handle as RouteHandle).title === 'function'
          ? ((match.handle as RouteHandle).title as (data: unknown) => string)(match.loaderData)
          : ((match.handle as RouteHandle).title as string ?? ''),
        url: match.pathname,
      })),
    [matches])

  const navigation = useMemo<NavigationSection[]>(() => {
    const mapRouteToNavItem = (route: RouteConfig, basePath = ''): NavigationItem | null => {
      if (route.handle?.hideInSidebar || !route.handle?.title) return null

      const rawPath = route.path?.startsWith('/')
        ? route.path
        : `${basePath}/${route.path ?? ''}`

      const currentPath = rawPath.replace(/\/+/g, '/')

      const children = route.children
        ?.map((child) => mapRouteToNavItem(child, currentPath))
        .filter((item): item is NavigationItem => !!item)

      return {
        title: typeof route.handle.title === 'string' ? route.handle.title : 'Menu',
        url: currentPath,
        icon: route.handle.icon,
        items: children?.length ? children : undefined,
      }
    }

    return ROUTE_CONFIGS
      .filter((route) => route.guard === 'private')
      .map((section) => ({
        label: typeof section.handle?.title === 'string' ? section.handle.title : undefined,
        items: section.children
          ?.map((child) => mapRouteToNavItem(child, section.path ?? ''))
          .filter((item): item is NavigationItem => !!item) ?? [],
      }))
      .filter((section) => section.items.length > 0)
  }, [])

  return { breadcrumbs, navigation, currentPath: location.pathname }
}
