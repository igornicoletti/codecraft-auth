import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'

import { GenericForm } from '@/components/common/form/form'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import type { AuthLayoutContext } from '@/modules/authentication/layouts/auth.layout'
import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/modules/authentication/schemas/auth.schemas'
import { authService } from '@/modules/authentication/services/auth.service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthForgotPasswordPage = () => {
  const content = AUTH_CONTENT_MAP.forgotPassword
  const { setTitle, setDescription } = useOutletContext<AuthLayoutContext>()

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const { submit, isPending, isSuccess } = useFormSubmit({
    onSuccess: () => {
      setTitle(content.customTitle ?? null)
      setDescription(content.customDescription ?? null)
    }
  })

  async function handleForgotPassword(data: ForgotPasswordSchema) {
    await submit(() => authService.sendPasswordReset(data.email, ROUTE_PATHS.AUTH.UPDATE_PASSWORD))
  }

  if (isSuccess) return null

  return (
    <>
      <GenericForm
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
    </>
  )
}

export default AuthForgotPasswordPage
