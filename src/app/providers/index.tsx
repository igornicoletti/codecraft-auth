import { type ReactNode, Suspense } from 'react'

import { AuthProvider } from '@/app/providers/auth-provider'
import { ThemeProvider } from '@/app/providers/theme-provider'
import { ErrorBoundary } from '@/components/common/error-boundary'
import { Toaster } from '@/components/ui/sonner'
import { Spinner } from '@/components/ui/spinner'

const LoadingFallback = () => (
  <div className='flex min-h-screen items-center justify-center p-4'>
    <Spinner />
  </div>
)

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingFallback />}>
      <ThemeProvider>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </Suspense>
  </ErrorBoundary>
)
