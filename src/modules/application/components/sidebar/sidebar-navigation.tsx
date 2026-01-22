import { CaretRightIcon } from '@phosphor-icons/react'
import { memo, useMemo } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar'
import type { NavigationItem, NavigationSection } from '@/modules/application/types/app.types'

interface NavItemProps {
  item: NavigationItem
}

const SidebarNavItem = memo(({ item }: NavItemProps) => {
  const { pathname } = useLocation()

  const isUrlActive = useMemo(() => (url: string, exact = false) => !!matchPath({
    path: url, end: exact
  }, pathname), [pathname])

  const activeChild = useMemo(() => {
    const checkChildren = (items?: NavigationItem[]): boolean =>
      !!items?.some((child) => isUrlActive(child.url) || checkChildren(child.items))
    return checkChildren(item.items)
  }, [item.items, isUrlActive])

  const isSelfActive = isUrlActive(item.url, true)
  const shouldBeOpen = isSelfActive || activeChild

  const hasSubItems = item.items && item.items.length > 0

  return (
    <Collapsible asChild defaultOpen={shouldBeOpen} className="group/collapsible">
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={item.title} isActive={isSelfActive}>
          <Link to={item.url || '#'}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>

        {hasSubItems && (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <CaretRightIcon className="transition-transform duration-200" />
                <span className="sr-only">Alternar submenu</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((sub) => (
                  <SidebarNavItem key={sub.url} item={sub} />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        )}
      </SidebarMenuItem>
    </Collapsible>
  )
})

SidebarNavItem.displayName = 'SidebarNavItem'

export const SidebarNavigation = memo(({ section }: { section: NavigationSection }) => {
  if (!section.items?.length) return null

  return (
    <SidebarGroup>
      {section.label && <SidebarGroupLabel>{section.label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map((item) => (
            <SidebarNavItem key={item.url} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
})

SidebarNavigation.displayName = 'SidebarNavigation'
