import { z } from 'zod'

const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: {
    upperCase: /[A-Z]/,
    lowerCase: /[a-z]/,
    number: /[0-9]/,
    special: /[^A-Za-z0-9]/,
  }
}

export const emailField = z
  .string()
  .trim()
  .min(1, 'E-mail é obrigatório.')
  .max(254, 'E-mail muito longo.')
  .toLowerCase()
  .refine((value) => REGEX_PATTERNS.email.test(value), {
    message: 'Digite um e-mail válido.'
  })

const passwordField = z
  .string()
  .trim()
  .min(6, 'A senha deve ter no mínimo 6 caracteres.')
  .refine((val) => REGEX_PATTERNS.password.upperCase.test(val), 'Precisa de uma letra maiúscula.')
  .refine((val) => REGEX_PATTERNS.password.lowerCase.test(val), 'Precisa de uma letra minúscula.')
  .refine((val) => REGEX_PATTERNS.password.number.test(val), 'Precisa de um número.')
  .refine((val) => REGEX_PATTERNS.password.special.test(val), 'Precisa de um caractere especial.')

const confirmPasswordField = z
  .string()
  .trim()
  .min(1, 'Confirmação de senha é obrigatória.')

const withConfirmPassword = <T extends z.ZodRawShape>(schemaObj: T) => {
  return z.object(schemaObj).refine((data) => {
    const password = (data as any).password
    const confirm = (data as any).confirmPassword
    return password === confirm
  }, {
    path: ['confirmPassword'],
    message: 'As senhas não correspondem.',
  })
}

export const verifyEmailSchema = z.object({
  token: z.string().min(6, 'O código deve ter 6 dígitos.').max(6),
})

export const signInSchema = z.object({
  email: emailField,
  password: passwordField,
})

export const signUpSchema = withConfirmPassword({
  email: emailField,
  password: passwordField,
  confirmPassword: confirmPasswordField,
})

export const forgotPasswordSchema = z.object({
  email: emailField,
})

export const updatePasswordSchema = withConfirmPassword({
  password: passwordField,
  confirmPassword: confirmPasswordField,
})

export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
