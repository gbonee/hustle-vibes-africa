
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Trophy, User, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentPath: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPath }) => {
  const isActive = (path: string) => currentPath === path;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-electric/30 z-10">
      <div className="container mx-auto flex justify-between items-center py-1">
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center justify-center p-2 flex-1 ${
            isActive('/dashboard') ? 'text-electric' : 'text-gray-400'
          }`}
        >
          <LayoutDashboard size={24} />
          <span className="text-xs mt-1">Learn</span>
        </Link>
        
        <Link 
          to="/leaderboard" 
          className={`flex flex-col items-center justify-center p-2 flex-1 ${
            isActive('/leaderboard') ? 'text-electric' : 'text-gray-400'
          }`}
        >
          <Trophy size={24} />
          <span className="text-xs mt-1">Ranks</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center justify-center p-2 flex-1 ${
            isActive('/profile') ? 'text-electric' : 'text-gray-400'
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
        
        <Link 
          to="/admin" 
          className={`flex flex-col items-center justify-center p-2 flex-1 ${
            isActive('/admin') ? 'text-electric' : 'text-gray-400'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs mt-1">Admin</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
