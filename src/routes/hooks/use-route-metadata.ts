import { useLocation, useMatches } from 'react-router-dom'

import type { NavigationItem, NavigationSection } from '@/modules/application/types/app.types'
import { ROUTE_CONFIGS } from '@/routes/configs/route-definitions'
import type { RouteConfig, RouteHandle } from '@/routes/types/route.types'

export const useRouteMetadata = () => {
  const matches = useMatches()
  const location = useLocation()

  const resolveTitle = (handle?: RouteHandle, loaderData?: any): string => {
    if (typeof handle?.title === 'function') {
      return (handle.title as (data: any) => string)(loaderData)
    }
    return typeof handle?.title === 'string' ? handle.title : ''
  }

  const breadcrumbs = matches
    .filter((match) => {
      const handle = match.handle as RouteHandle
      return handle?.title && !handle?.hideInBreadcrumbs
    })
    .map((match) => ({
      title: resolveTitle(match.handle as RouteHandle, match.loaderData),
      url: match.pathname,
    }))
    .slice(1)

  const mapRouteToNav = (route: RouteConfig): NavigationItem => ({
    title: typeof route.handle?.title === 'string'
      ? route.handle.title
      : route.path || '',
    url: route.path || '',
    icon: route.handle?.icon || undefined,
    items: route.children
      ?.filter((c) => c.handle?.title && !c.handle?.hideInSidebar)
      .map(mapRouteToNav),
  }) as NavigationItem


  const navigation: NavigationSection[] = ROUTE_CONFIGS
    .filter((config) =>
      config.guard === 'private' &&
      config.handle?.title &&
      !config.handle?.hideInSidebar
    )
    .map(section => ({
      label: typeof section.handle?.title === 'string' ? section.handle.title : undefined,
      items: section.children
        ?.filter(route => route.handle?.title && !route.handle?.hideInSidebar)
        .map(mapRouteToNav) || []
    })) as NavigationSection[]

  return {
    breadcrumbs,
    navigation,
    currentPath: location.pathname,
  }
}
