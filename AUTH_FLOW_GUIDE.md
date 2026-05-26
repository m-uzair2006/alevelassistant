# Updated Auth Flow - Complete Profile System

## New User Journey

### Step 1: Landing Page
```
GET http://localhost:3000/auth
├─ Shows beautiful premium auth page
├─ Split screen layout (desktop)
└─ Step indicator: 1/2
```

### Step 2: Google Authentication  
```
User clicks "Continue with Google"
├─ Card shows: Google sign-in button
├─ Divider: "Then complete your profile"
└─ Step indicator: 1/2
```

### Step 3: Google OAuth Flow
```
User redirected to Google OAuth
├─ Login/MFA with Google account
├─ Grant permissions
└─ Callback to /auth/callback
```

### Step 4: Profile Completion Card
```
GET http://localhost:3000/auth (with active session)
├─ Card title changes: "Complete Your Profile"
├─ Description: "Tell us about your learning preferences"
├─ Step indicator: 2/2
└─ Form fields appear:
   ├─ Full Name (pre-filled from Google)
   ├─ Subjects (multi-select)
   ├─ Exam Board (dropdown)
   ├─ Study Goal (dropdown)
   ├─ Qualification Level (toggle)
   └─ Target Grade (button grid)
```

### Step 5: Submit & Redirect
```
User fills form and clicks "Start Learning"
├─ Submit to /api/auth/onboarding
├─ Save profile to database
└─ Redirect to /dashboard
```

---

## Fields in Profile Completion Card

### 1. Full Name
- **Type**: Text Input
- **Pre-filled**: Yes (from Google)
- **Placeholder**: "Alex Johnson"
- **Required**: Yes

### 2. Subjects
- **Type**: Multi-select buttons
- **Options**:
  - Computer Science
  - Mathematics
  - Physics
  - Chemistry
  - Biology
- **Visual**: Blue highlight + checkmark when selected
- **Required**: At least 1

### 3. Exam Board
- **Type**: Dropdown
- **Options**:
  - Cambridge
  - Edexcel
  - AQA
- **Required**: Yes

### 4. Study Goal
- **Type**: Dropdown
- **Options**:
  - Improve grades
  - Get A*
  - Understand concepts better
  - Practice past papers
- **Required**: Yes

### 5. Qualification Level
- **Type**: Toggle buttons
- **Options**:
  - AS Level
  - A2 Level
- **Visual**: Blue highlight when selected
- **Required**: Yes

### 6. Target Grade
- **Type**: Button grid (4 columns)
- **Options**:
  - A*
  - A
  - B
  - C
- **Visual**: Purple highlight when selected
- **Required**: Yes

---

## Key Changes Made

### ✅ Auth Page (`/app/auth/page.tsx`)
- Removed automatic redirect when session exists
- Card now shows different title/description based on step
- Step indicator shows 1/2 for Google sign-in, 2/2 for profile
- Maintains error handling and loading states

### ✅ Onboarding Form (`/components/auth/onboarding-form.tsx`)
- Form automatically switches to step 2 when session exists
- Google button hidden after sign-in
- Profile form shows with all fields
- Full name auto-filled from Google metadata

### ✅ Field Labels Updated
- "Preferred Subjects" → "Subjects"
- "Current Academic Level" → "Qualification Level"
- Clearer labels matching your requirements

---

## Testing Checklist

### Desktop Testing (http://localhost:3000/auth)
- [ ] Page loads with Google button
- [ ] Beautiful split-screen layout visible
- [ ] Left side shows features (desktop only)
- [ ] Step indicator shows 1/2
- [ ] Card title: "Join the Future of Learning"

### Google Sign-in
- [ ] Click "Continue with Google"
- [ ] Redirected to Google OAuth
- [ ] Select/login with Google account
- [ ] Redirected back to /auth

### Profile Completion Card
- [ ] Google button card disappears
- [ ] New card appears with title: "Complete Your Profile"
- [ ] Step indicator changes to 2/2
- [ ] Full name field pre-filled from Google
- [ ] All form fields visible

### Form Functionality
- [ ] Full Name editable
- [ ] Subjects multi-select works (click shows checkmark)
- [ ] Exam Board dropdown works
- [ ] Study Goal dropdown works
- [ ] Qualification Level toggle works (AS/A2)
- [ ] Target Grade buttons work (A*/A/B/C)

### Form Submission
- [ ] Can't submit without full name
- [ ] Can't submit without selecting subjects
- [ ] Can't submit without exam board
- [ ] Can't submit without study goal
- [ ] Can't submit without qualification level
- [ ] Can't submit without target grade
- [ ] Submit button shows "Setting up your account..."
- [ ] Redirects to /dashboard after submission

