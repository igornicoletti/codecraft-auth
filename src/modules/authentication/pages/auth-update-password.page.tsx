import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AuthForm } from '@/modules/authentication/components/auth-form'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { useAuthSubmit } from '@/modules/authentication/hooks/use-auth-submit'
import { updatePasswordSchema, type UpdatePasswordSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthUpdatePasswordPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<UpdatePasswordSchema>()

  const { fields, submit } = AUTH_CONTENT_MAP.updatePassword

  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const handleUpdatePassword = async (data: UpdatePasswordSchema) => {
    await handleSubmit((formData) => authService.updatePassword(formData.password), data, ROUTE_PATHS.APP.DASHBOARD)
  }

  const formFields = [
    {
      name: 'password' as const,
      label: fields.passwordLabel,
      placeholder: fields.passwordPlaceholder,
      type: 'password',
      autoComplete: 'new-password',
    },
    {
      name: 'confirmPassword' as const,
      label: fields.confirmPasswordLabel,
      placeholder: fields.confirmPasswordPlaceholder,
      type: 'password',
      autoComplete: 'new-password',
    },
  ]

  return (
    <AuthForm
      form={form}
      onSubmit={handleUpdatePassword}
      fields={formFields}
      submitText={submit}
      isLoading={isPending} />
  )
}

export default AuthUpdatePasswordPage
