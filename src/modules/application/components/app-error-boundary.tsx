import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

export interface AppErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export interface AppErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error boundary for the application module.
 * Provides error recovery without breaking the entire app.
 */
export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service (e.g., Sentry)
    console.error('[AppErrorBoundary] Caught error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = ROUTE_PATHS.APP.DASHBOARD
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <main className='flex min-h-svh flex-col p-6'>
          <div className='flex flex-1 items-center justify-center'>
            <Card className='w-full max-w-2xl'>
              <CardHeader>
                <CardTitle>Ops! Algo deu errado</CardTitle>
                <CardDescription>
                  Ocorreu um erro inesperado na aplicação.
                  Tente recarregar a página ou voltar para o dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex flex-col gap-4'>
                {import.meta.env.DEV && this.state.error && (
                  <ScrollArea className='h-50 rounded-md border p-4'>
                    <pre className='text-xs font-mono'>
                      <code>{this.state.error.stack}</code>
                    </pre>
                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>
                )}
                <div className='flex flex-wrap gap-2'>
                  <Button onClick={this.handleReset} variant='default'>
                    Ir para o Dashboard
                  </Button>
                  <Button onClick={() => window.location.reload()} variant='outline'>
                    Recarregar página
                  </Button>
                  <Button asChild variant='ghost'>
                    <Link to={ROUTE_PATHS.ROOT}>Página inicial</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
