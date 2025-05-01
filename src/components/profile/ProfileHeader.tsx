
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    points: number;
    rank: number;
    joined: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
      <div className="relative">
        <Avatar className="w-24 h-24 border-2 border-electric">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <Button 
          size="icon" 
          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-electric text-black"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-400">{user.email}</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
          <div className="bg-black px-3 py-1 rounded-full text-sm">
            <Trophy className="inline-block w-4 h-4 mr-1 text-electric" />
            Rank #{user.rank}
          </div>
          <div className="bg-black px-3 py-1 rounded-full text-sm">
            <Award className="inline-block w-4 h-4 mr-1 text-electric" />
            {user.points} Points
          </div>
          <div className="bg-black px-3 py-1 rounded-full text-sm">
            <LogIn className="inline-block w-4 h-4 mr-1" />
            Joined {user.joined}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
