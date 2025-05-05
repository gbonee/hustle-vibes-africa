
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Video, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BottomNavigationProps {
  currentPath: string;
  userAvatar?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentPath,
  userAvatar = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
}) => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-electric/30 py-2">
      <div className="container mx-auto grid grid-cols-3">
        <Button 
          variant="ghost"
          className={`flex flex-col items-center justify-center h-16 ${
            currentPath === '/dashboard' ? 'text-electric' : ''
          }`}
          onClick={() => navigate('/dashboard')}
        >
          <Video className="h-5 w-5 mb-1" />
          <span className="text-xs">Learn</span>
        </Button>
        
        <Button 
          variant="ghost"
          className={`flex flex-col items-center justify-center h-16 ${
            currentPath === '/leaderboard' ? 'text-electric' : ''
          }`}
          onClick={() => navigate('/leaderboard')}
        >
          <Trophy className="h-5 w-5 mb-1" />
          <span className="text-xs">Leaderboard</span>
        </Button>
        
        <Button 
          variant="ghost"
          className={`flex flex-col items-center justify-center h-16 ${
            currentPath === '/profile' ? 'text-electric' : ''
          }`}
          onClick={() => navigate('/profile')}
        >
          <Avatar className="h-8 w-8 mb-1">
            <AvatarImage src={userAvatar} />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
