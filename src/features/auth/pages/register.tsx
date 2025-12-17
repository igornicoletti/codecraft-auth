import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

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
import { registerSchema, type RegisterInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'
import { useToast } from '@/hooks/use-toast'

export const RegisterPage = () => {
  const { success, error } = useToast()
  const navigate = useNavigate()

  const { registerPage, messages } = AUTH_COPY

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: RegisterInput) => {
    try {
      await authService.signUp(data.email, data.password)
      navigate('/login')
      success(messages.success, { description: messages.registerSuccess })
    } catch (err) {
      error(messages.failed, { description: err instanceof Error ? err.message : messages.registerError })
    }
  }

  const formFields = [
    {
      name: 'email' as const,
      label: registerPage.fields.emailLabel,
      placeholder: registerPage.fields.emailPlaceholder,
      type: 'email',
      autoComplete: 'username',
    },
    {
      name: 'password' as const,
      label: registerPage.fields.passwordLabel,
      placeholder: registerPage.fields.passwordPlaceholder,
      type: 'password',
      autoComplete: 'new-password',
    },
    {
      name: 'confirmPassword' as const,
      label: registerPage.fields.confirmPasswordLabel,
      placeholder: registerPage.fields.confirmPasswordPlaceholder,
      type: 'password',
      autoComplete: 'new-password',
    },
  ]

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-8'>
      <div className='relative max-w-md w-full overflow-hidden'>
        <Card className='bg-linear-to-t from-muted/50 to-card'>
          <CardHeader>
            <CardTitle>{registerPage.title}</CardTitle>
            <CardDescription>{registerPage.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <AuthForm
              form={form}
              onSubmit={onSubmit}
              submitText={registerPage.submitButton}
              isLoading={isSubmitting}
              fields={formFields}
            />
          </CardContent>

          <CardFooter>
            <div className="flex items-baseline">
              <p className='text-sm text-muted-foreground'>
                {registerPage.signIn.question}
              </p>
              <Button asChild size='sm' variant='link'>
                <Link to={registerPage.signIn.link}>
                  {registerPage.signIn.label}
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
