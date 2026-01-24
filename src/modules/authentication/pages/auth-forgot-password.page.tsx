import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useFormSubmit } from '@/hooks/use-form-submit'
import { AuthForm } from '@/modules/authentication/components/form/auth-form'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthForgotPasswordPage = () => {
  const { submit, isPending } = useFormSubmit({ uniqueId: 'auth-forgot-password' })
  const navigate = useNavigate()
  const content = AUTH_CONTENT_MAP.forgotPassword

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const handleForgotPassword = async (data: ForgotPasswordSchema) => {
    await submit(() => authService.resendOtp(data.email, 'recovery'), {
      onSuccess: () => {
        navigate(ROUTE_PATHS.AUTH.VERIFY_EMAIL, {
          state: { email: data.email, type: 'recovery' }
        })
      },
      successMessage: 'Verifique sua caixa de entrada.'
    })
  }

  return (
    <AuthForm
      form={form}
      onSubmit={handleForgotPassword}
      submitText={content.submit}
      isLoading={isPending}
      fields={[
        {
          name: 'email',
          label: content.fields.emailLabel,
          placeholder: content.fields.emailPlaceholder,
          type: 'email',
          autoComplete: 'email',
        },
      ]}
    />
  )
}

export default AuthForgotPasswordPage
