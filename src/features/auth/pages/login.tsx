import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogoIcon } from "@phosphor-icons/react"
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
import { Separator } from '@/components/ui/separator'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AUTH_COPY } from '@/features/auth/constants/auth-copy'
import { loginSchema, type LoginInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'
import { useToast } from '@/hooks/use-toast'

export const LoginPage = () => {
  const { success, error } = useToast()
  const navigate = useNavigate()

  const { loginPage, messages } = AUTH_COPY

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: LoginInput) => {
    try {
      await authService.signIn(data.email, data.password)
      navigate('/dashboard')
      success(messages.success, { description: messages.loginSuccess })
    } catch (err) {
      error(messages.failed, { description: err instanceof Error ? err.message : messages.loginError })
    }
  }

  const formFields = [
    {
      name: 'email' as const,
      label: loginPage.fields.emailLabel,
      placeholder: loginPage.fields.emailPlaceholder,
      type: 'email',
      autoComplete: 'username',
    },
    {
      name: 'password' as const,
      label: loginPage.fields.passwordLabel,
      placeholder: loginPage.fields.passwordPlaceholder,
      type: 'password',
      autoComplete: 'current-password',
    },
  ]

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-8'>
      <div className='relative max-w-md w-full overflow-hidden'>
        <Card className='bg-linear-to-t from-muted/50 to-card'>
          <CardHeader>
            <CardTitle>{loginPage.title}</CardTitle>
            <CardDescription>{loginPage.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Button type='button' variant='secondary' className='w-full'>
              <GoogleLogoIcon weight='bold' className='size-6' />
              Google
            </Button>

            <div className='flex items-center justify-center gap-2 overflow-hidden'>
              <Separator />
              <span className='text-sm text-muted-foreground min-w-fit'>or</span>
              <Separator />
            </div>

            <AuthForm
              form={form}
              onSubmit={onSubmit}
              submitText={loginPage.submitButton}
              isLoading={isSubmitting}
              fields={formFields} />
          </CardContent>

          <CardFooter>
            <Button asChild size='sm' variant='link'>
              <Link to={loginPage.forgotPassword.link}>
                {loginPage.forgotPassword.question}
              </Link>
            </Button>
            <div className="flex items-baseline">
              <p className='text-sm text-muted-foreground'>
                {loginPage.signUp.question}
              </p>
              <Button asChild size='sm' variant='link'>
                <Link to={loginPage.signUp.link}>
                  {loginPage.signUp.label}
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
