import { LayoutDashboard, LogOut, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/providers/auth-provider'
import { authService } from '@/services/auth.service'

export const DashboardPage = () => {
  const { user } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()

  const userInitials = user?.email?.substring(0, 2).toUpperCase() ?? '??'

  const handleLogout = async () => {
    try {
      await authService.signOut()
      success('Logged out successfully')
      navigate('/login')
    } catch (err) {
      error('Failed to logout')
    }
  }

  return (
    <div className='min-h-svh bg-muted/30'>
      {/* NAVBAR */}
      <nav className='sticky top-0 z-50 w-full border-b backdrop-blur-sm'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
          <div className='flex items-center gap-2 font-bold text-xl tracking-tight'>
            <LayoutDashboard className='h-6 w-6 text-primary' />
            <span>CodeCraft</span>
          </div>

          <div className='flex items-center gap-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
                  <Avatar className='h-10 w-10 border transition-hover hover:opacity-80'>
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
                    <AvatarFallback className='bg-primary/10 text-primary font-medium'>
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>My Account</p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>
                  <Settings className='mr-2 h-4 w-4' />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive'
                  onClick={handleLogout}
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className='container mx-auto p-4 md:p-8'>
        <div className='grid gap-6 md:grid-cols-2'>
          {/* Welcome Card */}
          <Card className='col-span-full'>
            <CardHeader>
              <CardTitle className='text-2xl'>Welcome back!</CardTitle>
              <CardDescription>
                You are logged in as <span className='font-medium text-foreground'>{user?.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-center text-sm text-muted-foreground'>
                Your account was created on {new Date(user?.created_at ?? '').toLocaleDateString()}.
                This is your central hub for managing your projects and security settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Account Security</CardTitle>
              <Settings className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>Strong</div>
              <p className='text-xs text-muted-foreground'>MFA is currently disabled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Last Login</CardTitle>
              <User className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>Today</div>
              <p className='text-xs text-muted-foreground'>from {window.location.hostname}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
