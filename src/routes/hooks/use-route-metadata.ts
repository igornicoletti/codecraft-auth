import { useMemo } from 'react'
import { useLocation, useMatches } from 'react-router-dom'

import type { BreadcrumbData, NavigationItem, NavigationSection } from '@/modules/application/types/app.types'
import { ROUTE_CONFIGS } from '@/routes/configs/route-definitions'
import type { RouteConfig, RouteHandle } from '@/routes/types/route.types'

export const useRouteMetadata = () => {
  const matches = useMatches()
  const location = useLocation()

  const breadcrumbs = useMemo<BreadcrumbData[]>(() => {
    return matches
      .filter((match) => {
        const handle = match.handle as RouteHandle | undefined
        return !!handle?.title && !handle.hideInBreadcrumbs
      })
      .map((match) => {
        const handle = match.handle as RouteHandle
        const title = typeof handle.title === 'function'
          ? handle.title(match.loaderData)
          : handle.title ?? ''

        return { title, url: match.pathname }
      })
  }, [matches])

  const mapRouteToNavItem = (route: RouteConfig, basePath = ''): NavigationItem | null => {
    const { handle } = route
    if (!handle?.title || handle.hideInSidebar) return null

    const resolvedPath = route.path?.startsWith('/')
      ? route.path
      : `${basePath}/${route.path ?? ''}`

    const path = resolvedPath.replace(/\/+/g, '/')

    const children = route.children
      ?.map((child) => mapRouteToNavItem(child, path))
      .filter((item): item is NavigationItem => !!item)

    const title = typeof handle.title === 'function'
      ? handle.title(undefined)
      : handle.title

    return {
      title,
      url: path,
      icon: handle.icon,
      items: children?.length ? children : undefined
    }
  }

  const navigation = useMemo<NavigationSection[]>(() => {
    return ROUTE_CONFIGS
      .filter((route) => route.guard === 'private')
      .map((section) => {
        const rawTitle = section.handle?.title

        const label = typeof rawTitle === 'function'
          ? rawTitle(undefined)
          : rawTitle

        const items = section.children
          ?.map((child) => mapRouteToNavItem(child, section.path ?? ''))
          .filter((item): item is NavigationItem => !!item) ?? []

        return { label, items }
      })
      .filter((section) => section.items.length > 0)
  }, [])

  return { breadcrumbs, navigation, currentPath: location.pathname }
}
