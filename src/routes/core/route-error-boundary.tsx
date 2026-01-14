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

      return (
        <main className='flex min-h-svh flex-col p-6'>
          <div className='flex flex-1 items-center justify-center'>
            <div className='w-full max-w-7xl'>
              {import.meta.env.DEV && this.state.error && (
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
