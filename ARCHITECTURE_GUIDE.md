# 🏗️ Authentication System Architecture

## Component Hierarchy Diagram

```
AuthPage (/app/auth/page.tsx)
│
├─ AuthLayout (split-screen container)
│  ├─ Background: Animated gradient blobs
│  ├─ Grid texture overlay
│  └─ Two-column flex layout
│     │
│     ├─ LEFT: Desktop only
│     │  └─ AuthVisualSection
│     │     ├─ Logo + branding
│     │     ├─ Main heading (gradient text)
│     │     ├─ Subheading
│     │     ├─ 4 Feature cards (animate on hover)
│     │     │  ├─ Brain icon + AI-Powered
│     │     │  ├─ Target icon + Targeted
│     │     │  ├─ Zap icon + Instant
│     │     │  └─ Book icon + Complete
│     │     └─ Social proof section
│     │
│     └─ RIGHT: All screen sizes
│        └─ AuthCard
│           ├─ Step indicator (progress bar)
│           ├─ Title + Description
│           ├─ Content (dynamic)
│           │  ├─ If step 1:
│           │  │  └─ GoogleButton (OAuth)
│           │  │     └─ Divider
│           │  │
│           │  └─ If step 2:
│           │     └─ OnboardingForm
│           │        ├─ Full Name Input
│           │        ├─ Subjects Multi-Select
│           │        │  ├─ CS button
│           │        │  ├─ Math button
│           │        │  ├─ Physics button
│           │        │  ├─ Chemistry button
│           │        │  └─ Biology button
│           │        ├─ Exam Board Dropdown
│           │        ├─ Study Goal Dropdown
│           │        ├─ Academic Level Toggle
│           │        │  ├─ AS Level
│           │        │  └─ A2 Level
│           │        ├─ Target Grade Grid
│           │        │  ├─ A*
│           │        │  ├─ A
│           │        │  ├─ B
│           │        │  └─ C
│           │        └─ Submit Button
│           │
│           └─ Security badge (bottom)
│              └─ "Your data is encrypted"
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │   /auth (unified page)        │
            │  - Premium UI                 │
            │  - GoogleButton               │
            │  - OnboardingForm             │
            └───────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
        [Google OAuth]          [Continue Logged In]
            │                           │
            ▼                           │
    ┌──────────────────┐                │
    │ Google Auth Flow │                │
    │ - Account select │                │
    │ - Login/MFA      │                │
    └──────────────────┘                │
            │                           │
            ▼                           ▼
        /auth/callback ─────────► Session Active
            │                        │
            ├─ Exchange code         └──► OnboardingForm Step 2
            │   for session          │    ├─ Full Name
            ├─ Set auth cookie       │    ├─ Subjects
            │                        │    ├─ Exam Board
            └─ Redirect to /auth     │    ├─ Study Goal
                                     │    ├─ Level
                                     │    └─ Grade
                                     ▼
                            /api/auth/onboarding
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
            [Validate]      [Save to DB]     [Error Handling]
                │                  │                │
                ├─Check auth       ├─Insert/Update │
                ├─Check fields      │user_profiles  │
                └─Check RLS         │table          │
                                    │               │
                                    └───────┬───────┘
                                            ▼
                                    Return 200/Error
                                            │
                                            ▼
                                    Redirect to /dashboard
```

## State Management

```
AuthPage Component State:
├─ session (useAuth)
│  └─ null | { user, ... }
├─ loading (useAuth)
│  └─ true | false
├─ isSubmitting
│  └─ true | false
└─ error
   └─ "" | error message

OnboardingForm Component State:
├─ formData
│  ├─ fullName: string
│  ├─ subjects: string[]
│  ├─ examBoard: string
│  ├─ studyGoal: string
│  ├─ academicLevel: string
│  └─ targetGrade: string
├─ currentStep
│  └─ "google" | "details"
└─ googleLoading
   └─ true | false
```

## API Routes

```
POST /api/auth/onboarding
├─ Authentication: Required (useAuth from cookies)
├─ Body:
│  ├─ fullName: string (required)
│  ├─ subjects: string[] (required)
│  ├─ examBoard: string (required)
│  ├─ studyGoal: string (required)
│  ├─ academicLevel: string (required)
│  └─ targetGrade: string (required)
│
├─ Validation:
│  ├─ User authenticated?
│  ├─ All fields present?
│  └─ Valid field values?
│
├─ Database Operation:
│  └─ INSERT/UPDATE user_profiles
│
└─ Response:
   ├─ 200: { success: true }
   ├─ 400: { error: "Missing fields" }
   ├─ 401: { error: "Unauthorized" }
   └─ 500: { error: "Database error" }
```

## Authentication Context (useAuth)

```
AuthProvider
│
├─ createBrowserSupabaseClient()
│  └─ Initialize Supabase client
│
├─ useEffect: Load initial session
│  └─ Get session from Supabase auth
│
├─ useEffect: Listen for auth changes
│  ├─ Subscribe to auth state changes
│  └─ Update session on changes
│
└─ Provide context:
   ├─ supabase: SupabaseClient
   ├─ session: Session | null
   ├─ user: User | null
   ├─ loading: boolean
   ├─ signOut: () => Promise<void>
   └─ signInWithGoogle: () => Promise<void>
```

