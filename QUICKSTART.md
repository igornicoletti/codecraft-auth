# Quick Start Guide

Get your authentication app running in 5 minutes!

## Step 1: Install Dependencies

```bash
pnpm install
```

## Step 2: Configure Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click 'New Project'
3. Fill in your project details:
   - **Name**: codecraft-auth (or any name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to you
   - **Plan**: Free tier is perfect for development
4. Wait for the project to finish setting up (~2 minutes)

### Get Your API Keys

1. Once the project is ready, go to **Project Settings** (gear icon)
2. Click **API** in the sidebar
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (looks like: `eyJhbGc...`)

### Configure Environment Variables

1. Open the `.env` file in the project root
2. Add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Enable Google OAuth (Optional)

To enable Google sign-in:

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Find **Google** and toggle it on
3. Follow the instructions to set up OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback`
4. Paste your Google Client ID and Client Secret in Supabase
5. Save the configuration

## Step 3: Run the App

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## Step 4: Test the App

### Create Your First User

**Option 1: Email/Password**
1. On the sign-in page, click 'Criar uma conta' (Create account)
2. Enter your email and password (minimum 8 characters)
3. Confirm your password
4. Click 'Criar conta'
5. Check your email for the confirmation link
6. Click the link to verify your account

**Option 2: Google OAuth** (if configured)
1. Click 'Continuar com o Google'
2. Sign in with your Google account
3. Grant permissions
4. You'll be redirected to the dashboard automatically

### Sign In

1. Go to the sign-in page (http://localhost:5173/auth/sign-in)
2. Enter your email and password OR click 'Continuar com o Google'
3. Click 'Entrar' (Sign in)
4. You'll be redirected to the dashboard with a sidebar!

### Explore the Dashboard

- Navigate using the sidebar
- Try the theme toggle (light/dark mode)
- Check out the user profile dropdown
- Test the breadcrumb navigation
- Sign out from the sidebar menu

## Troubleshooting

### Email Confirmation Not Working?

By default, Supabase requires email confirmation. For development, you can disable this:

1. Go to **Authentication** > **Providers** in Supabase dashboard
2. Click **Email** provider
3. Scroll down and toggle off **Confirm email**
4. Save changes

Now you can sign in immediately after registration!

### Google OAuth Not Working?

1. Verify you've added the correct redirect URI in Google Cloud Console
2. Make sure Google provider is enabled in Supabase
3. Check that Client ID and Secret are correctly configured
4. Clear browser cookies and try again

### Environment Variables Not Loading?

1. Make sure the `.env` file is in the project root
2. Restart the dev server after changing `.env`
3. Verify variable names start with `VITE_`

### Build or Runtime Errors?

Make sure you're using:
- Node.js 18 or higher
- pnpm 8 or higher

Check your versions:
```bash
node --version
pnpm --version
```

If you encounter module errors:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Next Steps

### Customize the App
- Modify authentication pages in `src/modules/authentication/pages/`
- Customize the dashboard in `src/modules/application/pages/`
- Add UI components from shadcn/ui: `pnpm dlx shadcn@latest add [component]`
- Customize the sidebar in `src/modules/application/components/`

### Extend Authentication
- Add more auth providers in `src/modules/authentication/services/auth.service.ts`
- Update validation schemas in `src/modules/authentication/schemas/auth.schemas.ts`
- Add user profile management
- Implement role-based access control

### Add New Features
- Create new modules in `src/modules/`
- Add protected routes in `src/routes/configs/route-definitions.ts`
- Build new pages following the module structure
- Write tests in `src/tests/`

### Learn More
- Read the full `README.md` for detailed documentation
- Check `PROJECT_SUMMARY.md` for architecture overview
- Explore the codebase to understand the structure

Happy coding! 🚀
