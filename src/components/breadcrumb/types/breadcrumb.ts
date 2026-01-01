export type BreadcrumbHandle = string | ((data: any) => string | undefined)

export interface BreadcrumbRouteHandle {
  title?: BreadcrumbHandle
  hideInBreadcrumb?: boolean
}

export interface BreadcrumbItem {
  label: string
  href: string
  isCurrent: boolean
}

export type BreadcrumbState =
  | { type: 'full', items: BreadcrumbItem[] }
  | { type: 'collapsed', first: BreadcrumbItem, middle: BreadcrumbItem[], last: BreadcrumbItem }
