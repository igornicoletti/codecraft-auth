export const AUTH_CONTENT = {
  loginPage: {
    title: 'Sign in to your account',
    description: 'Welcome back. Please sign in to continue.',
    fields: {
      emailLabel: 'Email',
      emailPlaceholder: 'name@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
    },
    submitButton: 'Sign In',
    forgotPassword: {
      question: 'Forgot your password?',
      link: '/forgot-password',
    },
    signUp: {
      question: 'Don’t have an account?',
      label: 'Sign Up',
      link: '/register',
    },
  },
  registerPage: {
    title: 'Create your free account',
    description: 'Welcome. Please fill in your details to get started.',
    fields: {
      emailLabel: 'Email',
      emailPlaceholder: 'name@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: '••••••••',
    },
    submitButton: 'Create Account',
    signIn: {
      question: 'Already have an account?',
      label: 'Sign In',
      link: '/login',
    },
  },
  forgotPasswordPage: {
    title: 'Recover Password',
    description: 'Enter your email to receive a password reset link.',
    fields: {
      emailLabel: 'Email',
      emailPlaceholder: 'name@example.com',
    },
    submitButton: 'Send Reset Link',
    signIn: {
      question: 'Remember your password?',
      label: 'Back to Sign In',
      link: '/login',
    },
  },
  updatePasswordPage: {
    title: 'Set New Password',
    description: 'Choose a new password to access your account.',
    fields: {
      passwordLabel: 'New Password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm New Password',
      confirmPasswordPlaceholder: '••••••••',
    },
    submitButton: 'Update Password',
    signIn: {
      label: 'Back to Sign In',
      link: '/login',
    },
  },
} as const
