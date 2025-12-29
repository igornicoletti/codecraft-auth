// src/features/app/components/app-sidebar.tsx
import { LightningIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar'
import { AppUser } from '@/features/app/components/app-user'
import { useAuth } from '@/features/auth/contexts/auth.context'

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const { user } = useAuth()

  const userData = {
    name: user?.user_metadata?.full_name ||
      user?.user_metadata?.display_name ||
      user?.email?.split('@')[0] ||
      '',

    email: user?.email || '',

    avatar: user?.user_metadata?.avatar_url ||
      user?.user_metadata?.picture ||
      '',
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className='hover:bg-transparent!'>
              <div className="flex aspect-square size-8 items-center justify-center">
                <LightningIcon weight='fill' className='size-6 text-primary' />
              </div>
              <span className="text-lg font-semibold tracking-tight uppercase">CodeCraft</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter>
        <AppUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
