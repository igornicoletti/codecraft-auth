import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorProps {
  children?: ReactNode
  fallback?: ReactNode
}

interface ErrorState {
  hasError: boolean
  error: Error | null
}

export class RouteErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError = (error: Error): ErrorState => {
    return { hasError: true, error }
  }

  componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    console.error('RouteErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <main className='grid min-h-svh place-content-center p-6'>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='border-l-2 pl-4'>
              {import.meta.env.DEV && this.state.error && (
                <pre className='max-w-7xl text-sm text-muted-foreground'>
                  <code>{this.state.error.stack}</code>
                </pre>
              )}
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
