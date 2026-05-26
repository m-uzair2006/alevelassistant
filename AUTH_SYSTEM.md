# Premium Authentication System

## Overview

The A Level Study Platform now features a completely redesigned, modern authentication system powered by Google OAuth. The experience is optimized for premium SaaS platforms and communicates the platform's cutting-edge nature immediately.

## Key Features

### 🎯 Unified Authentication
- **Google OAuth Only**: Frictionless sign-in via Google accounts
- **No Email/Password**: Removed traditional authentication complexity
- **Single Unified Page**: All auth and onboarding flows on one premium page
- **Force Account Selection**: Always prompt users to select their Google account

### 💎 Premium Design
- **Glassmorphism**: Modern frosted glass effects on cards and backgrounds
- **Animated Gradients**: Smooth, subtle gradient blob animations
- **Split Screen Layout**: Beautiful left visual section, authentication card on right (desktop)
- **Mobile Optimized**: Fully responsive with optimized mobile experience
- **Dark Mode Primary**: Sleek, premium dark theme with blue/purple/cyan accents

### 🧩 Onboarding Flow
After Google authentication, students complete a lightweight profile setup:

1. **Full Name** - Pre-filled from Google account
2. **Preferred Subjects** - Multi-select (Computer Science, Mathematics, Physics, Chemistry, Biology)
3. **Exam Board** - Select (Cambridge, Edexcel, AQA)
4. **Study Goal** - Choose (Improve grades, Get A*, Understand concepts, Practice papers)
5. **Academic Level** - Select (AS Level, A2 Level)
6. **Target Grade** - Choose (A*, A, B, C)

All fields are cleanly designed with smooth interactions and proper validation.

## Architecture

### File Structure
```
app/auth/
├── page.tsx                 # Main unified auth page
├── layout.tsx              # Auth layout wrapper
├── callback/
│   └── route.ts            # Google OAuth callback handler

components/auth/
├── auth-layout.tsx         # Split screen layout with animations
├── auth-card.tsx           # Glassmorphic card component
├── auth-visual-section.tsx # Left side visual section
├── google-button.tsx       # Premium Google sign-in button
├── onboarding-form.tsx     # Multi-step onboarding form
└── index.ts               # Component exports

lib/
├── auth.tsx               # Auth context with Google OAuth support
└── supabase/
    └── client.ts          # Supabase client configuration
```

### Component Hierarchy
```
AuthLayout
├── AuthVisualSection (left, desktop only)
└── AuthCard
    └── OnboardingForm
        ├── GoogleButton (step 1)
        └── Form Fields (step 2: name, subjects, exam board, etc.)
```

## Setup Instructions

### 1. Google OAuth Configuration

#### In Google Cloud Console:
1. Create a new project or select existing one
2. Enable Google+ API
3. Create OAuth 2.0 credentials (Web Application)
4. Authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)
5. Copy Client ID and Client Secret

#### In Supabase Dashboard:
1. Navigate to Authentication → Providers
2. Enable Google provider
3. Enter your Google Client ID and Client Secret
4. Allowed redirect URIs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`

### 2. Environment Variables

Update `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Schema

The onboarding data should be stored in a `user_profiles` table:

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  subjects TEXT[] NOT NULL,
  exam_board TEXT NOT NULL,
  study_goal TEXT NOT NULL,
  academic_level TEXT NOT NULL,
  target_grade TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Design Details

### Color Palette
- **Background**: Dark slate (rgb(15, 23, 42))
- **Primary Accent**: Blue (rgb(59, 130, 246))
- **Secondary Accent**: Purple (rgb(147, 51, 234))
- **Tertiary Accent**: Cyan (rgb(34, 211, 238))
- **Text Primary**: Light slate (rgb(241, 245, 249))
- **Text Secondary**: Medium slate (rgb(203, 213, 225))

### Typography
- **Display**: Bold, large, with gradient backgrounds
- **Headings**: Medium weight, 24-32px
- **Body**: Regular weight, 14-16px, high contrast
- **Labels**: Small, semibold, uppercase tracking

