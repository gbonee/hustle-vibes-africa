
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trophy, Award, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileHeaderProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    points?: number;
    rank?: number;
    joined?: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user: propUser }) => {
  const [user, setUser] = useState({
    name: propUser?.name || '',
    email: propUser?.email || '',
    avatar: propUser?.avatar || '',
    points: propUser?.points || 0,
    rank: propUser?.rank || 0,
    joined: propUser?.joined || ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      // Get the current authenticated user
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) return;
      
      // Get the user profile if it exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();
      
      // Format joined date
      const joinedDate = new Date(authUser.created_at);
      const month = joinedDate.toLocaleString('default', { month: 'long' });
      const year = joinedDate.getFullYear();
      
      setUser({
        name: profile?.display_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        avatar: profile?.avatar_url || propUser?.avatar || '',
        points: propUser?.points || 0, // Keep the mock data for now
        rank: propUser?.rank || 0, // Keep the mock data for now
        joined: `${month} ${year}`
      });
    };
    
    fetchUserData();
  }, [propUser]);
  
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
      <div className="relative">
        <Avatar className="w-24 h-24 border-2 border-electric">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
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
