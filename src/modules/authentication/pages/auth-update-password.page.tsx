import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { GenericForm } from '@/components/common/form/form'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { updatePasswordSchema, type UpdatePasswordSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthUpdatePasswordPage = () => {
  const navigate = useNavigate()
  const content = AUTH_CONTENT_MAP.updatePassword

  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const { submit, isPending } = useFormSubmit({
    onSuccess: () => navigate(ROUTE_PATHS.AUTH.SIGN_IN),
  })

  async function handleUpdatePassword(data: UpdatePasswordSchema) {
    await submit(() => authService.updatePassword(data.password).then((res) => {
      if (!res.success) { throw res.error }
    }))
  }

  return (
    <>
      <GenericForm
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
        ]} />
    </>
  )
}

export default AuthUpdatePasswordPage
