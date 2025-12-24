// src/features/auth/schemas/auth.schema.ts
import { z, type ZodType } from 'zod'

const emailField = z
  .string()
  .trim()
  .min(1, 'E-mail é obrigatório.')
  .email('Digite um e-mail válido.')

const passwordField = z
  .string()
  .trim()
  .min(8, 'A senha deve ter no mínimo 8 caracteres.')

const confirmPasswordField = z
  .string()
  .trim()
  .min(1, 'Confirmação de senha obrigatória.')

const withConfirmPassword = <T extends ZodType<{ password: string; confirmPassword: string }>>(schema: T) =>
  schema.refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem.',
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
})

export const registerSchema = withConfirmPassword(
  z.object({
    email: emailField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
)

export const forgotPasswordSchema = z.object({
  email: emailField,
})

export const updatePasswordSchema = withConfirmPassword(
  z.object({
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
)

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
