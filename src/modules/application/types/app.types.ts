import type { Icon } from '@phosphor-icons/react'

export interface NavigationItem {
  title: string
  url: string
  icon?: Icon
  items?: NavigationItem[]
  matchExact?: boolean
}

export interface NavigationSection {
  label?: string
  items: NavigationItem[]
}

export interface BreadcrumbData {
  title: string
  url: string
}

export interface UserData {
  name: string
  email: string
  avatar: string
}
