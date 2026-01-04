import type { IconProps } from '@phosphor-icons/react'
import type { ComponentType, ForwardRefExoticComponent } from 'react'

export type RouteHandle = {
  title?: string | ((data: any) => string)
  icon?: ForwardRefExoticComponent<IconProps>
  hideInSidebar?: boolean
  hideInBreadcrumb?: boolean
}

export type RouteGuardType = 'private' | 'guest' | 'public'

export interface RouteConfig {
  path: string
  component: ComponentType<any>
  guard?: RouteGuardType
  children?: RouteConfig[]
  handle?: RouteHandle
}
