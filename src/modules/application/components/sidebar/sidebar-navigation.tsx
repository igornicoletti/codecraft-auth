import { CaretRightIcon } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar'
import type { NavigationItem, NavigationSection } from '@/modules/application/types/app.types'

const NavItem = ({ item }: { item: NavigationItem }) => {
  const { pathname } = useLocation()

  const hasActiveChild = (items?: NavigationItem[]): boolean => {
    return !!items?.some((child) => child.url === pathname || hasActiveChild(child.items))
  }

  const isActive = pathname === item.url
  const isChildActive = hasActiveChild(item.items)
  const isOpen = isActive || isChildActive

  return item.items?.length ? (
    <Collapsible asChild defaultOpen={isOpen} className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={isChildActive} tooltip={item.title}>
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
  ) : (
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
