import { Component, type ErrorInfo, type ReactNode } from 'react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export interface RouteErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export interface RouteErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  constructor(props: RouteErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Em produção, envie isso para um serviço de log (Sentry, LogRocket, etc)
    console.error('[RouteErrorBoundary] Caught error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Verificação de segurança: Stack Trace apenas em ambiente de desenvolvimento explícito
      const isDevMode = import.meta.env.MODE === 'development'

      return (
        <main className='flex min-h-svh flex-col p-6'>
          <div className='flex flex-1 items-center justify-center'>
            <div className='w-full max-w-7xl'>
              {isDevMode && this.state.error && (
                <ScrollArea>
                  <pre className='text-sm text-muted-foreground'>
                    <code>{this.state.error.stack}</code>
                  </pre>
                  <ScrollBar orientation='horizontal' />
                </ScrollArea>
              )}
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
