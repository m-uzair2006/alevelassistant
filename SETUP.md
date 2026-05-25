# A Level Study Platform - Setup Guide

## Quick Start

### 1. Environment Setup

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (keep secret!)
- `OPENAI_API_KEY` - Your OpenAI API key

### 2. Database Setup

1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor in your Supabase dashboard
3. Copy the contents of `lib/supabase/schema.sql`
4. Run the SQL to create all tables and policies

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Project Structure

```
app/
  └─ api/          # API routes
  layout.tsx       # Root layout
  page.tsx         # Home page

components/
  ├─ ui/           # Base UI components (Button, Card, Input, etc.)
  ├─ layout/       # Layout components (Navigation, Sidebar, etc.)
  └─ auth/         # Auth components (Login, Signup, etc.)

lib/
  ├─ types/        # TypeScript interfaces
  ├─ constants/    # App constants
  ├─ supabase/     # Supabase clients and schema
  └─ utils.ts      # Utility functions

hooks/             # Custom React hooks

context/           # React Context providers
```

## Features Being Built

### Phase 1: Foundation ✅
- [x] Project structure
- [x] TypeScript setup
- [x] Database schema
- [x] UI components
- [ ] Supabase authentication

### Phase 2: User System
- [ ] Auth (signup/login)
- [ ] User profiles
- [ ] Subject selection

### Phase 3: AI Chat
- [ ] Syllabus-aware chat interface
- [ ] OpenAI integration
- [ ] Message history

### Phase 4: Examiner Marking
- [ ] Answer submission
- [ ] AI marking engine
- [ ] Feedback display

### Phase 5: Analytics
- [ ] Weak topic detection
- [ ] Performance tracking
- [ ] Recommendations

## Development Notes

- Always use TypeScript for type safety
- Component structure: presentational + container patterns
- Keep API routes clean and reusable
- Use Tailwind CSS classes from the theme
- Test responsive design at 375px, 768px, 1024px viewports

## Next Steps

1. Set up Supabase project
2. Run database schema
3. Implement authentication with Supabase
4. Build user onboarding flow
5. Create main dashboard layout
