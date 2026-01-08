import { Outlet } from 'react-router-dom'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppErrorBoundary } from '@/modules/application/components/app-error-boundary'
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
    <AppErrorBoundary>
      <SidebarProvider>
        <AppSidebar navigation={navigation} user={currentUser} />
        <SidebarInset>
          <AppHeader breadcrumb={breadcrumbs} />
          <main className='flex flex-1 flex-col gap-4 p-4'>
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AppErrorBoundary>
  )
}

export default AppLayout
