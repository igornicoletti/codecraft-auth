# Quick Start Guide

Get your authentication app running in 5 minutes!

## Step 1: Install Dependencies

```bash
pnpm install
```

## Step 2: Configure Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/signIn
2. Click 'New Project'
3. Fill in your project details:
   - **Name**: codecraft-auth (or any name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to you
   - **Plan**: Free tier is perfect for development

### Get Your API Keys

1. Once the project is created, go to **Project Settings** (gear icon)
2. Click **API** in the sidebar
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (looks like: `eyJhbGc...`)

### Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Run the App

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## Step 4: Test Authentication

### Create Your First User

1. Click 'create a new account' on the signIn page
2. Enter an email and password (minimum 6 characters)
3. Click 'Create account'
4. Check your email for the confirmation link
5. Click the link to verify your account

### Sign In

1. Go back to the signIn page
2. Enter your email and password
3. Click 'Sign in'
4. You'll be redirected to the dashboard!

## Troubleshooting

### Email Confirmation Not Working?

By default, Supabase requires email confirmation. For development, you can disable this:

1. Go to **Authentication** > **Providers** in Supabase dashboard
2. Click **Email** provider
3. Toggle off 'Confirm email'
4. Save changes

Now you can sign in immediately after registration!

### Build Errors?

Make sure you're using:
- Node.js 18 or higher
- pnpm 8 or higher

Check your versions:
```bash
node --version
pnpm --version
```

## Next Steps

- Customize the UI in `src/features/auth/pages/`
- Add more routes in `src/app/router/index.tsx`
- Extend auth service in `src/features/auth/services/auth.service.ts`
- Add new pages in `src/pages/`

Happy coding! 🚀