## Middleware Flow

```
Incoming Request
│
├─ Check path
│  ├─ Public files? → Allow
│  ├─ _next files? → Allow
│  └─ API routes? → Allow
│
├─ Get session
│  └─ Exchange cookies for session
│
├─ Check route
│  │
│  ├─ /auth?
│  │  ├─ Session exists? → Redirect /dashboard
│  │  └─ No session? → Allow
│  │
│  └─ /dashboard?
│     ├─ Session exists? → Allow
│     └─ No session? → Redirect /auth
│
└─ Pass through
```

## Database Schema

```sql
user_profiles
├─ id (UUID, PK, FK auth.users.id)
├─ full_name (TEXT, NOT NULL)
├─ subjects (TEXT[], NOT NULL)
├─ exam_board (TEXT, NOT NULL)
├─ study_goal (TEXT, NOT NULL)
├─ academic_level (TEXT, NOT NULL)
├─ target_grade (TEXT, NOT NULL)
├─ created_at (TIMESTAMP, DEFAULT NOW())
└─ updated_at (TIMESTAMP, DEFAULT NOW())

Indexes:
└─ idx_user_profiles_id (id)

RLS Policies:
├─ SELECT: auth.uid() = id
├─ INSERT: auth.uid() = id
└─ UPDATE: auth.uid() = id
```

## CSS Cascade

```
globals.css
├─ @import "tailwindcss"
├─ CSS Variables (:root)
│  ├─ Colors (HSL)
│  ├─ Radius
│  └─ Spacing
├─ Dark mode overrides
├─ Layer base
│  ├─ Reset styles
│  ├─ Typography
│  └─ Scrollbar
├─ Layer utilities
│  ├─ .glass (glassmorphism)
│  ├─ .gradient-text
│  ├─ .glow-effect
│  ├─ .smooth-hover
│  └─ .focus-premium
└─ @theme (Tailwind config)

Component styles
├─ Inline Tailwind classes
├─ Framer Motion animations
└─ Dynamic className logic
```

## Animation System

```
Entrance Animations:
├─ Page load (AuthLayout)
│  └─ 0.6s ease-out stagger
└─ Form fields (OnboardingForm)
   └─ 0.1s offset stagger

Continuous Animations:
├─ Blob 1 (AuthLayout)
│  └─ X/Y movement 15-20s loop
├─ Blob 2 (AuthLayout)
│  └─ X/Y movement 20-25s loop
└─ Blob 3 (AuthLayout)
   └─ Scale + opacity 15s loop

Interaction Animations:
├─ Hover effects (0.2-0.3s)
│  ├─ Scale transforms
│  └─ Color transitions
├─ Focus rings
│  └─ Ring + glow
└─ Loading states
   └─ 1s spinning rotation

Selection Animations:
├─ Checkbox spring (0.3s)
│  └─ Scale: 0 → 1
└─ Button press (0.1s)
   └─ Scale: 1 → 0.98 → 1
```

## Responsive Breakpoints

```
Mobile (< 640px)
├─ Single column layout
├─ AuthVisualSection: hidden
├─ AuthCard: full width
├─ Form fields: full width
├─ Touch-friendly buttons (48px min)
└─ Blob background (mobile-only)

Tablet (640px - 1024px)
├─ Adjusted padding
├─ Larger form fields
├─ AuthVisualSection: still hidden
└─ Better spacing

Desktop (> 1024px)
├─ Split-screen layout
├─ AuthVisualSection: visible left side
├─ AuthCard: right side (max-width)
├─ Full animation suite
└─ Optimal spacing
```

## Error Handling

```
Frontend Errors:
├─ useAuth hook
│  └─ Throws if not in provider
├─ OAuth errors
│  └─ Caught and displayed
├─ Form validation errors
│  └─ Inline field errors
└─ API errors
   └─ Error message display

Backend Errors:
├─ 400: Missing/invalid fields
├─ 401: Not authenticated
├─ 500: Database errors
└─ Logging to console

Recovery:
├─ User sees error message
├─ Retry button available
└─ Form state preserved
```

---

## Quick File Reference

| File | Purpose | Key Exports |
|------|---------|------------|
| auth-layout.tsx | Split-screen layout | AuthLayout |
| auth-card.tsx | Glassmorphic card | AuthCard |
| auth-visual-section.tsx | Left visual section | AuthVisualSection |
| google-button.tsx | OAuth button | GoogleButton |
| onboarding-form.tsx | Form logic | OnboardingForm |
| page.tsx | Main auth page | default (page) |
| callback/route.ts | OAuth handler | GET handler |
| lib/auth.tsx | Auth context | useAuth, AuthProvider |
| middleware.ts | Route protection | middleware config |

---

This architecture provides:
✅ Clear component hierarchy
✅ Predictable data flow
✅ Secure authentication
✅ Smooth animations
✅ Responsive design
✅ Error handling
✅ Performance optimization
