import type { BreadcrumbItem, BreadcrumbState } from '@/components/breadcrumb'

export const getBreadcrumb = (items: BreadcrumbItem[], maxVisible: number): BreadcrumbState => {
  if (items.length <= maxVisible) {
    return { type: 'full', items }
  }

  return {
    type: 'collapsed',
    first: items[0],
    middle: items.slice(1, -1),
    last: items[items.length - 1],
  }
}
