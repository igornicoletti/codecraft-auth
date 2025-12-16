import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/login";
import { RegisterPage } from "@/features/auth/pages/register";
import { ForgotPasswordPage } from "@/features/auth/pages/forgot-password";
import { DashboardPage } from "@/pages/dashboard";
import { NotFoundPage } from "@/pages/not-found";
import { ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
