import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'
import { router } from '@/features/route/router.client'
import { AuthProvider } from '@/providers/auth-provider'
import { ThemeProvider } from '@/providers/theme-provider'

export const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster richColors position='top-right' />
    </AuthProvider>
  </ThemeProvider>
)
