import type { Icon } from '@phosphor-icons/react'

export interface NavigationItem {
  title: string
  url: string
  icon?: Icon
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
