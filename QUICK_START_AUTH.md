# 🚀 Quick Start - Premium Auth Testing

## Step 1: Database Setup (5 min)

Run this SQL in your Supabase dashboard under "SQL Editor":

```sql
-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  subjects TEXT[] NOT NULL,
  exam_board TEXT NOT NULL,
  study_goal TEXT NOT NULL,
  academic_level TEXT NOT NULL,
  target_grade TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row-Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can create own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create index for performance
CREATE INDEX idx_user_profiles_id ON user_profiles(id);
```

## Step 2: Google OAuth Setup (10 min)

### In Google Cloud Console:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create OAuth 2.0 ID"
5. Choose "Web Application"
6. Add URIs:
   - Authorized Redirect: `http://localhost:3000/auth/callback`
   - JavaScript Origin: `http://localhost:3000`
7. Copy the **Client ID** and **Client Secret**

### In Supabase:
1. Go to Authentication → Providers
2. Find "Google" and click to expand
3. Toggle "Enable"
4. Paste **Client ID** and **Client Secret**
5. Save

## Step 3: Environment Variables (2 min)

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Get these from Supabase Dashboard → Settings → API

## Step 4: Start Development Server (1 min)

```bash
npm run dev
```

## Step 5: Test the Auth Flow (5 min)

1. Open `http://localhost:3000/auth`
2. See the premium auth page with:
   - Beautiful animated gradients
   - Split screen layout (desktop)
   - "Continue with Google" button
   - Left side visual with features

3. Click "Continue with Google"
   - Redirected to Google login
   - Select/create account
   - Back to auth page

4. See onboarding form:
   - Full Name (pre-filled)
   - Preferred Subjects (multi-select)
   - Exam Board (dropdown)
   - Study Goal (dropdown)
   - Academic Level (toggles)
   - Target Grade (buttons)

5. Fill all fields and click "Start Learning"
   - Should save to database
   - Redirect to `/dashboard`

## Troubleshooting

### "Supabase URL/Key missing"
- Create `.env.local` with keys from Supabase dashboard

### "OAuth redirect URL mismatch"
- Check Google Console authorized redirect URIs exactly match
- Include protocol: `http://` or `https://`
- Include port: `:3000`

### "user_profiles table doesn't exist"
- Run the SQL schema above in Supabase SQL Editor
- Verify table appears in Database → Tables

### "Form not submitting"
- Check browser console for errors
- Verify all required fields are filled
- Ensure database table has RLS policies

### "User not staying logged in"
- Check Supabase auth configuration
- Verify browser cookies enabled
- Check console for auth errors

## Files to Review

```
auth-flow/
├── components/auth/
│   ├── auth-layout.tsx          ← Layout with blobs
│   ├── auth-card.tsx            ← Glassmorphic card
│   ├── auth-visual-section.tsx  ← Left side visuals
│   ├── google-button.tsx        ← OAuth button
│   └── onboarding-form.tsx      ← Form logic
│
├── app/auth/
│   ├── page.tsx                 ← Unified auth page
│   └── callback/route.ts        ← OAuth handler
│
└── app/api/auth/
    └── onboarding/route.ts      ← Save profile data
```

## Test Checklist

- [ ] Page loads at `/auth`
- [ ] Split-screen layout visible (desktop)
- [ ] Animations smooth
- [ ] "Continue with Google" button works
- [ ] Redirected to Google login
- [ ] Back to auth after auth
- [ ] Form fields appear
- [ ] Full name pre-filled
- [ ] Subject multi-select works
- [ ] Exam board dropdown works
- [ ] Study goal dropdown works
- [ ] Academic level toggles work
- [ ] Target grade buttons work
- [ ] Form validates empty fields
- [ ] Submit button shows loading
- [ ] Data saves to database
- [ ] Redirected to dashboard
- [ ] Mobile layout responsive
- [ ] Tablet layout works
- [ ] No console errors

## Production Checklist

Before deploying to production:

- [ ] Update Google OAuth redirect URLs to production domain
- [ ] Set production environment variables
- [ ] Verify Supabase RLS policies
- [ ] Enable HTTPS enforcement
- [ ] Test with real Google account
- [ ] Monitor error logs
- [ ] Set up analytics
- [ ] Configure email notifications (if needed)
- [ ] Test on multiple browsers
- [ ] Test on mobile devices

## Performance Tips

- Animations are GPU-accelerated
- No blocking scripts
- Images are SVG (instant load)
- CSS is optimized via Tailwind
- Database queries indexed

## Security Checklist

- ✅ OAuth only (no password storage)
- ✅ Server-side session exchange
- ✅ Row-level security enabled
- ✅ HTTPS enforced in production
- ✅ Email verified via Google
- ✅ CSRF protection built-in
- ✅ Account selection forced

## Need Help?

1. Check [AUTH_SYSTEM.md](./AUTH_SYSTEM.md) for complete docs
2. Check [AUTHENTICATION_REDESIGN.md](./AUTHENTICATION_REDESIGN.md) for setup guide
3. Review component source code (well commented)
4. Check Supabase docs: https://supabase.com/docs/guides/auth
5. Check Next.js docs: https://nextjs.org/docs

## What's Next?

After testing works:

1. **Customize colors/fonts** in components
2. **Add more onboarding fields** as needed
3. **Create profile completion page** with more details
4. **Add email notifications** for new signups
5. **Set up analytics** to track conversions
6. **Build dashboard** to show user data

---

**Ready?** Run `npm run dev` and visit `http://localhost:3000/auth` 🎉
