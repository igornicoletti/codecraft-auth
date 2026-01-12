export interface AuthActionConfig {
  question: string
  label: string
  link: string
}

export interface AuthBaseContent {
  title: string
  description: string
  submit: string

  customTitle?: string
  customDescription?: string

  actions?: AuthActionConfig
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
    question: string
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
  forgotPassword: ForgotPasswordContent
  updatePassword: UpdatePasswordContent
}

export type AuthContentKey = keyof AuthContentMap
