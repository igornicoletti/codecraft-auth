import { Component, type ErrorInfo, type ReactNode } from 'react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export interface ErrorProps {
  children?: ReactNode
  fallback?: ReactNode
}

export interface ErrorState {
  hasError: boolean
  error: Error | null
}

export class RouteErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Integration with error reporting services (e.g., Sentry) goes here
    console.error('RouteErrorBoundary caught:', error, errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <main className='flex min-h-svh flex-col p-6'>
          <div className='flex flex-1 items-center justify-center'>
            <div className='w-full max-w-7xl'>
              {import.meta.env.DEV && this.state.error && (
                <ScrollArea className='border-l pl-4'>
                  <pre className='text-sm text-muted-foreground'>
                    <code>{this.state.error.stack}</code>
                  </pre>
                  <ScrollBar orientation="horizontal" />
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
