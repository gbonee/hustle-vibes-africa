
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

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

interface RankingsListProps {
  users: LeaderboardUser[];
  currentUserId?: string | number | null;
}

const RankingsList: React.FC<RankingsListProps> = ({ users, currentUserId }) => {
  return (
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
                user.id === currentUserId ? 'bg-black border border-electric/30' : ''
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
                    {user.id === currentUserId && <span className="text-electric ml-1">(You)</span>}
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
  );
};

export default RankingsList;
