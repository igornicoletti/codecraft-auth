import { useMemo } from 'react'
import { useMatches, type UIMatch } from 'react-router-dom'

import type { BreadcrumbItem, BreadcrumbRouteHandle } from '@/components/breadcrumb'

type BreadcrumbMatch = UIMatch<unknown, BreadcrumbRouteHandle>

export const useBreadcrumb = (): BreadcrumbItem[] => {
  const matches = useMatches() as BreadcrumbMatch[]

  return useMemo(() => {
    return matches
      .filter((match) => match.handle?.title && !match.handle.hideInBreadcrumb)
      .map((match, index, array) => {
        const { title } = match.handle
        const isCurrent = index === array.length - 1

        const label = typeof title === 'function'
          ? title(match.loaderData)
          : title

        return {
          label: label ?? '',
          href: match.pathname,
          isCurrent,
        }
      })
      .filter((item) => item.label !== '')
  }, [matches])
}
