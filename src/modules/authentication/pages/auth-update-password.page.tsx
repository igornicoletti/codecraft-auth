import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useFormSubmit } from '@/hooks/use-form-submit'
import { AuthForm } from '@/modules/authentication/components/form/auth-form'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { updatePasswordSchema, type UpdatePasswordSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthUpdatePasswordPage = () => {
  const { submit, isPending } = useFormSubmit()
  const content = AUTH_CONTENT_MAP.updatePassword

  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const handleUpdatePassword = async (data: UpdatePasswordSchema) => {
    await submit(() => authService.updatePassword(data.password), {
      redirectTo: ROUTE_PATHS.APP.DASHBOARD,
      successMessage: 'Senha atualizada com sucesso!'
    })
  }

  return (
    <AuthForm
      form={form}
      onSubmit={handleUpdatePassword}
      submitText={content.submit}
      isLoading={isPending}
      fields={[
        {
          name: 'password',
          label: content.fields.passwordLabel,
          placeholder: content.fields.passwordPlaceholder,
          type: 'password',
          autoComplete: 'new-password',
        },
        {
          name: 'confirmPassword',
          label: content.fields.confirmPasswordLabel,
          placeholder: content.fields.confirmPasswordPlaceholder,
          type: 'password',
          autoComplete: 'new-password',
        },
      ]}
    />
  )
}

export default AuthUpdatePasswordPage
