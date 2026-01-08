import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/contexts/theme.context'
import { AuthProvider } from '@/modules/authentication/contexts/auth.context'
import { router } from '@/routes'

export const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  </ThemeProvider>
)
