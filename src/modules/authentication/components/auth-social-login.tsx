import { GoogleLogoIcon } from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export interface AuthSocialLoginProps {
  text: string
  separatorText?: string
  isPending?: boolean
  onGoogleClick?: () => Promise<void>
}

export const AuthSocialLogin = ({
  text,
  separatorText = 'ou',
  isPending = false,
  onGoogleClick,
}: AuthSocialLoginProps) => {
  return (
    <div className="w-full space-y-6">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={isPending}
        onClick={onGoogleClick}
      >
        <GoogleLogoIcon />
        {text}
      </Button>

      <div className="relative flex items-center justify-center">
        <Separator className="flex-1" />
        <span className="absolute px-2 text-sm text-muted-foreground">
          {separatorText}
        </span>
      </div>
    </div>
  )
}
