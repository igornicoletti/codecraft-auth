import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/contexts/theme.context'
import { AuthProvider } from '@/features/auth/contexts/auth.context'
import { router } from '@/routes'

export const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
)
