
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface TopUsersGridProps {
  users: LeaderboardUser[];
}

const TopUsersGrid: React.FC<TopUsersGridProps> = ({ users }) => {
  return (
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
  );
};

export default TopUsersGrid;
