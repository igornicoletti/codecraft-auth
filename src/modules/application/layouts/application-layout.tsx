import { ChartLineUpIcon, UserIcon } from '@phosphor-icons/react'
import { Outlet } from 'react-router-dom'

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppHeader } from '@/modules/application/components/app-header'
import { AppSidebar } from '@/modules/application/components/app-sidebar'
import type { NavigationSection, UserData } from '@/modules/application/types/application-types'

const navigationData: NavigationSection[] = [
  {
    label: 'Main',
    items: [
      { title: 'Dashboard', url: '/dashboard', icon: ChartLineUpIcon },
      {
        title: 'Profile',
        url: '/profile',
        icon: UserIcon,
        items: [
          { title: 'Overview', url: '/profile/overview' },
          { title: 'Stats', url: '/profile/stats' },
        ],
      },
    ],
  },
]

const currentUser: UserData = {
  name: "Igor Nicoletti",
  email: "igor93nicoletti@example.com",
  avatar: "https://avatars.githubusercontent.com/u/40406316?v=4",
}

const ApplicationLayout = () => {

  return (
    <SidebarProvider>
      <AppSidebar
        navigation={navigationData}
        user={currentUser} />

      <SidebarInset>
        <AppHeader />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default ApplicationLayout
