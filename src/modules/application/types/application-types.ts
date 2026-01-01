import type { ElementType } from 'react'

export interface NavigationItem {
  title: string
  url: string
  icon?: ElementType
  items?: NavigationItem[]
}

export interface NavigationSection {
  label?: string
  items: NavigationItem[]
}

export interface UserData {
  name: string
  email: string
  avatar: string
}
