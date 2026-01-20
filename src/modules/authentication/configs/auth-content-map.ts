import type { AuthContentMap } from '@/modules/authentication/types/auth-content.types'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

export const AUTH_CONTENT_MAP: AuthContentMap = {
  signIn: {
    title: 'Faça login na CodeCraft',
    description: 'Acesse sua conta para explorar recursos exclusivos.',
    social: 'Faça login com o Google',
    submit: 'Faça login na CodeCraft',
    separator: 'ou',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••',
    },
    forgot: {
      question: 'Esqueceu sua senha?',
      link: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
    },
    actions: {
      question: 'Novo em nossa plataforma?',
      label: 'Inscreva-se',
      link: ROUTE_PATHS.AUTH.SIGN_UP,
    },
  },
  signUp: {
    title: 'Inscreva-se na CodeCraft',
    description: 'Explore os principais recursos da nossa plataforma.',
    social: 'Inscreva-se com o Google',
    submit: 'Inscreva-se na CodeCraft',
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
      question: 'Já tem uma conta?',
      label: 'Entrar',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  forgotPassword: {
    title: 'Esqueceu sua senha?',
    description: 'Informe seu e-mail abaixo e enviaremos um link para redefinir sua senha.',
    customTitle: 'Verifique seu e-mail',
    customDescription: 'Se houver uma conta associada ao endereço fornecido, um e-mail será enviado.',
    submit: 'Enviar link de redefinição',
    fields: {
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
    },
    actions: {
      question: 'Lembrou sua senha?',
      label: 'Entrar',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  updatePassword: {
    title: 'Redefinir sua senha',
    description: 'Informe sua nova senha abaixo para redefinir o acesso à sua conta.',
    submit: 'Redefinir senha',
    fields: {
      passwordLabel: 'Nova senha',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar nova senha',
      confirmPasswordPlaceholder: '••••••••',
    },
    actions: {
      question: 'Lembrou sua senha?',
      label: 'Entrar',
      link: ROUTE_PATHS.AUTH.SIGN_IN,
    },
  },
  verifyEmail: {
    title: 'Verifique seu e-mail',
    description: 'Enviamos um código de verificação para o seu e-mail. Insira os 6 dígitos abaixo.',
    submit: 'Verificar código',
    fields: {
      otpLabel: 'Código de verificação',
    },
    actions: {
      question: 'E-mail incorreto?',
      label: 'Voltar para cadastro',
      link: ROUTE_PATHS.AUTH.SIGN_UP,
    },
  },
}
