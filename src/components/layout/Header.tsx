
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface HeaderProps {
  onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick = () => {} }) => {
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
          onClick={onSettingsClick}
          variant="ghost"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
