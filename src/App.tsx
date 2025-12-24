// src/App.tsx
import { RouterProvider } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/contexts/theme.context'
import { AuthProvider } from '@/features/auth/contexts/auth.context'
import { router } from '@/routes'

export const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
      <SpeedInsights />
    </AuthProvider>
  </ThemeProvider>
)
