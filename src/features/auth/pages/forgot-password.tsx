import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
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
    <div className='min-h-screen flex items-center justify-center px-4 py-8'>
      <div className='relative max-w-md w-full overflow-hidden'>
        <Card className='bg-linear-to-t from-muted/50 to-card'>
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
            <div className="flex items-baseline">
              <p className='text-sm text-muted-foreground'>
                {forgotPasswordPage.signIn.question}
              </p>
              <Button asChild size='sm' variant='link'>
                <Link to={forgotPasswordPage.signIn.link}>
                  {forgotPasswordPage.signIn.label}
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
