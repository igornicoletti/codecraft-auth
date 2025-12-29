// src/components/breadcrumb/breadcrumb.types.ts
export type BreadcrumbHandle = string | ((data: any) => string | undefined)

export type BreadcrumbState = | {
  type: 'full'
  items: BreadcrumbItemProps[]
} | {
  type: 'collapsed'
  first: BreadcrumbItemProps
  middle: BreadcrumbItemProps[]
  last: BreadcrumbItemProps
}

export interface BreadcrumbRouteHandle {
  title?: BreadcrumbHandle
  hideInBreadcrumb?: boolean
}

export interface BreadcrumbItemProps {
  label: string
  href: string
  isCurrent: boolean
}