### Animations
- **Entrance**: 0.6s ease-out, staggered children
- **Hover**: 0.2-0.3s smooth scale/color transitions
- **Blob backgrounds**: 15-25s continuous subtle movements
- **Loading states**: 1s spinning animation

### Responsive Design
- **Mobile (< 640px)**: Single column, stacked sections
- **Tablet (640px - 1024px)**: Optimized spacing and sizing
- **Desktop (> 1024px)**: Full split-screen layout

## User Flow

```
1. User visits /auth
   ↓
2. Sees unified auth page with Google button
   ↓
3. Clicks "Continue with Google"
   ↓
4. Redirected to Google OAuth
   ↓
5. Returns to /auth/callback
   ↓
6. Callback exchanges code for session
   ↓
7. Redirects back to /auth with active session
   ↓
8. Onboarding form appears
   ↓
9. User fills in preferences
   ↓
10. Form submits and stores to database
   ↓
11. Redirects to /dashboard
```

## Styling & Customization

### Premium CSS Classes
Available in `app/globals.css`:

```css
.glass              /* Glassmorphic effect */
.glass-sm          /* Smaller glassmorphic effect */
.gradient-text     /* Blue-cyan-purple gradient text */
.glow-effect       /* Subtle blue glow shadow */
.smooth-hover      /* 300ms transition on hover */
.focus-premium     /* Premium focus ring styling */
```

### Tailwind Configuration
Dark mode is primary theme with custom gradient and animation utilities.

## API Routes

### POST /api/auth/onboarding
- Stores onboarding form data to user_profiles table
- Validates all required fields
- Returns 200 on success or appropriate error code

## Security Considerations

1. **OAuth Prompt**: Always uses `prompt: "select_account"` to prevent account confusion
2. **Server-Side Session**: Session exchange happens server-side in callback route
3. **CSRF Protection**: Built into Supabase OAuth flow
4. **HTTPS Only**: Redirect URIs only accept HTTPS in production
5. **Email Verification**: Google OAuth provides verified email
6. **Row-Level Security**: Database access controlled via RLS policies

## Performance Optimizations

1. **Lazy Animation**: Blobs animate with `prefers-reduced-motion` support
2. **Code Splitting**: Auth components loaded separately
3. **Image Optimization**: All images are SVG-based (no large assets)
4. **CSS-in-JS**: Minimal runtime overhead with Tailwind
5. **Font System**: Uses system fonts for fastest loading

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari (iOS): 14+
- Chrome Mobile: Latest version

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation fully supported
- Focus indicators visible and accessible
- Color contrast ratios meet standards
- Semantic HTML throughout
- ARIA labels where needed
- Reduced motion preferences respected

## Testing Checklist

- [ ] Google OAuth sign-in works
- [ ] Callback redirect functions
- [ ] Form validation works correctly
- [ ] Mobile responsive layout
- [ ] Animations smooth and performant
- [ ] Error handling graceful
- [ ] Session persists across page refreshes
- [ ] Logout works properly
- [ ] Redirect to dashboard after onboarding
- [ ] Already authenticated users see dashboard

## Troubleshooting

### "Google OAuth redirect URL mismatch"
- Ensure redirect URI in Google Console matches exactly
- Include protocol (http:// or https://)
- Include port for localhost

### "User not authenticated after callback"
- Check Supabase OAuth provider settings
- Verify environment variables are set
- Check browser console for errors
- Ensure callback route is accessible

### "Form fields not validating"
- Check browser console for validation errors
- Ensure all required fields are filled
- Verify field values are valid

## Future Enhancements

1. **Email Magic Links**: Optional passwordless email auth
2. **GitHub OAuth**: Additional provider
3. **Social Verification**: Link secondary accounts
4. **Two-Factor Auth**: TOTP support
5. **Advanced Onboarding**: A/B test variations
6. **Analytics**: Track conversion funnels

## Support

For issues or questions, refer to:
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
