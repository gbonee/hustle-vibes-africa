
-- Add user subscription and pro status tracking
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_pro_user BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'core';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_earnings INTEGER DEFAULT 0;

-- Create bounties table for Pro users
CREATE TABLE IF NOT EXISTS bounties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  reward_amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'NGN',
  skills_required TEXT[] DEFAULT '{}',
  difficulty_level TEXT DEFAULT 'intermediate',
  deadline TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in_progress', 'completed', 'cancelled')),
  client_id UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bounty applications table
CREATE TABLE IF NOT EXISTS bounty_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bounty_id UUID REFERENCES bounties(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES auth.users(id),
  proposal TEXT NOT NULL,
  estimated_timeline TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user earnings tracking
CREATE TABLE IF NOT EXISTS user_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  bounty_id UUID REFERENCES bounties(id),
  amount INTEGER NOT NULL,
  type TEXT DEFAULT 'bounty' CHECK (type IN ('bounty', 'referral', 'teaching')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE bounties ENABLE ROW LEVEL SECURITY;
ALTER TABLE bounty_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_earnings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bounties
CREATE POLICY "Anyone can view open bounties" ON bounties FOR SELECT USING (status = 'open');
CREATE POLICY "Pro users can create bounties" ON bounties FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own bounties" ON bounties FOR UPDATE USING (client_id = auth.uid());

-- RLS Policies for bounty applications
CREATE POLICY "Users can view applications for their bounties" ON bounty_applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM bounties WHERE bounties.id = bounty_applications.bounty_id AND bounties.client_id = auth.uid())
  OR bounty_applications.applicant_id = auth.uid()
);
CREATE POLICY "Pro users can apply to bounties" ON bounty_applications FOR INSERT WITH CHECK (applicant_id = auth.uid());

-- RLS Policies for user earnings
CREATE POLICY "Users can view their own earnings" ON user_earnings FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can insert earnings" ON user_earnings FOR INSERT WITH CHECK (user_id = auth.uid());
