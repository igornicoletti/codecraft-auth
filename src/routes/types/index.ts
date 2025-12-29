// src/routes/types/index.ts
import type { ComponentType, ReactNode } from 'react'

export type RouteHandle = {
  title?: string | ((data: unknown) => string)
  icon?: ReactNode
  hideInBreadcrumb?: boolean
}

export type RouteGuardType = 'private' | 'guest' | 'public'

export interface RouteConfig {
  path: string
  component: ComponentType<any>
  guard: RouteGuardType
  children?: RouteConfig[]
  handle?: RouteHandle
}
