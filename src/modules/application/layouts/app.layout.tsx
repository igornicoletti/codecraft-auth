import { Outlet } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/modules/application/components/app-sidebar'
import { BreadcrumbCollapsed } from '@/modules/application/components/navbar/breadcrumb-collapsed'
import { useAuth } from '@/modules/authentication/contexts/auth.context'
import { useRouteMetadata } from '@/routes/hooks/use-route-metadata'

const AppLayout = () => {
  const { breadcrumbs, navigation } = useRouteMetadata()
  const { user } = useAuth()

  const userData = {
    name: user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      user?.email?.split('@')?.[0] || '',
    email: user?.email || '',
    avatar: user?.user_metadata?.avatar_url ||
      user?.user_metadata?.picture || '',
  }

  return (
    <SidebarProvider>
      <AppSidebar navigation={navigation} user={userData} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
            <BreadcrumbCollapsed breadcrumb={breadcrumbs} />
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppLayout
