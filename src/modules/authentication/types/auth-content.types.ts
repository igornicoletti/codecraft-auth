export interface AuthBaseContent {
  title: string
  description: string
  submit?: string
  actions?: {
    text: string
    label: string
    link: string
  }
}

export interface SignInContent extends AuthBaseContent {
  social: string
  separator: string
  fields: {
    emailLabel: string
    emailPlaceholder?: string
    passwordLabel: string
    passwordPlaceholder?: string
  }
  forgot: {
    text: string
    link: string
  }
}

export interface SignUpContent extends AuthBaseContent {
  social: string
  separator: string
  fields: {
    emailLabel: string
    emailPlaceholder?: string
    passwordLabel: string
    passwordPlaceholder?: string
    confirmPasswordLabel: string
    confirmPasswordPlaceholder?: string
  }
}

export interface VerifyEmailContent extends AuthBaseContent {
  resend: string
  fields: {
    otpLabel: string
  }
}

export interface ForgotPasswordContent extends AuthBaseContent {
  fields: {
    emailLabel: string
    emailPlaceholder?: string
  }
}

export interface UpdatePasswordContent extends AuthBaseContent {
  fields: {
    passwordLabel: string
    passwordPlaceholder?: string
    confirmPasswordLabel: string
    confirmPasswordPlaceholder?: string
  }
}

export interface AuthContentMap {
  signIn: SignInContent
  signUp: SignUpContent
  verifyEmail: VerifyEmailContent
  forgotPassword: ForgotPasswordContent
  updatePassword: UpdatePasswordContent
}

export type AuthContentKey = keyof AuthContentMap
