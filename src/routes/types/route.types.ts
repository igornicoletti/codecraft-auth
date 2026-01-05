import type { ComponentType, LazyExoticComponent } from 'react'

export type RouteGuardType = 'private' | 'guest' | 'public'

export interface RouteHandle {
  title: string
  icon?: ComponentType
  hideInSidebar?: boolean
  hideInBreadcrumbs?: boolean
}

export interface RouteConfig {
  path: string
  component: LazyExoticComponent<ComponentType> | ComponentType
  guard?: RouteGuardType
  handle?: RouteHandle
  children?: RouteConfig[]
}
