import type { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}

export const AuthCard = ({ title, description, children, footer }: AuthCardProps) => (
  <div className='min-h-screen flex items-center justify-center px-4 py-8'>
    <Card className='relative max-w-md w-full bg-linear-to-t from-muted/50 to-card overflow-hidden'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  </div>
)
