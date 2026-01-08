import { useMemo } from 'react'
import { useLocation, useMatches } from 'react-router-dom'

import type { NavigationItem, NavigationSection } from '@/modules/application/types/app.types'
import { ROUTE_CONFIGS } from '@/routes/configs/route-definitions'
import type { RouteConfig, RouteHandle } from '@/routes/types/route.types'

/**
 * Hook to extract metadata from the current route and generate navigation structures.
 * Memoized for performance.
 */
export const useRouteMetadata = () => {
  const matches = useMatches()
  const location = useLocation()

  // --- Breadcrumbs Logic ---
  const breadcrumbs = useMemo(() => {
    return matches
      .filter((match) => {
        const handle = match.handle as RouteHandle | undefined
        return handle?.title && !handle?.hideInBreadcrumbs
      })
      .map((match) => {
        const handle = match.handle as RouteHandle
        // Resolve dynamic titles if handle.title is a function
        const title = typeof handle.title === 'function'
          ? handle.title(match.loaderData)
          : handle.title

        return {
          title: title || '',
          url: match.pathname,
        }
      })
      .filter((_, index) => index > 0) // Exclude the root breadcrumb
  }, [matches])

  // --- Navigation/Sidebar Logic ---
  const navigation = useMemo(() => {

    // Recursive mapper for children routes
    const mapRouteToNav = (route: RouteConfig): NavigationItem | null => {
      // Skip if explicitly hidden
      if (route.handle?.hideInSidebar) return null
      // Skip if no title (unless it's a wrapper, but usually we want visible items)
      if (!route.handle?.title && !route.children) return null

      const childrenItems = route.children
        ?.map(mapRouteToNav)
        .filter((item): item is NavigationItem => item !== null)

      // If it's a layout route without a direct link/title but has children,
      // we might want to return the children flattened, or null depending on UI design.
      // Here assuming we only show items with Titles.
      if (!route.handle?.title) return null

      return {
        title: typeof route.handle.title === 'string' ? route.handle.title : 'Link',
        url: route.path || '',
        icon: route.handle.icon,
        items: childrenItems && childrenItems.length > 0 ? childrenItems : undefined,
      }
    }

    // Filter mainly for the "App" section (private routes)
    const appRoutes = ROUTE_CONFIGS.filter(c => c.path === '/app' || c.guard === 'private')

    return appRoutes.map(section => ({
      label: typeof section.handle?.title === 'string' ? section.handle.title : undefined,
      items: section.children
        ?.map(mapRouteToNav)
        .filter((item): item is NavigationItem => item !== null) || []
    })) as NavigationSection[]

  }, [])

  return {
    breadcrumbs,
    navigation,
    currentPath: location.pathname,
  }
}
