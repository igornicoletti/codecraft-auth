import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AuthForm } from '@/modules/authentication/components'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { useAuthSubmit } from '@/modules/authentication/hooks/use-auth-submit'
import { updatePasswordSchema, type UpdatePasswordInput } from '@/modules/authentication/schemas/authentication-schemas'
import { authenticationService } from '@/modules/authentication/services/authentication-service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthUpdatePasswordPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<UpdatePasswordInput>()

  const { fields, submit } = AUTH_CONTENT_MAP.updatePassword

  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: UpdatePasswordInput) => {
    await handleSubmit(
      (vals) => authenticationService.updatePassword(vals.password),
      data,
      ROUTE_PATHS.AUTH.SIGN_IN
    )
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
      onSubmit={onSubmit}
      fields={formFields}
      submitText={submit}
      isLoading={isPending}
    />
  )
}

export default AuthUpdatePasswordPage
