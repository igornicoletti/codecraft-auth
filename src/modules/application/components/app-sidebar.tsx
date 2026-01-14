import { LightningIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar'
import { SidebarNavigation } from '@/modules/application/components/sidebar/sidebar-navigation'
import { SidebarUser } from '@/modules/application/components/sidebar/sidebar-user'
import type { NavigationSection, UserData } from '@/modules/application/types/app.types'

export interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  navigation: NavigationSection[]
  user: UserData
}

export const AppSidebar = ({ navigation, user, ...props }: AppSidebarProps) => (
  <Sidebar collapsible='icon' {...props}>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
              <LightningIcon weight='bold' className='size-5' />
            </div>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold tracking-tight uppercase'>CodeCraft</span>
              <span className='truncate text-xs'>Enterprise</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      {navigation.map((section) => (
        <SidebarNavigation
          key={section.label ?? JSON.stringify(section.items[0]?.url)}
          section={section} />
      ))}
    </SidebarContent>

    <SidebarFooter>
      <SidebarUser user={user} />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
)
