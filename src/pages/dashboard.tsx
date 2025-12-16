import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/auth-provider";
import { authService } from "@/features/auth/services/auth.service";

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Sign out
          </button>
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
  );
}
