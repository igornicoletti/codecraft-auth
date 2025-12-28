// src/features/app/components/app-sidebar.tsx
import type { ComponentProps } from 'react'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
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
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter>
        <AppUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
