import { LightningIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar"
import { SidebarNavigation } from '@/modules/application/components/sidebar/sidebar-navigation'
import { SidebarUser } from '@/modules/application/components/sidebar/sidebar-user'
import type { NavigationSection, UserData } from '@/modules/application/types/application-types'

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  navigation: NavigationSection[]
  user: UserData
}

export const AppSidebar = ({ navigation, user, ...props }: AppSidebarProps) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className='hover:bg-transparent!'>
              <div className="flex aspect-square size-8 items-center justify-center">
                <LightningIcon weight='bold' className='size-5 text-primary' />
              </div>
              <span className="font-semibold tracking-tight uppercase">CodeCraft</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((section, idx) => (
          <SidebarNavigation key={idx} section={section} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
