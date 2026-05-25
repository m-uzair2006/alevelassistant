// User Types
export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
};

export type Subject = "physics_9702" | "maths_9709" | "cs_9618";

export type UserSubjectPreference = {
  id: string;
  user_id: string;
  subject: Subject;
  created_at: string;
};

// Syllabus Types
export type Topic = {
  id: string;
  subject: Subject;
  topic_code: string;
  topic_name: string;
  description: string;
  created_at: string;
};

export type CommandWord = {
  id: string;
  word: string;
  definition: string;
  exam_context: string;
  created_at: string;
};

// Answer & Marking Types
export type Answer = {
  id: string;
  user_id: string;
  subject: Subject;
  question_text: string;
  answer_text?: string;
  image_urls?: string[];
  topic_id?: string;
  created_at: string;
  updated_at: string;
};

export type MarkingFeedback = {
  id: string;
  answer_id: string;
  estimated_marks: number;
  total_marks: number;
  percentage: number;
  feedback_text: string;
  weak_areas: string[];
  strong_areas: string[];
  improvement_suggestions: string[];
  examiner_comments: string;
  created_at: string;
};

// Chat Types
export type ChatMessage = {
  id: string;
  user_id: string;
  subject: Subject;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

export type ChatSession = {
  id: string;
  user_id: string;
  subject: Subject;
  title: string;
  created_at: string;
  updated_at: string;
};

// Analytics Types
export type WeakTopic = {
  topic_id: string;
  topic_name: string;
  failure_count: number;
  average_mark_percentage: number;
  last_attempted: string;
};

export type AnalyticsData = {
  user_id: string;
  subject: Subject;
  total_answers_submitted: number;
  average_mark_percentage: number;
  weak_topics: WeakTopic[];
  created_at: string;
  updated_at: string;
};
