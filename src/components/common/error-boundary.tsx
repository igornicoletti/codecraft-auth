import { Button } from '@/components/ui/button'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='flex min-h-screen items-center justify-center p-4'>
          <div className='w-full max-w-md'>
            <div className='space-y-2'>
              <h2 className='mb-6 text-5xl font-semibold'>Whoops!</h2>
              <h3 className='mb-1.5 text-3xl font-semibold'>Something went wrong</h3>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <div className='p-4 text-left'>
                <code className='text-xs wrap-break-word'>
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <Button onClick={this.handleReload} size='lg'>
              Try again
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
