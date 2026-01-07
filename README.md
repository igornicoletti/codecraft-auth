# CodeCraft Auth

A modern, production-ready authentication web application built with **Vite + React + TypeScript + Supabase**, following global industry conventions for folder structure, tooling, testing, and scalability.

## 🚀 Tech Stack

- **Build Tool:** Vite 7
- **Framework:** React 19 + TypeScript 5.9
- **Routing:** React Router v7 (createBrowserRouter)
- **Auth & Backend:** Supabase (Email/Password + Google OAuth)
- **Forms:** React Hook Form
- **Validation:** Zod v4
- **UI:** shadcn/ui + Radix UI (20+ components)
- **Styling:** Tailwind CSS v4 with @tailwindcss/vite
- **Icons:** Lucide React + Phosphor Icons
- **Theme:** next-themes (dark mode support)
- **Notifications:** Sonner
- **Animations:** Motion
- **Testing:** Vitest + Testing Library + jsdom
- **Linting:** ESLint v9 with TypeScript
- **Package Manager:** pnpm

## 📁 Project Structure

```
src/
├── modules/
│   ├── authentication/      # Authentication module
│   │   ├── components/      # Auth-specific components (forms, inputs, social login)
│   │   ├── configs/         # Content maps and error maps
│   │   ├── contexts/        # Auth context provider
│   │   ├── hooks/           # Auth custom hooks (useAuthSubmit)
│   │   ├── layouts/         # Auth layout wrapper
│   │   ├── pages/           # Auth pages
│   │   │   ├── auth-sign-in.page.tsx
│   │   │   ├── auth-sign-up.page.tsx
│   │   │   ├── auth-forgot-password.page.tsx
│   │   │   └── auth-update-password.page.tsx
│   │   ├── schemas/         # Zod validation schemas
│   │   └── services/        # Auth service (sign in/up, OAuth, reset)
│   │
│   └── application/         # Application module
│       ├── components/      # App components (header, sidebar, breadcrumb)
│       ├── layouts/         # App layout wrapper
│       ├── pages/           # App pages (dashboard)
│       └── types/           # App-specific types
│
├── routes/
│   ├── configs/             # Route paths and route definitions
│   ├── core/                # Route builder, guards, wrappers, error boundary
│   ├── hooks/               # Route-specific hooks
│   ├── types/               # Route types
│   └── index.tsx            # Router configuration
│
├── components/
│   └── ui/                  # shadcn/ui components (20+ components)
│       ├── button.tsx, input.tsx, card.tsx, etc.
│       ├── sidebar.tsx, breadcrumb.tsx, avatar.tsx
│       └── loader.tsx, spinner.tsx, skeleton.tsx
│
├── contexts/                # Global contexts (theme)
├── hooks/                   # Global custom hooks (media query, mobile)
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   └── utils.ts             # Utility functions (cn, etc.)
│
├── assets/                  # Static assets (fonts)
├── tests/                   # Test setup and utilities
├── App.tsx                  # Root app component
└── main.tsx                 # Application entry point
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

3. Configure environment variables:
   - Open the `.env` file in the project root
   - Update with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Project Settings** > **API**
3. Copy the **Project URL** and **anon public** key
4. Paste them into your `.env` file
5. **(Optional)** Enable Google OAuth:
   - Go to **Authentication** > **Providers**
   - Enable **Google**
   - Set up OAuth credentials from Google Cloud Console
   - Add redirect URI: `https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`

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
- ✅ Email/Password Sign Up with full name
- ✅ Email/Password Sign In
- ✅ Google OAuth Sign In
- ✅ Password Reset Flow
- ✅ Password Update
- ✅ Email Verification
- ✅ Protected Routes with Guards
- ✅ Session Management & Persistence
- ✅ Auto-redirect based on auth state
- ✅ Auth context with hooks

### UI/UX
- ✅ Dark mode support with next-themes
- ✅ Modern sidebar layout with collapsible navigation
- ✅ Breadcrumb navigation
- ✅ User profile dropdown in sidebar
- ✅ Accessible forms with proper labels and ARIA attributes
- ✅ Form validation with Zod v4
- ✅ Loading states and spinners
- ✅ Toast notifications with Sonner
- ✅ Error handling and boundaries
- ✅ Responsive design for all screen sizes
- ✅ Smooth animations with Motion
- ✅ 20+ shadcn/ui components

### Developer Experience
- ✅ TypeScript strict mode
- ✅ Path aliases (`@/`)
- ✅ Module-based folder structure (domain-driven)
- ✅ Colocated validation schemas
- ✅ Centralized route configuration
- ✅ Testing setup with Vitest + jsdom
- ✅ ESLint v9 with TypeScript and React hooks
- ✅ Hot Module Replacement
- ✅ Code splitting with lazy loading
- ✅ Custom hooks for common patterns

## 🗺️ Routes

### Public Routes
- `/auth/sign-in` - Sign in page (email/password + Google)
- `/auth/sign-up` - Sign up page with confirmation
- `/auth/forgot-password` - Password reset request page
- `/auth/update-password` - Password update page (after reset)

### Protected Routes
- `/` - Redirects to dashboard
- `/app/dashboard` - User dashboard with sidebar (requires authentication)

### Error Routes
- `*` - 404 Not Found page

## 🔐 Auth Flow

### Email/Password Flow
1. **Sign Up**: User creates account with email, password, and optional full name
2. **Email Verification**: Supabase sends confirmation email (can be disabled for dev)
3. **Sign In**: User signs in with verified credentials
4. **Session Management**: Auth state is persisted and synced across tabs
5. **Protected Access**: Dashboard and app routes require authentication

### Google OAuth Flow
1. **OAuth Initiation**: User clicks "Sign in with Google"
2. **Google Authentication**: User authenticates with Google
3. **Redirect**: User is redirected back to app with session
4. **Auto Sign-In**: User is automatically signed in and redirected to dashboard

### Password Reset Flow
1. **Request Reset**: User enters email on forgot password page
2. **Reset Email**: Supabase sends password reset link
3. **Update Password**: User clicks link and enters new password
4. **Confirmation**: Password is updated and user can sign in

## 📝 Code Conventions

- **Strict TypeScript**: All code is type-safe with strict mode enabled
- **Module-based Organization**: Code organized by domain/feature (authentication, application)
- **Naming Convention**: Pages use `.page.tsx` suffix, layouts use `.layout.tsx`
- **Schemas**: Validation schemas are colocated with features
- **No Prop Drilling**: Context and custom hooks for state management
- **Service Layer**: API calls abstracted into service modules
- **Route Configuration**: Centralized in `routes/configs/`
- **Component Variants**: Using `class-variance-authority` for component variants
- **Accessibility First**: All components follow WCAG guidelines with proper ARIA labels

## 🚧 Extending the App

### Adding a New Module

1. Create a new directory in `src/modules/`
2. Structure it with: `components/`, `pages/`, `services/`, `schemas/`, `hooks/`, `types/`
3. Add route configurations in `src/routes/configs/route-definitions.ts`
4. Register routes and guards as needed

### Adding a New Auth Provider

1. Update `modules/authentication/services/auth.service.ts` with the new provider method
2. Add UI button in `modules/authentication/components/auth-social-login.tsx`
3. Configure the provider in Supabase dashboard
4. Test the authentication flow

### Adding a New Protected Page

1. Create the page in appropriate module (e.g., `modules/application/pages/`)
2. Add route definition in `routes/configs/route-definitions.ts`
3. Set `requiresAuth: true` in the route config
4. Add navigation link in sidebar or breadcrumb

### Adding UI Components

Use shadcn/ui CLI to add more components:
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add table
```

Available components: avatar, breadcrumb, button, card, collapsible, drawer, dropdown-menu, field, form, input, input-group, item, label, loader, separator, sheet, sidebar, skeleton, sonner, spinner, textarea, tooltip

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
