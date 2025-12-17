import { type ReactNode, Suspense } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { Spinner } from '@/components/ui/spinner'
import { AuthProvider } from '@/providers/auth-provider'
import { ThemeProvider } from '@/providers/theme-provider'

const LoadingFallback = () => (
  <div className='flex min-h-screen items-center justify-center p-4'>
    <Spinner />
  </div>
)

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <Suspense fallback={<LoadingFallback />}>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </Suspense>
  </ThemeProvider>
)
