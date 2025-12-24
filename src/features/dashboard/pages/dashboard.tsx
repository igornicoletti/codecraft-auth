import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { authService } from '@/features/auth/services/auth.service'

export const DashboardPage = () => (
  <SidebarProvider>
    <Sidebar collapsible='icon'>
      <SidebarHeader>

      </SidebarHeader>
      <SidebarContent>

      </SidebarContent>
      <SidebarFooter>

      </SidebarFooter>
    </Sidebar>
    <SidebarInset>
      <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
        <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
          <Button size='sm' variant='ghost' onClick={() => authService.signOut()}>Logout</Button>
        </div>
      </header>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
)
