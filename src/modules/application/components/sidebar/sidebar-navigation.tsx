import { CaretRightIcon } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import type { NavigationItem, NavigationSection } from '@/modules/application/types/application-types'

const NavItem = ({ item }: { item: NavigationItem }) => {
  const { pathname } = useLocation()

  const isActive = pathname === item.url
  const isChildActive = item.items?.some((sub) => sub.url === pathname)
  const isOpen = isActive || isChildActive

  if (item.items?.length) {
    return (
      <Collapsible asChild defaultOpen={isOpen} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} isActive={isActive || isChildActive}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <CaretRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((subItem) => (
                <SidebarMenuSubItem key={subItem.url}>
                  <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                    <Link to={subItem.url}>
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
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
