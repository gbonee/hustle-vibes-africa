
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { getLeaderboard, getUserLeaderboardEntry, addPointsForModuleCompletion } from '@/utils/progressTracker';

// Import our new components
import LeaderboardHeader from '@/components/leaderboard/LeaderboardHeader';
import TopUsersGrid from '@/components/leaderboard/TopUsersGrid';
import CurrentUserCard from '@/components/leaderboard/CurrentUserCard';
import RankingsList from '@/components/leaderboard/RankingsList';
import WeeklyChallenge from '@/components/leaderboard/WeeklyChallenge';
import SubmissionsList from '@/components/leaderboard/SubmissionsList';
import LeaderboardSkeleton from '@/components/leaderboard/LeaderboardSkeleton';

interface LeaderboardUser {
  id: number | string;
  name: string;
  avatar: string;
  course: string;
  progress: number;
  score: number;
  completedChallenges: number;
  rank: number;
  badge?: string;
}

interface ChallengeSubmission {
  id: string;
  user_id: string;
  challenge_id: string;
  submission_url: string;
  submission_type: string;
  submitted_at: string;
  is_approved: boolean;
  user_name: string;
  avatar_url: string;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getChallengeStatus } = useUserPreferences();
  const [challengeStatus, setChallengeStatus] = useState({ hasSubmitted: false, isApproved: false });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissions, setSubmissions] = useState<ChallengeSubmission[]>([]);
  const WEEKLY_CHALLENGE_ID = 'weekly-challenge-1';
  
  const [user, setUser] = useState({
    id: '',
    name: 'User',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          // Get the user's profile if it exists
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .maybeSingle();
          
          setUser({
            id: authUser.id,
            name: profile?.display_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
            email: authUser.email || '',
            avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
          });
          
          // Check if user is admin
          const isUserAdmin = authUser.email === 'admin@example.com' || authUser.user_metadata?.is_admin === true;
          setIsAdmin(isUserAdmin);
          
          // Check challenge status
          const status = await getChallengeStatus(WEEKLY_CHALLENGE_ID);
          setChallengeStatus(status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, [getChallengeStatus]);
  
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch top users
        const leaderboardData = await getLeaderboard(10);
        
        // Add badges to top users
        const usersWithBadges = leaderboardData.map(user => {
          let badge;
          if (user.rank === 1) badge = "🏆 Top Hustler";
          else if (user.rank === 2) badge = "🔥 Rising Star";
          
          // Add default course info if missing
          return {
            ...user,
            badge,
            course: user.course || getRandomCourse(),
            progress: user.progress || Math.floor(Math.random() * 30) + 70, // Random progress between 70-100%
          };
        });
        
        setUsers(usersWithBadges);
        
        // Fetch current user's data
        const userEntry = await getUserLeaderboardEntry();
        if (userEntry) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userEntry.user_id)
            .maybeSingle();
            
          setCurrentUser({
            id: userEntry.user_id,
            name: profile?.display_name || 'You',
            avatar: profile?.avatar_url || '',
            course: getRandomCourse(),
            progress: 75, // Default progress
            score: userEntry.points,
            completedChallenges: userEntry.completed_challenges,
            rank: userEntry.rank || 0
          });
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboardData();
  }, []);
  
  // Helper function to get a random course for users without course data
  const getRandomCourse = () => {
    const courses = ['Digital Marketing', 'Import & Sell', 'Pastry Biz'];
    return courses[Math.floor(Math.random() * courses.length)];
  };
  
  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('challenge_submissions' as any)
        .select(`
          id,
          user_id,
          challenge_id,
          submission_url,
          submission_type,
          submitted_at,
          is_approved,
          profiles(display_name, avatar_url)
        `)
        .eq('challenge_id', WEEKLY_CHALLENGE_ID)
        .order('submitted_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        const formattedSubmissions = data.map((submission: any) => ({
          id: submission.id,
          user_id: submission.user_id,
          challenge_id: submission.challenge_id,
          submission_url: submission.submission_url,
          submission_type: submission.submission_type,
          submitted_at: submission.submitted_at,
          is_approved: submission.is_approved,
          user_name: submission.profiles?.display_name || 'Unknown User',
          avatar_url: submission.profiles?.avatar_url || ''
        }));
        
        setSubmissions(formattedSubmissions);
        setShowSubmissions(true);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch challenge submissions.",
        variant: "destructive",
      });
    }
  };
  
  const approveSubmission = async (submissionId: string, userId: string) => {
    try {
      // First update the submission to approved
      const { error: updateError } = await supabase
        .from('challenge_submissions' as any)
        .update({ is_approved: true })
        .eq('id', submissionId);
      
      if (updateError) throw updateError;
      
      // Then award points to the user
      await addPointsForModuleCompletion(1000, userId);
      
      toast({
        title: "Submission approved",
        description: "The user has been awarded 1000 points for their submission.",
        variant: "default",
      });
      
      // Refresh the submissions list
      await fetchSubmissions();
      
    } catch (error) {
      console.error('Error approving submission:', error);
      toast({
        title: "Error",
        description: "Failed to approve submission.",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return <LeaderboardSkeleton user={user} />;
  }

  return (
    <DashboardLayout currentPath="/leaderboard" user={user}>
      <LeaderboardHeader title="Leaderboard" />
      
      {/* Top 3 Users */}
      <TopUsersGrid users={users} />
      
      {/* Current User */}
      <CurrentUserCard user={currentUser} />
      
      {/* Full Rankings */}
      <RankingsList users={users} currentUserId={currentUser?.id} />
      
      {/* Weekly Challenge */}
      <WeeklyChallenge 
        challengeId={WEEKLY_CHALLENGE_ID}
        challengeStatus={challengeStatus}
        isAdmin={isAdmin}
        onFetchSubmissions={fetchSubmissions}
      />
      
      {/* Submissions List Dialog (for admins) */}
      <SubmissionsList 
        open={showSubmissions}
        onOpenChange={setShowSubmissions}
        submissions={submissions}
        onApprove={approveSubmission}
      />
    </DashboardLayout>
  );
};

export default Leaderboard;
