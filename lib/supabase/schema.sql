-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User subject preferences
CREATE TABLE IF NOT EXISTS user_subject_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL CHECK (subject IN ('physics_9702', 'maths_9709', 'cs_9618')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, subject)
);

-- Subjects/Syllabi
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL CHECK (subject IN ('physics_9702', 'maths_9709', 'cs_9618')),
  topic_code TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Command words reference
CREATE TABLE IF NOT EXISTS command_words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word TEXT NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  exam_context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student answers
CREATE TABLE IF NOT EXISTS answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL CHECK (subject IN ('physics_9702', 'maths_9709', 'cs_9618')),
  question_text TEXT NOT NULL,
  answer_text TEXT,
  topic_id UUID REFERENCES topics(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Answer images (for image uploads)
CREATE TABLE IF NOT EXISTS answer_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answer_id UUID NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Examiner Marking Feedback
CREATE TABLE IF NOT EXISTS marking_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answer_id UUID NOT NULL UNIQUE REFERENCES answers(id) ON DELETE CASCADE,
  estimated_marks INTEGER NOT NULL,
  total_marks INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  feedback_text TEXT NOT NULL,
  weak_areas TEXT[] DEFAULT '{}',
  strong_areas TEXT[] DEFAULT '{}',
  improvement_suggestions TEXT[] DEFAULT '{}',
  examiner_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL CHECK (subject IN ('physics_9702', 'maths_9709', 'cs_9618')),
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User analytics per subject
CREATE TABLE IF NOT EXISTS user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL CHECK (subject IN ('physics_9702', 'maths_9709', 'cs_9618')),
  total_answers_submitted INTEGER DEFAULT 0,
  average_mark_percentage DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, subject)
);

-- Weak topics per user
CREATE TABLE IF NOT EXISTS weak_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES topics(id),
  subject TEXT NOT NULL CHECK (subject IN ('physics_9702', 'maths_9709', 'cs_9618')),
  failure_count INTEGER DEFAULT 0,
  average_mark_percentage DECIMAL(5,2) DEFAULT 0,
  last_attempted TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subject_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE marking_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE weak_topics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own data
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view their own answers"
  ON answers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own answers"
  ON answers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own chat sessions"
  ON chat_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own chat messages"
  ON chat_messages FOR SELECT
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_answers_user_subject ON answers(user_id, subject);
CREATE INDEX idx_chat_sessions_user ON chat_sessions(user_id);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_marking_feedback_answer ON marking_feedback(answer_id);
CREATE INDEX idx_weak_topics_user ON weak_topics(user_id, subject);
