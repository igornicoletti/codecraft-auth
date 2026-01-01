import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'

import { AuthForm } from '@/modules/authentication/components'
import { AUTH_CONTENT_MAP } from '@/modules/authentication/configs/auth-content-map'
import { useAuthentication } from '@/modules/authentication/contexts/authentication-context'
import { useAuthSubmit } from '@/modules/authentication/hooks/use-auth-submit'
import type { AuthLayoutContext } from '@/modules/authentication/layouts/authentication-layout'
import { updatePasswordSchema, type UpdatePasswordInput } from '@/modules/authentication/schemas/authentication-schemas'
import { authenticationService } from '@/modules/authentication/services/authentication-service'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

const AuthUpdatePasswordPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<UpdatePasswordInput>()
  const { setTitle } = useOutletContext<AuthLayoutContext>()
  const { user } = useAuthentication()

  const { title, fields, submit } = AUTH_CONTENT_MAP.updatePassword

  useEffect(() => {
    const userName =
      user?.user_metadata?.full_name ||
      user?.user_metadata?.display_name ||
      user?.email?.split('@')[0] ||
      ''

    if (userName) {
      setTitle(`${title} ${userName}`)
    }
  }, [user, title, setTitle])

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
