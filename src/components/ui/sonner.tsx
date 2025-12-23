import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

/*
"--normal-bg": "#000",
"--normal-bg-hover": "hsl(0, 0%, 12%)",
"--normal-border": "hsl(0, 0%, 20%)",
"--normal-border-hover": "hsl(0, 0%, 25%)",
"--normal-text": "var(--gray1)",
"--success-bg": "hsl(150, 100%, 6%)",
"--success-border": "hsl(147, 100%, 12%)",
"--success-text": "hsl(150, 86%, 65%)",
"--info-bg": "hsl(215, 100%, 6%)",
"--info-border": "hsl(223, 43%, 17%)",
"--info-text": "hsl(216, 87%, 65%)",
"--warning-bg": "hsl(64, 100%, 6%)",
"--warning-border": "hsl(60, 100%, 9%)",
"--warning-text": "hsl(46, 87%, 65%)",
"--error-bg": "hsl(358, 76%, 10%)",
"--error-border": "hsl(357, 89%, 16%)",
"--error-text": "hsl(358, 100%, 81%)",
*/
