import { CaretRightIcon } from '@phosphor-icons/react'
import { Link, matchPath, useLocation } from 'react-router-dom'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar'
import type { NavigationItem, NavigationSection } from '@/modules/application/types/app.types'

const NavItem = ({ item }: { item: NavigationItem }) => {
  const { pathname } = useLocation()

  const isUrlActive = (url: string, exact = false) =>
    !!matchPath({ path: url, end: exact }, pathname)

  const hasActiveChild = (items?: NavigationItem[]): boolean =>
    !!items?.some((child) => isUrlActive(child.url) || hasActiveChild(child.items))

  const isSelfActive = isUrlActive(item.url, true)
  const isOpen = isSelfActive || hasActiveChild(item.items)

  if (item.items?.length) {
    return (
      <Collapsible asChild defaultOpen={isOpen} className="group/collapsible">
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={item.title} isActive={isSelfActive}>
            <Link to={item.url}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
          <CollapsibleTrigger asChild>
            <SidebarMenuAction className="data-[state=open]:rotate-90">
              <CaretRightIcon />
              <span className="sr-only">Alternar</span>
            </SidebarMenuAction>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((sub) => (
                <NavItem key={sub.url} item={sub} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isSelfActive} tooltip={item.title}>
        <Link to={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export const SidebarNavigation = ({ section }: { section: NavigationSection }) => {
  if (section.items.length === 0) return null

  return (
    <SidebarGroup>
      {section.label && <SidebarGroupLabel>{section.label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map((item) => (
            <NavItem key={item.url} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
