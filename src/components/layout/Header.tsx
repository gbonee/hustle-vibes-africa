
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSettingsClick?: () => void;
  userAvatar?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onSettingsClick = () => {},
  userAvatar = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
}) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-electric/30 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
            alt="uSabi AI Owl Mascot" 
            className="h-8 w-auto" 
          />
          <span className="text-2xl font-oswald font-bold text-electric ml-2">
            uSabi <span className="text-white">AI</span>
          </span>
        </div>
        <Button 
          onClick={() => navigate('/profile')}
          variant="ghost" 
          className="rounded-full w-10 h-10 p-0"
        >
          <Avatar>
            <AvatarImage src={userAvatar} />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
};

export default Header;
