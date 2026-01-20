import { z } from 'zod'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const emailField = z
  .string()
  .trim()
  .min(1, 'E-mail é obrigatório.')
  .max(254, 'E-mail muito longo.')
  .transform((value) => value.toLowerCase())
  .refine((value) => emailRegex.test(value), {
    message: 'Digite um e-mail válido.'
  })

const passwordField = z
  .string()
  .trim()
  .min(6, 'A senha deve ter no mínimo 6 caracteres.')
  .refine((value) => /[A-Z]/.test(value), {
    message: 'A senha deve conter pelo menos uma letra maiúscula.'
  })
  .refine((value) => /[a-z]/.test(value), {
    message: 'A senha deve conter pelo menos uma letra minúscula.'
  })
  .refine((value) => /[0-9]/.test(value), {
    message: 'A senha deve conter pelo menos um número.'
  })
  .refine((value) => /[^A-Za-z0-9]/.test(value), {
    message: 'A senha deve conter pelo menos um caractere especial.'
  })

const confirmPasswordField = z
  .string()
  .trim()
  .min(1, 'Confirmação de senha é obrigatória.')

const withConfirmPassword = <
  T extends z.ZodObject<{
    password: z.ZodString
    confirmPassword: z.ZodString
  }>
>(schema: T) => schema.refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas não correspondem.',
})

export const verifyEmailSchema = z.object({
  token: z.string().min(6, 'O código deve ter 6 dígitos.').max(6),
})

export const signInSchema = z.object({
  email: emailField,
  password: passwordField,
})

export const signUpSchema = withConfirmPassword(z.object({
  email: emailField,
  password: passwordField,
  confirmPassword: confirmPasswordField,
}))

export const forgotPasswordSchema = z.object({
  email: emailField,
})

export const updatePasswordSchema = withConfirmPassword(z.object({
  password: passwordField,
  confirmPassword: confirmPasswordField,
}))

export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
