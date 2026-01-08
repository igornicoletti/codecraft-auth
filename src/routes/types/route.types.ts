import type { Icon } from '@phosphor-icons/react'
import type { ComponentType, LazyExoticComponent } from 'react'

export type RouteGuardType = 'private' | 'guest' | 'public'

/**
 * Metadata associated with a route, used for UI generation (sidebar, breadcrumbs).
 */
export interface RouteHandle {
  title?: string | ((data: unknown) => string)
  icon?: Icon
  hideInSidebar?: boolean
  hideInBreadcrumbs?: boolean
  roles?: string[] // Example for future RBAC (Role Based Access Control)
}

/**
 * Configuration object for defining the application structure.
 */
export interface RouteConfig {
  path?: string
  /**
   * The component to render. Can be a lazy loaded component or a standard one.
   */
  component: LazyExoticComponent<ComponentType<any>> | ComponentType<any>
  guard?: RouteGuardType
  handle?: RouteHandle
  children?: RouteConfig[]
  index?: boolean
}
