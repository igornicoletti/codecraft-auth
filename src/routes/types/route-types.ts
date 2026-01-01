import type { ComponentType, ReactNode } from 'react'

export type RouteHandle = {
  title?: string | ((data: any) => string)
  icon?: ReactNode
  hideInBreadcrumb?: boolean
  breadcrumb?: string
}

export type RouteGuardType = 'private' | 'guest' | 'public'

export interface RouteConfig {
  path: string
  component: ComponentType<any>
  guard?: RouteGuardType
  children?: RouteConfig[]
  handle?: RouteHandle
}
