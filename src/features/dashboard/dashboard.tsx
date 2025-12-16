import { useNavigate } from "react-router-dom"

import { useAuth } from "@/app/providers/auth-provider"
import { Button } from '@/components/ui/button'
import { authService } from "@/features/auth/services/auth.service"

export const DashboardPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      navigate("/login")
    } catch (error) {
      console.error("Failed to sign out:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Button onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-bold">Welcome!</h2>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              You are successfully signed in.
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">User ID:</span> {user?.id}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
