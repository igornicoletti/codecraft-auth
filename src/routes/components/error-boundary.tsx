import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError = (error: Error): State => {
    return { hasError: true, error }
  }

  componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <main className="grid min-h-svh place-content-center p-4">
          <div className="flex items-center gap-4 md:gap-6">
            {import.meta.env.DEV && this.state.error && (
              <pre className='text-muted-foreground overflow-auto max-w-2xl'>
                <code>{this.state.error.stack}</code>
              </pre>
            )}
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
