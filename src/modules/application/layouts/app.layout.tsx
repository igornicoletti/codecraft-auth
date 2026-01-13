import { Outlet } from 'react-router-dom'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppHeader } from '@/modules/application/components/app-header'
import { AppSidebar } from '@/modules/application/components/app-sidebar'
import { useAuth } from '@/modules/authentication/contexts/auth.context'
import { useRouteMetadata } from '@/routes/hooks/use-route-metadata'

const AppLayout = () => {
  const { user } = useAuth()
  const { breadcrumbs, navigation } = useRouteMetadata()

  const currentUser = {
    name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || '',
    email: user?.email || '',
    avatar: user?.user_metadata?.avatar_url || '',
  }

  return (
    <SidebarProvider>
      <AppSidebar navigation={navigation} user={currentUser} />
      <SidebarInset>
        <AppHeader breadcrumb={breadcrumbs.filter((b) => b !== null)} />
        <main className='flex flex-1 flex-col gap-4 p-4'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppLayout
