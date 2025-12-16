import { toast } from 'sonner'

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading'

interface ToastOptions {
  description?: string
  duration?: number
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  closeButton?: boolean
}

export const useToast = () => {
  const showToast = (type: ToastType, message: string, options?: ToastOptions) => {
    const defaultOptions = {
      duration: 4000,
      ...options,
    }

    switch (type) {
      case 'success':
        return toast.success(message, defaultOptions)
      case 'error':
        return toast.error(message, defaultOptions)
      case 'info':
        return toast.info(message, defaultOptions)
      case 'warning':
        return toast.warning(message, defaultOptions)
      case 'loading':
        return toast.loading(message, defaultOptions)
      default:
        return toast(message, defaultOptions)
    }
  }

  const success = (message: string, options?: ToastOptions) =>
    showToast('success', message, options)

  const error = (message: string, options?: ToastOptions) =>
    showToast('error', message, options)

  const info = (message: string, options?: ToastOptions) =>
    showToast('info', message, options)

  const warning = (message: string, options?: ToastOptions) =>
    showToast('warning', message, options)

  const loading = (message: string, options?: ToastOptions) =>
    showToast('loading', message, options)

  const dismiss = (toastId?: string | number) => {
    if (toastId) {
      toast.dismiss(toastId)
    } else {
      toast.dismiss()
    }
  }

  return {
    showToast,
    success,
    error,
    info,
    warning,
    loading,
    dismiss,
  }
}
