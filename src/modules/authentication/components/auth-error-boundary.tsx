import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

export interface AuthErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export interface AuthErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error boundary specifically for the authentication module.
 * Provides a user-friendly error display with recovery options.
 */
export class AuthErrorBoundary extends Component<AuthErrorBoundaryProps, AuthErrorBoundaryState> {
  constructor(props: AuthErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service (e.g., Sentry)
    console.error('[AuthErrorBoundary] Caught error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <main className='flex min-h-svh flex-col'>
          <div className='flex flex-1 items-center justify-center py-12'>
            <div className='w-full max-w-md'>
              <Card className='bg-transparent border-none md:bg-card md:bg-linear-to-b from-secondary/50'>
                <CardHeader>
                  <CardTitle>Algo deu errado</CardTitle>
                  <CardDescription>
                    Ocorreu um erro inesperado durante a autenticação. Você pode tentar novamente ou voltar para a
                    página inicial.
                  </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                  {import.meta.env.DEV && this.state.error && (
                    <div className='rounded-md bg-destructive/10 p-4'>
                      <p className='text-xs font-mono text-destructive'>{this.state.error.message}</p>
                    </div>
                  )}
                  <div className='grid gap-2'>
                    <Button onClick={this.handleReset} variant='default'>
                      Tentar novamente
                    </Button>
                    <Button asChild variant='outline'>
                      <Link to={ROUTE_PATHS.ROOT}>Ir para página inicial</Link>
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className='text-sm text-muted-foreground'>
                  Se o problema persistir, entre em contato com o suporte.
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
