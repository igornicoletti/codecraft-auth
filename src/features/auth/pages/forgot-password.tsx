import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AUTH_COPY } from '@/features/auth/constants/auth-copy'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'
import { useToast } from '@/hooks/use-toast'

export const ForgotPasswordPage = () => {
  const { success, error } = useToast()

  const { forgotPasswordPage, messages } = AUTH_COPY

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      await authService.resetPassword(data.email)
      success(messages.success, { description: messages.resetLinkSent })
    } catch (err) {
      error(messages.failed, { description: err instanceof Error ? err.message : messages.resetLinkError })
    }
  }

  const formFields = [
    {
      name: 'email' as const,
      label: forgotPasswordPage.fields.emailLabel,
      placeholder: forgotPasswordPage.fields.emailPlaceholder,
      type: 'email',
      autoComplete: 'email',
    },
  ]

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Card className='relative max-w-md w-full bg-linear-to-b from-muted/50 dark:from-transparent to-card overflow-hidden'>
        <CardHeader>
          <CardTitle>{forgotPasswordPage.title}</CardTitle>
          <CardDescription>{forgotPasswordPage.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <AuthForm
            form={form}
            onSubmit={onSubmit}
            submitText={forgotPasswordPage.submitButton}
            isLoading={isSubmitting}
            fields={formFields}
          />
        </CardContent>

        <CardFooter>
          <Link
            to={forgotPasswordPage.signIn.link}
            className='text-sm text-primary hover:underline'>
            {forgotPasswordPage.signIn.label}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
