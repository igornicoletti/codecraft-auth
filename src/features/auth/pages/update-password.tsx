// src/features/auth/pages/update-password.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'

import { AuthForm } from '@/features/auth/components/auth-form'
import type { AuthLayoutContext } from '@/features/auth/components/auth-layout'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuth } from '@/features/auth/contexts/auth.context'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { updatePasswordSchema, type UpdatePasswordInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'

export const UpdatePasswordPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<UpdatePasswordInput>()
  const { setTitle } = useOutletContext<AuthLayoutContext>()
  const { user } = useAuth()
  const { title, fields, submitButton } = AUTH_CONTENT.updatePassword

  useEffect(() => {
    const userName =
      user?.user_metadata?.display_name ||
      user?.email?.split('@')[0] ||
      ''
    setTitle(`${title} @${userName}`)
  }, [user, title, setTitle])

  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: UpdatePasswordInput) => {
    await handleSubmit(
      (vals) => authService.updatePassword(vals.password),
      data,
      '/login',
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
      submitText={submitButton}
      isLoading={isPending}
    />
  )
}
