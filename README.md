# CodeCraft Auth

A modern, production-ready authentication web application built with **Vite + React + TypeScript + Supabase**, following global industry conventions for folder structure, tooling, testing, and scalability.

## 🚀 Tech Stack

- **Build Tool:** Vite
- **Framework:** React 19 + TypeScript
- **Routing:** React Router (createBrowserRouter)
- **Auth & Backend:** Supabase
- **Forms:** React Hook Form
- **Validation:** Zod
- **UI:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest + Testing Library
- **Package Manager:** pnpm

## 📁 Project Structure

```
src/
├── app/
│   ├── providers/           # Context providers (Auth, Theme)
│   │   ├── auth-provider.tsx
│   │   └── theme-provider.tsx
│   ├── router/              # Routing configuration
│   │   ├── index.tsx
│   │   └── protected-route.tsx
│   └── layouts/             # Layout components
│
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── shared/              # Shared components
│
├── features/
│   └── auth/                # Authentication feature
│       ├── components/
│       ├── hooks/
│       ├── schemas/         # Zod validation schemas
│       ├── services/        # API services
│       └── pages/           # Auth pages
│           ├── login.tsx
│           ├── register.tsx
│           └── forgot-password.tsx
│
├── hooks/                   # Global custom hooks
├── lib/
│   ├── supabase/
│   │   └── client.ts        # Supabase client configuration
│   ├── env.ts               # Environment variables
│   └── utils.ts             # Utility functions
│
├── pages/                   # Application pages
│   ├── dashboard.tsx
│   └── not-found.tsx
│
└── tests/                   # Test setup and utilities
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- A Supabase account

### Installation

1. Clone the repository:
```bash
cd codecraft-auth
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy the **Project URL** and **anon public** key
4. Paste them into your `.env` file

The authentication is handled automatically by Supabase Auth. No additional table setup is required for basic email/password authentication.

### Development

Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
pnpm build
```

Preview the production build:
```bash
pnpm preview
```

## 🧪 Testing

Run tests:
```bash
pnpm test
```

Run tests with UI:
```bash
pnpm test:ui
```

## 🎨 Features

### Authentication
- ✅ Email/Password Sign Up
- ✅ Email/Password Sign In
- ✅ Password Reset
- ✅ Protected Routes
- ✅ Session Management
- ✅ Auto-redirect on auth state change

### UI/UX
- ✅ Dark mode support
- ✅ Accessible forms with proper labels and ARIA attributes
- ✅ Form validation with Zod
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design

### Developer Experience
- ✅ TypeScript strict mode
- ✅ Path aliases (`@/`)
- ✅ Feature-based folder structure
- ✅ Colocated validation schemas
- ✅ Testing setup with Vitest
- ✅ ESLint configuration

## 🗺️ Routes

### Public Routes
- `/login` - Sign in page
- `/register` - Sign up page
- `/forgot-password` - Password reset page

### Protected Routes
- `/dashboard` - User dashboard (requires authentication)

## 🔐 Authentication Flow

1. **Sign Up**: User creates an account with email and password
2. **Email Verification**: Supabase sends a confirmation email
3. **Sign In**: User signs in with verified credentials
4. **Session Management**: Auth state is persisted and synced across tabs
5. **Protected Access**: Dashboard is only accessible to authenticated users

## 📝 Code Conventions

- **Strict TypeScript**: All code is type-safe
- **Feature-based Organization**: Code is organized by feature, not file type
- **Schemas**: Validation schemas are colocated with features
- **No Prop Drilling**: Context and hooks are used for state management
- **Accessibility First**: All components follow WCAG guidelines

## 🚧 Extending the App

### Adding a New Auth Method

1. Update `auth.service.ts` with the new method
2. Create a schema in `auth.schema.ts`
3. Create a page in `features/auth/pages/`
4. Add the route in `app/router/index.tsx`

### Adding a New Protected Page

1. Create the page in `src/pages/`
2. Wrap it with `<ProtectedRoute>` in the router
3. Add navigation links as needed

### Adding UI Components

Use shadcn/ui CLI:
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add form
```

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 📄 License

MIT
