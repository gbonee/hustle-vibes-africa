
-- First, let's add the user path tracking columns to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS learning_path TEXT DEFAULT 'core';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferred_languages TEXT[] DEFAULT ARRAY['pidgin'];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pro_subscription_active BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pro_subscription_expires TIMESTAMP WITH TIME ZONE;

-- Add constraint for learning_path
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_learning_path_check') THEN
        ALTER TABLE profiles ADD CONSTRAINT profiles_learning_path_check CHECK (learning_path IN ('core', 'pro', 'both'));
    END IF;
END $$;

-- Drop existing bounties table if it exists (since it might be incomplete)
DROP TABLE IF EXISTS bounties CASCADE;

-- Create course categories table
CREATE TABLE IF NOT EXISTS course_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  path TEXT NOT NULL CHECK (path IN ('core', 'pro')),
  description TEXT,
  color_scheme TEXT DEFAULT 'purple',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bounties table properly
CREATE TABLE bounties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  path TEXT NOT NULL CHECK (path IN ('core', 'pro', 'both')),
  reward_amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'NGN',
  language_requirement TEXT,
  skills_required TEXT[] DEFAULT '{}',
  difficulty_level TEXT DEFAULT 'intermediate' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  deadline TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in_progress', 'completed', 'cancelled')),
  client_id UUID,
  assigned_to UUID,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user certifications table
CREATE TABLE IF NOT EXISTS user_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  certification_name TEXT NOT NULL,
  certification_type TEXT NOT NULL CHECK (certification_type IN ('core', 'pro')),
  partner_name TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  badge_url TEXT,
  verification_url TEXT
);

-- Drop existing user_earnings if it exists and recreate
DROP TABLE IF EXISTS user_earnings CASCADE;
CREATE TABLE user_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'NGN',
  source TEXT NOT NULL CHECK (source IN ('core_gig', 'pro_bounty', 'referral', 'teaching')),
  bounty_id UUID REFERENCES bounties(id),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE bounties ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_earnings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view course categories" ON course_categories FOR SELECT USING (true);

CREATE POLICY "Anyone can view open bounties" ON bounties FOR SELECT USING (status = 'open' OR client_id = auth.uid() OR assigned_to = auth.uid());
CREATE POLICY "Authenticated users can create bounties" ON bounties FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own bounties" ON bounties FOR UPDATE USING (client_id = auth.uid());

CREATE POLICY "Users can view their own certifications" ON user_certifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own certifications" ON user_certifications FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own earnings" ON user_earnings FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can insert earnings" ON user_earnings FOR INSERT WITH CHECK (user_id = auth.uid());

-- Insert default course categories
INSERT INTO course_categories (name, path, description, color_scheme) VALUES
  ('Digital Marketing', 'core', 'Learn digital marketing in local languages', 'purple'),
  ('Pastry Business', 'core', 'Start a pastry business from your kitchen', 'purple'),
  ('Importation', 'core', 'Import from China & sell on WhatsApp', 'purple'),
  ('AI Agent Building', 'pro', 'Build AI agents and chatbots', 'yellow'),
  ('No-Code Development', 'pro', 'Create apps without coding using Bolt/Lovable', 'yellow'),
  ('AI Certification', 'pro', 'Get certified in AI technologies', 'yellow');

-- Insert sample bounties
INSERT INTO bounties (title, description, category, path, reward_amount, language_requirement, skills_required, tags) VALUES
  ('Create Pidgin TikTok for Cake Business', 'Record a 60-second TikTok promoting cake business in Pidgin English', 'Digital Marketing', 'core', 20000, 'pidgin', ARRAY['social_media', 'video_editing'], ARRAY['LocalHustle', 'TikTok']),
  ('Build WhatsApp Business Bot', 'Create an AI chatbot for a Lagos restaurant using no-code tools', 'AI Agent Building', 'pro', 150000, 'english', ARRAY['chatbot_development', 'no_code'], ARRAY['AIBuilder', 'WhatsApp']),
  ('Yoruba Fashion Tutorial Series', 'Create 5-part fashion design tutorial series in Yoruba', 'Fashion Design', 'core', 50000, 'yoruba', ARRAY['fashion_design', 'video_production'], ARRAY['LocalHustle', 'Fashion']),
  ('AI Customer Service Agent', 'Build an AI agent for e-commerce customer support', 'AI Agent Building', 'pro', 200000, 'english', ARRAY['ai_development', 'customer_service'], ARRAY['AIBuilder', 'E-commerce']);
