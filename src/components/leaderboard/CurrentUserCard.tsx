
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

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

interface CurrentUserCardProps {
  user: LeaderboardUser | null;
}

const CurrentUserCard: React.FC<CurrentUserCardProps> = ({ user }) => {
  if (!user) return null;

  return (
    <Card className="bg-black border border-electric mb-6">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="mr-4 w-8 flex justify-center">
            <span className="font-bold">{user.rank}</span>
          </div>
          <Avatar className="w-10 h-10 mr-3">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{user.name} <span className="text-electric">(You)</span></h3>
              <span className="font-bold">{user.score} pts</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={user.progress} className="h-1.5 flex-1" />
              <span className="text-xs text-gray-400">{user.progress}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentUserCard;
