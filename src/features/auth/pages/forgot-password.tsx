// src/features/auth/pages/forgot-password.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'

import { AuthForm } from '@/features/auth/components/auth-form'
import type { AuthLayoutContext } from '@/features/auth/components/auth-layout'
import { AUTH_CONTENT } from '@/features/auth/constants/auth-content'
import { useAuthSubmit } from '@/features/auth/hooks/use-auth-submit'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/features/auth/schemas/auth.schema'
import { authService } from '@/features/auth/services/auth.service'

export const ForgotPasswordPage = () => {
  const { handleSubmit, isPending } = useAuthSubmit<ForgotPasswordInput>()
  const { setDescription } = useOutletContext<AuthLayoutContext>()
  const [isEmailSent, setIsEmailSent] = useState(false)

  const { fields, submitButton, message } = AUTH_CONTENT.forgotPassword

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    await handleSubmit(async (vals) => {
      await authService.resetPassword(vals.email)
      setIsEmailSent(true)
      setDescription(message)
    }, data)
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

  if (isEmailSent) return null

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
