-- =========================================================
-- USER PROFILES
-- Minimal optimized schema
-- =========================================================

CREATE TABLE IF NOT EXISTS user_profiles (
  -- Linked to Supabase Auth
  id UUID PRIMARY KEY
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  -- Basic Info
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,

  -- Subject Preferences
  subjects TEXT[] NOT NULL DEFAULT '{}'
    CHECK (
      subjects <@ ARRAY[
        'physics_9702',
        'maths_9709',
        'cs_9618'
      ]::TEXT[]
    ),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- ENABLE RLS
-- =========================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- =========================================================
-- RLS POLICIES
-- =========================================================

CREATE POLICY "Users can view own profile"
ON user_profiles
FOR SELECT
USING (auth.uid() = id);

------------------------------------------------------------

CREATE POLICY "Users can insert own profile"
ON user_profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

------------------------------------------------------------

CREATE POLICY "Users can update own profile"
ON user_profiles
FOR UPDATE
USING (auth.uid() = id);

------------------------------------------------------------

CREATE POLICY "Users can delete own profile"
ON user_profiles
FOR DELETE
USING (auth.uid() = id);

-- =========================================================
-- PERFORMANCE INDEXES
-- =========================================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_email
ON user_profiles(email);

------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_user_profiles_subjects
ON user_profiles
USING GIN(subjects);

-- =========================================================
-- AUTO UPDATE updated_at
-- =========================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

------------------------------------------------------------

CREATE TRIGGER trigger_update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();