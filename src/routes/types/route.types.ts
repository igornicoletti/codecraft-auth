import type { Icon } from '@phosphor-icons/react'
import type { ComponentType, LazyExoticComponent } from 'react'

export type RouteGuardType = 'public' | 'guest' | 'private' | 'recovery'

export interface RouteHandle {
  title?: string | ((data: unknown) => string)
  icon?: Icon
  hideInSidebar?: boolean
  hideInBreadcrumbs?: boolean
  roles?: string[]
  description?: string
}

export interface RouteConfig {
  path?: string
  component: LazyExoticComponent<ComponentType<Record<string, never>>> | ComponentType<Record<string, never>>
  guard?: RouteGuardType
  handle?: RouteHandle
  children?: RouteConfig[]
  index?: boolean
}
