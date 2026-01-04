import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AuthForm } from '@/modules/authentication/components'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { useAuthSubmit } from '@/modules/authentication/hooks/use-auth-submit'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/modules/authentication/schemas/authentication-schemas'
import { authenticationService } from '@/modules/authentication/services/authentication-service'

const AuthVerifyEmailPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<ForgotPasswordInput>()

  const { fields, submit } = AUTH_CONTENT_MAP.verifyEmail

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    await handleSubmit(
      (vals) => authenticationService.resendVerificationEmail(vals.email),
      data,
    )
  }

  const formFields = [
    {
      name: 'email' as const,
      label: fields.emailLabel,
      placeholder: fields.emailPlaceholder,
      type: 'email',
      autoComplete: 'email',
    },
  ]

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      fields={formFields}
      submitText={submit}
      isLoading={isPending}
    />
  )
}

export default AuthVerifyEmailPage
