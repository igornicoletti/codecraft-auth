import { z } from 'zod'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const commonPasswords = [
  'password', '12345678', 'qwerty', 'abc123', 'password123',
  '11111111', '123456789', '1234567890', 'senha123', 'admin123'
]

export const emailField = z
  .string()
  .trim()
  .min(1, 'E-mail é obrigatório.')
  .max(254, 'E-mail muito longo.')
  .refine((value) => emailRegex.test(value), { message: 'Digite um e-mail válido.' })
  .transform((value) => value.toLowerCase())

const passwordField = z
  .string()
  .trim()
  .min(12, 'A senha deve ter no mínimo 12 caracteres.')
  .refine(
    (value) => /[A-Z]/.test(value),
    { message: 'A senha deve conter pelo menos uma letra maiúscula.' }
  )
  .refine(
    (value) => /[a-z]/.test(value),
    { message: 'A senha deve conter pelo menos uma letra minúscula.' }
  )
  .refine(
    (value) => /[0-9]/.test(value),
    { message: 'A senha deve conter pelo menos um número.' }
  )
  .refine(
    (value) => /[^A-Za-z0-9]/.test(value),
    { message: 'A senha deve conter pelo menos um caractere especial.' }
  )
  .refine(
    (value) => !commonPasswords.includes(value.toLowerCase()),
    { message: 'Esta senha é muito comum. Escolha uma senha mais segura.' }
  )

const confirmPasswordField = z
  .string()
  .trim()
  .min(1, 'Confirmação de senha é obrigatória.')

const withConfirmPassword = <
  T extends z.ZodObject<{
    password: z.ZodString
    confirmPassword: z.ZodString
  }>
>(
  schema: T
) =>
  schema.refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'As senhas não correspondem.',
    }
  )

export const signInSchema = z.object({
  email: emailField,
  password: passwordField,
})

export const signUpSchema = withConfirmPassword(
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

export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
