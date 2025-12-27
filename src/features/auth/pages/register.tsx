// src/features/auth/pages/register.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AuthForm } from '@/features/auth/components/auth-form'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { registerSchema, type RegisterInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'

export const RegisterPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<RegisterInput>()

  const { fields, separator, social, submitButton } = AUTH_CONTENT.register

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  })

  const onSubmit = async (data: RegisterInput) => {
    await handleSubmit((vals) =>
      authService.signUp(vals.email, vals.password),
      data,
      '/login'
    )
  }

  const handleGoogleLogin = async () => {
    try {
      await authService.signInWithGoogle()
    } catch (err) {
      console.error('Google Auth Error:', err)
    }
  }

  const formFields = [{
    name: 'email' as const,
    label: fields.emailLabel,
    placeholder: fields.emailPlaceholder,
    type: 'email',
    autoComplete: 'username',
  }, {
    name: 'password' as const,
    label: fields.passwordLabel,
    placeholder: fields.passwordPlaceholder,
    type: 'password',
    autoComplete: 'new-password',
  }, {
    name: 'confirmPassword' as const,
    label: fields.confirmPasswordLabel,
    placeholder: fields.confirmPasswordPlaceholder,
    type: 'password',
    autoComplete: 'new-password',
  }]

  return (
    <>
      <Button
        variant='secondary'
        className='w-full'
        onClick={handleGoogleLogin}
        disabled={isPending}>
        {social}
      </Button>
      <div className='flex items-center justify-center gap-2 overflow-hidden'>
        <Separator className='shrink' />
        <span className='text-sm text-muted-foreground min-w-fit'>{separator}</span>
        <Separator className='shrink' />
      </div>
      <AuthForm
        form={form}
        onSubmit={onSubmit}
        submitText={submitButton}
        isLoading={isPending}
        fields={formFields} />
    </>
  )
}
