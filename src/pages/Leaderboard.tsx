
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star } from "lucide-react";
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getLeaderboard, getUserLeaderboardEntry, addPointsForModuleCompletion } from '@/utils/progressTracker';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

const Leaderboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, []);
  
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
  
  const handleTakeChallenge = async () => {
    try {
      // Award points for taking the challenge
      await addPointsForModuleCompletion(1000);
      
      toast({
        title: "Challenge Completed!",
        description: "You've earned 1000 bonus points for taking the weekly challenge!",
        variant: "default",
      });
      
      // Refresh data
      const leaderboardData = await getLeaderboard(10);
      const userEntry = await getUserLeaderboardEntry();
      
      if (userEntry && currentUser) {
        setCurrentUser({
          ...currentUser,
          score: userEntry.points,
          completedChallenges: userEntry.completed_challenges,
          rank: userEntry.rank || 0
        });
      }
      
      setUsers(leaderboardData.map(user => {
        let badge;
        if (user.rank === 1) badge = "🏆 Top Hustler";
        else if (user.rank === 2) badge = "🔥 Rising Star";
        
        return {
          ...user,
          badge,
          course: user.course || getRandomCourse(),
          progress: user.progress || Math.floor(Math.random() * 30) + 70,
        };
      }));
      
    } catch (error) {
      console.error('Error taking challenge:', error);
      toast({
        title: "Error",
        description: "There was an error taking the challenge. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <DashboardLayout currentPath="/leaderboard" user={user}>
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        <div className="space-y-4">
          <Card className="bg-muted border border-gray-700 animate-pulse">
            <CardContent className="h-40"></CardContent>
          </Card>
          <Card className="bg-muted border border-gray-700 animate-pulse">
            <CardContent className="h-20"></CardContent>
          </Card>
          <Card className="bg-muted border border-gray-700 animate-pulse">
            <CardContent className="h-60"></CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPath="/leaderboard" user={user}>
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      
      {/* Top 3 Section */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        {users.slice(0, 3).map((user) => (
          <Card key={user.id} className={`bg-muted border ${user.rank === 1 ? 'border-2 border-electric' : 'border-gray-700'}`}>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="relative mt-2 mb-2">
                <Avatar className={`w-16 h-16 border-2 ${user.rank === 1 ? 'border-electric' : user.rank === 2 ? 'border-gray-300' : 'border-amber-700'}`}>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center text-black ${
                  user.rank === 1 ? 'bg-electric' : user.rank === 2 ? 'bg-gray-300' : 'bg-amber-700'
                }`}>
                  {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                </div>
              </div>
              <h3 className="font-bold text-center mt-2 truncate max-w-full">{user.name}</h3>
              <p className="text-xs text-gray-400 text-center">{user.course}</p>
              <p className="font-bold text-center mt-1">{user.score} pts</p>
              {user.badge && (
                <span className="text-xs bg-electric/20 text-electric px-2 py-1 rounded-full mt-1">
                  {user.badge}
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Current User Card */}
      {currentUser && (
        <Card className="bg-black border border-electric mb-6">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="mr-4 w-8 flex justify-center">
                <span className="font-bold">{currentUser.rank}</span>
              </div>
              <Avatar className="w-10 h-10 mr-3">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{currentUser.name} <span className="text-electric">(You)</span></h3>
                  <span className="font-bold">{currentUser.score} pts</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={currentUser.progress} className="h-1.5 flex-1" />
                  <span className="text-xs text-gray-400">{currentUser.progress}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Full Leaderboard */}
      <Card className="bg-muted border border-gray-800">
        <CardHeader className="py-4 px-6">
          <CardTitle>Weekly Rankings</CardTitle>
        </CardHeader>
        <CardContent className="px-2 py-0">
          <div className="space-y-1">
            {users.map((user) => (
              <div 
                key={user.id} 
                className={`flex items-center p-3 rounded-md ${
                  user.id === currentUser?.id ? 'bg-black border border-electric/30' : ''
                }`}
              >
                <div className="mr-4 w-8 flex justify-center">
                  <span className={`font-bold ${user.rank <= 3 ? 'text-electric' : ''}`}>{user.rank}</span>
                </div>
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">
                      {user.name}
                      {user.id === currentUser?.id && <span className="text-electric ml-1">(You)</span>}
                    </h3>
                    <span className="font-bold">{user.score} pts</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs text-gray-400">{user.course}</div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Trophy className="w-3 h-3 mr-1" />
                      <span>{user.completedChallenges} challenges</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Weekly Challenge */}
      <Card className="bg-black border border-electric mt-6">
        <CardContent className="p-5">
          <h3 className="text-lg font-bold mb-2 flex items-center">
            <Star className="w-5 h-5 mr-2 text-electric" />
            Weekly Challenge
          </h3>
          <p className="mb-4">Record a 30-second pitch for your business idea and upload it to earn 1000 bonus points!</p>
          <Button 
            className="w-full rebel-button"
            onClick={handleTakeChallenge}
          >
            Take Challenge
          </Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Leaderboard;
