import type { AuthContentMap } from '@/modules/authentication/types/auth-content.types'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

export const AUTH_CONTENT_MAP: AuthContentMap = {
  signIn: {
    title: 'Faça login na CodeCraft',
    description: 'Acesse sua conta para explorar recursos exclusivos.',
    social: 'Faça login com o Google',
    submit: 'Entrar na plataforma',
    separator: 'ou',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••',
    },
    forgot: {
      text: 'Esqueceu sua senha?',
      link: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
    },
    actions: {
      text: 'Novo em nossa plataforma?',
      label: 'Inscreva-se',
      link: ROUTE_PATHS.AUTH.SIGN_UP,
    },
  },
  signUp: {
    title: 'Criar conta na CodeCraft',
    description: 'Comece sua jornada explorando nossos principais recursos.',
    social: 'Inscreva-se com o Google',
    submit: 'Criar conta',
    separator: 'ou',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar senha',
      confirmPasswordPlaceholder: '••••••••',
    },
    actions: {
      text: 'Já tem uma conta?',
      label: 'Entrar',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  verifyEmail: {
    title: 'Verificação de segurança',
    description: 'Digite o código de 6 dígitos enviado para seu e-mail para continuar.',
    submit: 'Validar código',
    fields: {
      otpLabel: 'Código de verificação',
    },
    resend: 'Reenviar código',
    actions: {
      text: 'Digitou o e-mail errado?',
      label: 'Voltar',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  forgotPassword: {
    title: 'Recuperar senha',
    description: 'Informe seu e-mail para receber um código de redefinição.',
    submit: 'Enviar código',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
    },
    actions: {
      text: 'Lembrou sua senha?',
      label: 'Voltar ao login',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  updatePassword: {
    title: 'Redefinir senha',
    description: 'Crie uma nova senha forte para proteger sua conta.',
    submit: 'Salvar nova senha',
    fields: {
      passwordLabel: 'Nova senha',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar nova senha',
      confirmPasswordPlaceholder: '••••••••',
    },
    actions: {
      text: 'Cancelar e',
      label: 'voltar ao login',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
}
