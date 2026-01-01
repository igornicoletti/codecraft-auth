export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'User already registered': 'Este e-mail já está em uso.',
  'Invalid login credentials': 'Usuário ou senha incorretos.',
  'Email not confirmed': 'Confirme seu e-mail antes de fazer login.',
  'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
  'New password should be different from the old password': 'A nova senha deve ser diferente da anterior.',
  'Flow state not found': 'O link expirou ou já foi utilizado. Solicite um novo.',
  'Identity provider not enabled': 'Método de login indisponível. Contate o suporte.',
  'rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.',
  'Network error': 'Falha de conexão com o servidor. Verifique sua internet e tente novamente.',
  'Auth session missing': 'Sessão de autenticação ausente. Faça login novamente.',
  'Token expired': 'Sua sessão expirou. Faça login novamente.',
}
