import type { AuthContentMap } from '@/modules/authentication/types/auth-content.types'
import { ROUTE_PATHS } from '@/routes/configs/route-paths'

export const AUTH_CONTENT_MAP: AuthContentMap = {
  signIn: {
    title: 'Faça login na CodeCraft',
    description: 'Envie mais rápido e concentre-se no crescimento',
    submit: 'Faça login na CodeCraft',
    social: 'Faça login com o Google',
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
    customTitle: 'Verifique seu e-mail',
    description: 'Explore os principais recursos da nossa plataforma.',
    customDescription: 'Um e-mail de verificação foi enviado para o endereço fornecido.',
    submit: 'Inscreva-se na CodeCraft',
    social: 'Inscreva-se com o Google',
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
    customTitle: 'Verifique seu e-mail',
    description: 'Informe seu e-mail abaixo e enviaremos um link para redefinir sua senha.',
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
    description: 'Escolha uma nova senha com no mínimo 8 caracteres.',
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
}
