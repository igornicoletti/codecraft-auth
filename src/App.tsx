import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/contexts/theme.context'
import { AuthenticationProvider } from '@/modules/authentication/contexts/authentication-context'
import { router } from '@/routes'

export const App = () => (
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <AuthenticationProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthenticationProvider>
  </ThemeProvider>
)
