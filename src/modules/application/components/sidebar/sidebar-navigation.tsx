import { CaretRightIcon } from '@phosphor-icons/react'
import { Link, matchPath, useLocation } from 'react-router-dom'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar'
import type { NavigationItem, NavigationSection } from '@/modules/application/types/app.types'

const NavItem = ({ item }: { item: NavigationItem }) => {
  const { pathname } = useLocation()

  const isUrlActive = (url: string, exact = false) => {
    return !!matchPath({ path: url, end: exact }, pathname)
  }

  const hasActiveChild = (items?: NavigationItem[]): boolean => {
    return !!items?.some((child) => isUrlActive(child.url) || hasActiveChild(child.items))
  }

  const isChildActive = hasActiveChild(item.items)
  const isSelfActive = isUrlActive(item.url, item.items ? false : true)
  const isActive = isSelfActive
  const isOpen = isActive || isChildActive

  if (item.items?.length) {
    return (
      <Collapsible asChild defaultOpen={isOpen} className='group/collapsible'>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} isActive={isActive}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <CaretRightIcon className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
            </SidebarMenuButton>
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
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
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
