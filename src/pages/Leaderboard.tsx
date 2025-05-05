import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star } from "lucide-react";
import DashboardLayout from '@/components/layout/DashboardLayout';

interface LeaderboardUser {
  id: number;
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

  // Sample leaderboard data
  const users: LeaderboardUser[] = [
    {
      id: 1,
      name: "Chioma Eze",
      avatar: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      course: "Digital Marketing",
      progress: 85,
      score: 950,
      completedChallenges: 7,
      rank: 1,
      badge: "🏆 Top Hustler"
    },
    {
      id: 2,
      name: "Emeka Johnson",
      avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      course: "Import & Sell",
      progress: 76,
      score: 845,
      completedChallenges: 6,
      rank: 2,
      badge: "🔥 Rising Star"
    },
    {
      id: 3,
      name: "Amina Mohammed",
      avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      course: "Pastry Biz",
      progress: 72,
      score: 790,
      completedChallenges: 5,
      rank: 3
    },
    {
      id: 4,
      name: "Tunde Bakare",
      avatar: "",
      course: "Digital Marketing",
      progress: 65,
      score: 720,
      completedChallenges: 4,
      rank: 4
    },
    {
      id: 5,
      name: "Ngozi Okafor",
      avatar: "",
      course: "Pastry Biz",
      progress: 58,
      score: 650,
      completedChallenges: 4,
      rank: 5
    },
    {
      id: 6,
      name: "Ibrahim Suleiman",
      avatar: "",
      course: "Import & Sell",
      progress: 52,
      score: 590,
      completedChallenges: 3,
      rank: 6
    }
  ];

  // Get the current user (In a real app, this would come from auth state)
  const currentUser = users.find(user => user.id === 2);

  return (
    <DashboardLayout currentPath="/leaderboard">
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
          <Button className="w-full rebel-button">
            Take Challenge
          </Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Leaderboard;
