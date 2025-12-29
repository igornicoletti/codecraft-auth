import { LightningIcon } from '@phosphor-icons/react'
import { Outlet } from 'react-router-dom'

import { BreadcrumbNavigation } from '@/components/breadcrumb/breadcrumb-navigation'
import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar"
import { AppUser } from '@/features/app/components/app-user'
import { useAuth } from '@/features/auth/contexts/auth.context'

export const AppLayout = () => {
  const { user } = useAuth()

  const userData = {
    email: user?.email || '',
    avatar: user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '',
    name: user?.user_metadata?.full_name || user?.user_metadata?.display_name || user?.email?.split('@')[0] || '',
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className='hover:bg-transparent!'>
                <div className="flex aspect-square size-8 items-center justify-center">
                  <LightningIcon weight='fill' className='size-5 text-primary' />
                </div>
                <span className="font-semibold tracking-tight uppercase">CodeCraft</span>
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
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex flex-1 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <BreadcrumbNavigation />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
