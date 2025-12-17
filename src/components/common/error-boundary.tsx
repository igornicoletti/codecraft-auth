import { Component, type ErrorInfo, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { LineShadowText } from '@/components/ui/line-shadow-text'

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
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='min-h-screen flex flex-col items-center justify-center px-4 py-8'>
          <div className='text-center space-y-6'>
            <h1 className='text-6xl font-semibold leading-none text-primary tracking-tighter'>
              <LineShadowText>Whoops!</LineShadowText>
            </h1>
            <p className='text-sm text-muted-foreground'>
              Something went wrong
            </p>
            {import.meta.env.DEV && this.state.error && (
              <div className='text-left'>
                <code className='text-xs wrap-break-word'>
                  {this.state.error.toString()}
                </code>
              </div>
            )}
            <Button onClick={this.handleReload}>
              Try again
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