### Mobile Testing (http://localhost:3000/auth on mobile)
- [ ] Single column layout (no split)
- [ ] Auth card full width
- [ ] Form fields stack vertically
- [ ] All buttons touch-friendly
- [ ] No horizontal scroll

### Error Handling
- [ ] API errors display message
- [ ] Network errors handled
- [ ] Validation errors shown inline

---

## API Endpoint

### POST /api/auth/onboarding

**Headers:**
```
Content-Type: application/json
Authorization: (From Supabase session cookie)
```

**Request Body:**
```json
{
  "fullName": "Alex Johnson",
  "subjects": ["Computer Science", "Mathematics"],
  "examBoard": "Edexcel",
  "studyGoal": "Get A*",
  "academicLevel": "A2 Level",
  "targetGrade": "A*"
}
```

**Success Response (200):**
```json
{ "success": true }
```

**Error Responses:**
```json
// 400 - Missing fields
{ "error": "Missing required fields" }

// 401 - Not authenticated
{ "error": "Unauthorized" }

// 500 - Database error
{ "error": "Failed to save profile" }
```

---

## User Experience Flow

```
Unauthenticated User
        │
        ▼
    /auth page
        │
        ├─ See premium UI
        ├─ See Google button
        └─ Step 1/2
        │
        ▼
    Click Google button
        │
        ├─ Redirect to Google
        ├─ Login/MFA
        └─ Back to /auth
        │
        ▼
    Google Button Card Hidden ✗
    Profile Form Card Shown ✓
        │
        ├─ Full Name (pre-filled)
        ├─ Subjects
        ├─ Exam Board
        ├─ Study Goal
        ├─ Qualification Level
        ├─ Target Grade
        └─ Step 2/2
        │
        ▼
    Fill form + Submit
        │
        ├─ Validate
        ├─ Save to database
        └─ Show loading
        │
        ▼
    Redirect to /dashboard
        │
        ▼
    User logged in & onboarded ✓
```

---

## File Structure

```
components/auth/
├── auth-layout.tsx           ✓ Container with animations
├── auth-card.tsx             ✓ Card with step indicator
├── auth-visual-section.tsx   ✓ Left side showcase
├── google-button.tsx         ✓ OAuth button
├── onboarding-form.tsx       ✓ Two-step form logic
└── index.ts                  ✓ Exports

app/auth/
├── page.tsx                  ✓ UPDATED - Manages card state
├── layout.tsx                ✓ Auth layout
└── callback/
    └── route.ts              ✓ OAuth handler

app/api/auth/
└── onboarding/
    └── route.ts              ✓ Save profile
```

---

## What Happens After Sign-in

### The Sign-in Card
- **Before Google Auth**: Shows "Continue with Google" button
- **After Google Auth**: Card is completely hidden/replaced
- **Form Card**: Appears with "Complete Your Profile" message
- **Step Indicator**: Progresses from 1/2 to 2/2

### The Profile Form
- **Auto-fills**: Full name from Google
- **Shows**: All required fields
- **Validates**: All fields before submit
- **Submits to**: /api/auth/onboarding
- **Redirects**: To /dashboard on success

### Database
- **Table**: `user_profiles`
- **Trigger**: Saves when user completes onboarding
- **Security**: Row-level security enforced
- **Access**: Only user can see own profile

---

## Next Steps

1. **Test Google OAuth**
   - Ensure Google credentials configured
   - Try signing in
   - Check if redirected to profile form

2. **Test Profile Form**
   - Fill all fields
   - Verify form validation
   - Check database insert

3. **Test Dashboard**
   - Verify redirect after onboarding
   - Check user data displays
   - Verify can't access /auth if authenticated

4. **Mobile Testing**
   - Test on phone/tablet
   - Verify responsive layout
   - Test touch interactions

5. **Error Handling**
   - Test without network
   - Try incomplete form
   - Check error messages

---

## Troubleshooting

### Profile Form Not Appearing
- Check browser console for errors
- Verify Supabase session cookie exists
- Check that session is recognized by useAuth hook
- Try clearing browser cache

### Form Not Submitting
- Check all fields are filled (all required)
- Check browser console for API errors
- Verify /api/auth/onboarding endpoint
- Check database table exists

### Not Redirecting to Dashboard
- Check if form submission succeeded
- Check browser console for errors
- Verify /dashboard is accessible
- Check middleware routing

### Full Name Not Pre-filled
- Check Google account has full name set
- Check user_metadata is populated
- Try different Google account

---

✨ **The updated auth flow is ready for testing!**

Start at: `http://localhost:3000/auth`
