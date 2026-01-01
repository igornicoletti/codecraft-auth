import { useEffect, useMemo } from 'react'
import { useMatches, type UIMatch } from 'react-router-dom'

import type { RouteHandle } from '@/routes/types/route-types'

export const useRouteMetadata = () => {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[]

  const activeMeta = useMemo(() => {
    const lastMatch = matches[matches.length - 1]
    return lastMatch?.handle ?? {}
  }, [matches])

  useEffect(() => {
    if (!activeMeta?.title || typeof document === 'undefined') return

    const title = typeof activeMeta.title === 'function'
      ? activeMeta.title(matches[matches.length - 1].loaderData)
      : activeMeta.title

    document.title = title
  }, [activeMeta])

  const breadcrumbs = useMemo(() => {
    return matches
      .filter((m) => m.handle && !m.handle.hideInBreadcrumb)
      .map((m) => ({
        path: m.pathname,
        label: m.handle?.breadcrumb ??
          (typeof m.handle?.title === 'string' ? m.handle?.title : ''),
      }))
  }, [matches])

  return { activeMeta, breadcrumbs }
}
