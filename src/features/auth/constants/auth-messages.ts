export const AUTH_MESSAGES = {
  titles: {
    success: 'Success!',
    error: 'Whoops!',
  },
  actions: {
    signIn: {
      success: 'You are successfully signed in.',
      defaultError: 'Failed to sign in. Please try again.',
    },
    signUp: {
      success: 'Account created! Please check your email.',
      defaultError: 'Failed to create account.',
    },
    forgotPassword: {
      success: 'Reset link sent to your email.',
      defaultError: 'Failed to send reset link.',
    },
    updatePassword: {
      success: 'Password updated. You can now sign in.',
      defaultError: 'Failed to update password.',
    }
  }
} as const

export const AUTH_ERROR_MAP: Record<string, string> = {
  'User already registered': 'This email is already in use.',
  'Invalid login credentials': 'User or password incorrect.',
  'Email not confirmed': 'Please confirm your email before logging in.',
  'Password should be at least 6 characters': 'Password must be at least 6 characters.',
  'New password should be different from the old password': 'New password must be different from the old one.',
  'Flow state not found': 'The link has expired or has already been used. Please request a new one.',
  'Identity provider not enabled': 'This login method is not available. Please contact support.',
  'rate limit exceeded': 'Too many attempts. Please wait a few minutes before trying again.'
}
